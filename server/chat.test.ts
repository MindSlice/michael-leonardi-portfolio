import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock db helpers
vi.mock("./db", () => ({
  isRateLimited: vi.fn().mockResolvedValue(false),
  insertChatMessage: vi.fn().mockResolvedValue(undefined),
  getChatCountToday: vi.fn().mockResolvedValue(0),
  recordPageView: vi.fn().mockResolvedValue(undefined),
  getAnalyticsSummary: vi.fn().mockResolvedValue({
    totalViews: 42,
    uniqueVisitors: 10,
    topPages: [],
    recentDays: [],
  }),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function makeCtx(ip = "127.0.0.1"): TrpcContext {
  return {
    user: null,
    req: {
      headers: { "x-forwarded-for": ip },
      protocol: "https",
    } as unknown as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("chat.submit", () => {
  it("accepts a valid message with bypass token", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.chat.submit({
      name: "Test User",
      email: "test@example.com",
      message: "Hello, this is a test message for the portfolio.",
      captchaToken: "test-captcha-bypass",
    });
    expect(result.success).toBe(true);
  });

  it("rejects when rate limited", async () => {
    const { isRateLimited } = await import("./db");
    vi.mocked(isRateLimited).mockResolvedValueOnce(true);

    const caller = appRouter.createCaller(makeCtx());
    await expect(
      caller.chat.submit({
        name: "Spammer",
        email: "spam@example.com",
        message: "This should be rate limited by the system.",
        captchaToken: "test-captcha-bypass",
      })
    ).rejects.toThrow("daily message limit");
  });

  it("rejects message that is too short", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(
      caller.chat.submit({
        name: "Test",
        email: "test@example.com",
        message: "Short",
        captchaToken: "test-captcha-bypass",
      })
    ).rejects.toThrow();
  });
});

describe("analytics.summary", () => {
  it("returns analytics data", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.analytics.summary();
    expect(result.totalViews).toBe(42);
    expect(result.uniqueVisitors).toBe(10);
  });
});

describe("analytics.trackView", () => {
  it("records a page view", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.analytics.trackView({ path: "/", referrer: undefined });
    expect(result.ok).toBe(true);
  });
});
