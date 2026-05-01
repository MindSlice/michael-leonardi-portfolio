import { and, count, desc, eq, gte, sql, lt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, chatMessages, pageViews, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import crypto from "crypto";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ── Chat Rate Limiting ─────────────────────────────────────────────────────

const CHAT_DAILY_LIMIT = 5;

/** Count messages from this IP or email in the last 24 hours */
export async function getChatCountToday(ipAddress: string, email: string): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const result = await db
    .select({ total: count() })
    .from(chatMessages)
    .where(
      and(
        gte(chatMessages.createdAt, since),
        sql`(${chatMessages.ipAddress} = ${ipAddress} OR ${chatMessages.visitorEmail} = ${email})`
      )
    );
  return result[0]?.total ?? 0;
}

export async function isRateLimited(ipAddress: string, email: string): Promise<boolean> {
  const c = await getChatCountToday(ipAddress, email);
  return c >= CHAT_DAILY_LIMIT;
}

/** Insert a new chat message record */
export async function insertChatMessage(data: {
  visitorName: string;
  visitorEmail: string;
  message: string;
  ipAddress: string;
  captchaVerified: boolean;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(chatMessages).values({
    visitorName: data.visitorName,
    visitorEmail: data.visitorEmail,
    message: data.message,
    ipAddress: data.ipAddress,
    captchaVerified: data.captchaVerified ? 1 : 0,
    notified: 0,
  });
}

// ── Analytics ─────────────────────────────────────────────────────────────

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip + "ml-portfolio-salt").digest("hex").slice(0, 16);
}

export async function recordPageView(data: {
  path: string;
  ip: string;
  referrer?: string;
  userAgent?: string;
}) {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(pageViews).values({
      path: data.path.slice(0, 512),
      ipHash: hashIp(data.ip),
      referrer: data.referrer?.slice(0, 512) ?? null,
      userAgent: data.userAgent?.slice(0, 256) ?? null,
    });
  } catch (e) {
    console.warn("[Analytics] Failed to record page view:", e);
  }
}

export async function getAnalyticsSummary() {
  const db = await getDb();
  if (!db) return { totalViews: 0, uniqueVisitors: 0, topPages: [], recentDays: [] };

  const [totalResult] = await db.select({ total: count() }).from(pageViews);
  const totalViews = totalResult?.total ?? 0;

  const uniqueResult = await db
    .select({ ipHash: pageViews.ipHash })
    .from(pageViews)
    .groupBy(pageViews.ipHash);
  const uniqueVisitors = uniqueResult.length;

  const topPagesResult = await db
    .select({ path: pageViews.path, views: count() })
    .from(pageViews)
    .groupBy(pageViews.path)
    .orderBy(desc(count()))
    .limit(10);

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentResult = await db
    .select({
      day: sql<string>`DATE(createdAt)`,
      views: count(),
    })
    .from(pageViews)
    .where(gte(pageViews.createdAt, thirtyDaysAgo))
    .groupBy(sql`DATE(createdAt)`)
    .orderBy(sql`DATE(createdAt)`);

  return {
    totalViews,
    uniqueVisitors,
    topPages: topPagesResult,
    recentDays: recentResult,
  };
}

// ── Recent Chat Messages (admin) ──────────────────────────────────────────

export async function getRecentMessages(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(chatMessages)
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit);
}

// ── Extended Analytics (admin) ────────────────────────────────────────────

export async function getAnalyticsFull() {
  const db = await getDb();
  if (!db) {
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      todayViews: 0,
      weekViews: 0,
      topPages: [] as { path: string; views: number }[],
      recentDays: [] as { day: string; views: number }[],
      topReferrers: [] as { referrer: string | null; views: number }[],
      totalMessages: 0,
    };
  }

  // Total views
  const [totalResult] = await db.select({ total: count() }).from(pageViews);
  const totalViews = totalResult?.total ?? 0;

  // Unique visitors (by hashed IP)
  const uniqueResult = await db
    .select({ ipHash: pageViews.ipHash })
    .from(pageViews)
    .groupBy(pageViews.ipHash);
  const uniqueVisitors = uniqueResult.length;

  // Today's views
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const [todayResult] = await db
    .select({ total: count() })
    .from(pageViews)
    .where(gte(pageViews.createdAt, todayStart));
  const todayViews = todayResult?.total ?? 0;

  // This week's views
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [weekResult] = await db
    .select({ total: count() })
    .from(pageViews)
    .where(gte(pageViews.createdAt, weekAgo));
  const weekViews = weekResult?.total ?? 0;

  // Top pages
  const topPagesResult = await db
    .select({ path: pageViews.path, views: count() })
    .from(pageViews)
    .groupBy(pageViews.path)
    .orderBy(desc(count()))
    .limit(10);

  // 30-day daily breakdown
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentResult = await db
    .select({
      day: sql<string>`DATE(createdAt)`,
      views: count(),
    })
    .from(pageViews)
    .where(gte(pageViews.createdAt, thirtyDaysAgo))
    .groupBy(sql`DATE(createdAt)`)
    .orderBy(sql`DATE(createdAt)`);

  // Top referrers
  const topReferrersResult = await db
    .select({ referrer: pageViews.referrer, views: count() })
    .from(pageViews)
    .groupBy(pageViews.referrer)
    .orderBy(desc(count()))
    .limit(10);

  // Total chat messages
  const [msgResult] = await db.select({ total: count() }).from(chatMessages);
  const totalMessages = msgResult?.total ?? 0;

  return {
    totalViews,
    uniqueVisitors,
    todayViews,
    weekViews,
    topPages: topPagesResult,
    recentDays: recentResult,
    topReferrers: topReferrersResult,
    totalMessages,
  };
}
