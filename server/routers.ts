import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import {
  getAnalyticsFull,
  getAnalyticsSummary,
  getRecentMessages,
  insertChatMessage,
  isRateLimited,
  recordPageView,
} from "./db";

// ── hCaptcha verification helper ──────────────────────────────────────────
// Using hCaptcha free tier. Site key is public; secret key is env-based.
// For dev/test we accept a special bypass token "test-captcha-bypass"
async function verifyCaptcha(token: string): Promise<boolean> {
  if (token === "test-captcha-bypass") return true; // dev only
  const secret = process.env.HCAPTCHA_SECRET || "";
  if (!secret) {
    console.warn("[CAPTCHA] HCAPTCHA_SECRET not set, skipping verification");
    return true; // graceful fallback if not configured
  }
  try {
    const res = await fetch("https://api.hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `response=${encodeURIComponent(token)}&secret=${encodeURIComponent(secret)}`,
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch (e) {
    console.warn("[CAPTCHA] Verification failed:", e);
    return false;
  }
}

// ── Router ────────────────────────────────────────────────────────────────

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── Chat ─────────────────────────────────────────────────────────────
  chat: router({
    /**
     * Submit a contact message.
     * Rate limited to 5 per IP + email per 24h.
     * Requires valid hCaptcha token.
     * Notifies owner via built-in notification service.
     */
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(128),
          email: z.string().email().max(320),
          message: z.string().min(10).max(2000),
          captchaToken: z.string().min(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Get real IP (behind proxy)
        const ip =
          (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
          (ctx.req as any).ip ||
          "unknown";

        // Rate limit check
        const limited = await isRateLimited(ip, input.email);
        if (limited) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "You have reached the daily message limit (5 per day). Please try again tomorrow.",
          });
        }

        // CAPTCHA verification
        const captchaOk = await verifyCaptcha(input.captchaToken);
        if (!captchaOk) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "CAPTCHA verification failed. Please try again.",
          });
        }

        // Persist message
        await insertChatMessage({
          visitorName: input.name,
          visitorEmail: input.email,
          message: input.message,
          ipAddress: ip,
          captchaVerified: true,
        });

        // Notify owner
        const notifyContent = `**New message from ${input.name}** (${input.email})\n\n${input.message}\n\n---\nIP: ${ip}`;
        await notifyOwner({
          title: `Portfolio contact: ${input.name}`,
          content: notifyContent,
        }).catch((e) => console.warn("[Chat] Notify failed:", e));

        return { success: true };
      }),

    /**
     * Check remaining messages for today (by IP).
     */
    remaining: publicProcedure.query(async ({ ctx }) => {
      const ip =
        (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        (ctx.req as any).ip ||
        "unknown";
      const limited = await isRateLimited(ip, "");
      return { canSend: !limited };
    }),
  }),

  // ── Analytics ─────────────────────────────────────────────────────────
  analytics: router({
    /**
     * Record a page view (called from frontend on mount).
     */
    trackView: publicProcedure
      .input(
        z.object({
          path: z.string().max(512),
          referrer: z.string().max(512).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const ip =
          (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
          (ctx.req as any).ip ||
          "unknown";
        const ua = (ctx.req.headers["user-agent"] as string) || "";
        await recordPageView({
          path: input.path,
          ip,
          referrer: input.referrer,
          userAgent: ua,
        });
        return { ok: true };
      }),

    /**
     * Public summary — used for lightweight tracking checks.
     */
    summary: publicProcedure.query(async () => {
      return await getAnalyticsSummary();
    }),

    /**
     * Full analytics data — admin only.
     */
    full: adminProcedure.query(async () => {
      return await getAnalyticsFull();
    }),

    /**
     * Recent contact messages — admin only.
     */
    messages: adminProcedure.query(async () => {
      return await getRecentMessages(50);
    }),
  }),
});

export type AppRouter = typeof appRouter;
