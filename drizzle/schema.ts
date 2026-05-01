import { bigint, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Chat messages — stores visitor contact messages with rate limiting metadata.
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  /** Visitor's name */
  visitorName: varchar("visitorName", { length: 128 }).notNull(),
  /** Visitor's email (used for rate limiting + email copy) */
  visitorEmail: varchar("visitorEmail", { length: 320 }).notNull(),
  /** Visitor's message */
  message: text("message").notNull(),
  /** IP address for rate limiting */
  ipAddress: varchar("ipAddress", { length: 64 }).notNull(),
  /** hCaptcha token verified server-side */
  captchaVerified: int("captchaVerified").default(0).notNull(),
  /** Notification sent to owner */
  notified: int("notified").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Page views — simple server-side analytics counter.
 */
export const pageViews = mysqlTable("page_views", {
  id: int("id").autoincrement().primaryKey(),
  /** Page path (e.g. "/" or "/project/wireless-charging") */
  path: varchar("path", { length: 512 }).notNull(),
  /** Visitor IP (hashed for privacy) */
  ipHash: varchar("ipHash", { length: 64 }).notNull(),
  /** Referrer URL */
  referrer: varchar("referrer", { length: 512 }),
  /** User-agent string (truncated) */
  userAgent: varchar("userAgent", { length: 256 }),
  /** Country from IP (optional, populated if geo lookup available) */
  country: varchar("country", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = typeof pageViews.$inferInsert;
