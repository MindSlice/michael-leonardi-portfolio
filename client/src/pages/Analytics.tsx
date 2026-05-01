// Deep Signal — Private Analytics Dashboard
// Owner-only route: /analytics
// Shows visitor stats, 30-day trend, top pages, referrers, and recent contact messages.
import { useState } from "react";
import { useLocation } from "wouter";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  Eye,
  Users,
  TrendingUp,
  MessageSquare,
  ArrowLeft,
  RefreshCw,
  Calendar,
  Globe,
  FileText,
  Loader2,
  Lock,
  LogIn,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Helpers ───────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatPath(path: string) {
  if (path === "/") return "/ (Home)";
  return path;
}

function formatReferrer(ref: string | null) {
  if (!ref || ref === "") return "Direct / Unknown";
  try {
    const url = new URL(ref);
    return url.hostname;
  } catch {
    return ref.slice(0, 40);
  }
}

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// ── Stat Card ─────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  color = "#3B82F6",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div
      className="ds-card p-6 flex flex-col gap-3"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {label}
        </span>
        <span style={{ color }}>{icon}</span>
      </div>
      <div
        className="text-3xl font-bold text-white"
        style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
      {sub && <div className="text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

// ── Custom Tooltip ────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-lg text-sm"
      style={{
        background: "#141820",
        border: "1px solid rgba(59,130,246,0.3)",
        color: "#F1F5F9",
      }}
    >
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className="font-semibold" style={{ color: "#3B82F6" }}>
        {payload[0].value} views
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────

export default function Analytics() {
  const [, navigate] = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "pages" | "messages">("overview");

  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
  } = trpc.analytics.full.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
    refetchOnWindowFocus: false,
    retry: false,
  });

  const {
    data: messages,
    isLoading: messagesLoading,
  } = trpc.analytics.messages.useQuery(undefined, {
    enabled: !!user && user.role === "admin" && activeTab === "messages",
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Loading auth state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0C10" }}>
        <Loader2 size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#0A0C10" }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div
            className="ds-card p-10 flex flex-col items-center gap-6 text-center max-w-sm w-full mx-4"
            style={{ borderColor: "rgba(59,130,246,0.3)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.12)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.25)" }}
            >
              <Lock size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Private Dashboard</h2>
              <p className="text-sm text-slate-400">This page is restricted to the site owner. Please sign in to continue.</p>
            </div>
            <button
              onClick={() => { window.location.href = getLoginUrl(); }}
              className="ds-btn-primary w-full justify-center"
            >
              <LogIn size={16} /> Sign in
            </button>
            <button onClick={() => navigate("/")} className="text-sm text-slate-600 hover:text-slate-400 transition-colors flex items-center gap-1.5">
              <ArrowLeft size={13} /> Back to portfolio
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#0A0C10" }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="ds-card p-10 flex flex-col items-center gap-4 text-center max-w-sm mx-4">
            <Lock size={32} style={{ color: "#F59E0B" }} />
            <h2 className="text-xl font-bold text-white">Access Restricted</h2>
            <p className="text-sm text-slate-400">This dashboard is only accessible to the site owner.</p>
            <button onClick={() => navigate("/")} className="ds-btn-outline">
              <ArrowLeft size={14} /> Back to portfolio
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Loading data
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#0A0C10" }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center gap-3">
          <Loader2 size={22} className="animate-spin text-blue-500" />
          <span className="text-slate-400 text-sm">Loading analytics…</span>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state — if FORBIDDEN/UNAUTHORIZED, show login gate
  if (error) {
    const isForbidden =
      error.message?.includes("FORBIDDEN") ||
      error.message?.includes("UNAUTHORIZED") ||
      error.message?.includes("10001") ||
      error.message?.includes("10002");
    if (isForbidden) {
      return (
        <div className="min-h-screen flex flex-col" style={{ background: "#0A0C10" }}>
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div
              className="ds-card p-10 flex flex-col items-center gap-6 text-center max-w-sm w-full mx-4"
              style={{ borderColor: "rgba(59,130,246,0.3)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "rgba(59,130,246,0.12)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.25)" }}
              >
                <Lock size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Private Dashboard</h2>
                <p className="text-sm text-slate-400">This page is restricted to the site owner. Please sign in to continue.</p>
              </div>
              <button
                onClick={() => { window.location.href = getLoginUrl(); }}
                className="ds-btn-primary w-full justify-center"
              >
                <LogIn size={16} /> Sign in
              </button>
              <button onClick={() => navigate("/")} className="text-sm text-slate-600 hover:text-slate-400 transition-colors flex items-center gap-1.5">
                <ArrowLeft size={13} /> Back to portfolio
              </button>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#0A0C10" }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="ds-card p-8 text-center max-w-sm mx-4">
            <p className="text-red-400 text-sm mb-4">Failed to load analytics: {error.message}</p>
            <button onClick={() => refetch()} className="ds-btn-outline">Retry</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const chartData = data?.recentDays.map((d) => ({
    date: formatDate(d.day),
    views: d.views,
  })) ?? [];

  const topPagesData = data?.topPages.slice(0, 8) ?? [];
  const maxPageViews = Math.max(...topPagesData.map((p) => p.views), 1);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0C10", color: "#F1F5F9" }}>
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <p className="ds-label mb-2">Private Dashboard</p>
              <h1 className="text-3xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                Site Analytics
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Visitor statistics for{" "}
                <span style={{ color: "#3B82F6", fontFamily: "'JetBrains Mono', monospace" }}>
                  michaelleonardi.dev
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="ds-btn-outline text-sm py-2 px-3"
              >
                <ArrowLeft size={14} /> Portfolio
              </button>
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="ds-btn-primary text-sm py-2 px-3"
              >
                <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<Eye size={18} />}
              label="Total Views"
              value={data?.totalViews.toLocaleString() ?? "0"}
              sub="All time page views"
              color="#3B82F6"
            />
            <StatCard
              icon={<Users size={18} />}
              label="Unique Visitors"
              value={data?.uniqueVisitors.toLocaleString() ?? "0"}
              sub="Distinct IPs (hashed)"
              color="#06B6D4"
            />
            <StatCard
              icon={<Calendar size={18} />}
              label="Today"
              value={data?.todayViews.toLocaleString() ?? "0"}
              sub="Views since midnight"
              color="#8B5CF6"
            />
            <StatCard
              icon={<TrendingUp size={18} />}
              label="This Week"
              value={data?.weekViews.toLocaleString() ?? "0"}
              sub="Last 7 days"
              color="#10B981"
            />
          </div>

          {/* Secondary stat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <StatCard
              icon={<MessageSquare size={18} />}
              label="Contact Messages"
              value={data?.totalMessages.toLocaleString() ?? "0"}
              sub="Total via chat widget"
              color="#F59E0B"
            />
            <div
              className="ds-card p-6 flex flex-col gap-3"
              style={{ borderLeft: "3px solid #475569" }}
            >
              <span className="text-xs text-slate-500 uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Privacy
              </span>
              <p className="text-sm text-slate-400 leading-relaxed">
                IPs are one-way hashed (SHA-256 + salt) before storage. No raw IP addresses are retained. Visitor data is used solely for understanding site usage.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 p-1 rounded-lg w-fit" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {(["overview", "pages", "messages"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-md text-sm font-medium capitalize transition-all"
                style={{
                  background: activeTab === tab ? "#3B82F6" : "transparent",
                  color: activeTab === tab ? "#fff" : "#64748B",
                }}
              >
                {tab === "overview" ? "30-Day Trend" : tab === "pages" ? "Top Pages" : "Messages"}
              </button>
            ))}
          </div>

          {/* Tab: 30-day trend */}
          {activeTab === "overview" && (
            <div className="ds-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="ds-label mb-1">Daily Page Views</p>
                  <p className="text-white font-semibold">Last 30 Days</p>
                </div>
                <span className="text-xs text-slate-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {chartData.length} data points
                </span>
              </div>
              {chartData.length === 0 ? (
                <div className="flex items-center justify-center h-48 text-slate-600 text-sm">
                  No data yet — visit the portfolio to start tracking
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#475569", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
                      tickLine={false}
                      axisLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fill: "#475569", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fill="url(#viewsGradient)"
                      dot={false}
                      activeDot={{ r: 4, fill: "#3B82F6", strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          )}

          {/* Tab: Top Pages + Referrers */}
          {activeTab === "pages" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top pages */}
              <div className="ds-card p-6">
                <p className="ds-label mb-4">Top Pages</p>
                {topPagesData.length === 0 ? (
                  <p className="text-slate-600 text-sm">No data yet</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {topPagesData.map((page, i) => (
                      <div key={page.path} className="flex items-center gap-3">
                        <span
                          className="text-xs w-5 text-right flex-shrink-0"
                          style={{ color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-slate-300 truncate" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}>
                              {formatPath(page.path)}
                            </span>
                            <span className="text-xs text-slate-500 ml-2 flex-shrink-0">
                              {page.views}
                            </span>
                          </div>
                          <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(page.views / maxPageViews) * 100}%`,
                                background: "linear-gradient(to right, #3B82F6, #06B6D4)",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top referrers */}
              <div className="ds-card p-6">
                <p className="ds-label mb-4">Top Referrers</p>
                {(data?.topReferrers ?? []).length === 0 ? (
                  <p className="text-slate-600 text-sm">No referrer data yet</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {(data?.topReferrers ?? []).slice(0, 8).map((ref, i) => {
                      const maxRef = Math.max(...(data?.topReferrers ?? []).map((r) => r.views), 1);
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <Globe size={13} className="flex-shrink-0 text-slate-600" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-slate-300 truncate" style={{ fontSize: "0.72rem" }}>
                                {formatReferrer(ref.referrer)}
                              </span>
                              <span className="text-xs text-slate-500 ml-2 flex-shrink-0">
                                {ref.views}
                              </span>
                            </div>
                            <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${(ref.views / maxRef) * 100}%`,
                                  background: "linear-gradient(to right, #8B5CF6, #06B6D4)",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Messages */}
          {activeTab === "messages" && (
            <div className="ds-card p-6">
              <p className="ds-label mb-4">Recent Contact Messages</p>
              {messagesLoading ? (
                <div className="flex items-center gap-2 text-slate-500 text-sm py-8 justify-center">
                  <Loader2 size={16} className="animate-spin" /> Loading messages…
                </div>
              ) : !messages || messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare size={32} className="mx-auto mb-3 text-slate-700" />
                  <p className="text-slate-500 text-sm">No messages yet</p>
                  <p className="text-slate-700 text-xs mt-1">Messages sent via the chat widget will appear here</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-5 rounded-xl"
                      style={{ background: "#141820", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <span className="text-sm font-semibold text-white">{msg.visitorName}</span>
                          <span className="text-xs text-slate-500 ml-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            {msg.visitorEmail}
                          </span>
                        </div>
                        <span className="text-xs text-slate-600" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {timeAgo(new Date(msg.createdAt))}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{msg.message}</p>
                      <div className="flex items-center gap-3 mt-3">
                        {msg.captchaVerified ? (
                          <span className="text-xs text-green-500/70" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            ✓ captcha verified
                          </span>
                        ) : (
                          <span className="text-xs text-red-400/70" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            ✗ captcha not verified
                          </span>
                        )}
                        <span className="text-xs text-slate-700" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          IP: {msg.ipAddress.slice(0, 8)}…
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
