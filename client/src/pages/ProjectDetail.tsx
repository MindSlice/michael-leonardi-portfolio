// Deep Signal — Project Detail Page
// Full-page detail view for personal engineering projects
// Professional projects are NOT linked here (they have no detail pages)
import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { ArrowLeft, Cpu, Server, Music, CheckCircle2 } from "lucide-react";
import { projectDetails } from "@/lib/projectDetails";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

const EASE: Easing = "easeOut";

const iconMap: Record<string, React.ReactNode> = {
  cpu: <Cpu size={28} />,
  server: <Server size={28} />,
  music: <Music size={28} />,
};

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const detail = projectDetails[params.id ?? ""];

  // Track page view
  const trackView = trpc.analytics.trackView.useMutation();
  useEffect(() => {
    trackView.mutate({
      path: `/project/${params.id}`,
      referrer: document.referrer || undefined,
    });
    window.scrollTo(0, 0);
  }, [params.id]);

  if (!detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#0A0C10" }}>
        <Navbar />
        <div className="text-center">
          <p className="ds-label mb-4">404</p>
          <h1 className="text-3xl font-bold text-white mb-4">Project not found</h1>
          <button onClick={() => navigate("/")} className="ds-btn-primary">
            <ArrowLeft size={16} /> Back to portfolio
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0A0C10", color: "#F1F5F9" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 relative" style={{ background: "#0A0C10" }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${detail.badgeColor}20, transparent)`,
          }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          {/* Back button */}
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-400 transition-colors mb-8"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <ArrowLeft size={15} /> Back to portfolio
          </motion.button>

          <div className="flex items-start gap-5 mb-6">
            <motion.div
              className="flex items-center justify-center w-14 h-14 rounded-xl flex-shrink-0"
              style={{
                background: `${detail.badgeColor}15`,
                color: detail.badgeColor,
                border: `1px solid ${detail.badgeColor}30`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {iconMap[detail.icon]}
            </motion.div>
            <div>
              <motion.span
                className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
                style={{
                  background: `${detail.badgeColor}15`,
                  color: detail.badgeColor,
                  border: `1px solid ${detail.badgeColor}30`,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
              >
                {detail.badge}
              </motion.span>
              <motion.h1
                className="text-3xl sm:text-4xl font-extrabold text-white leading-tight"
                style={{ letterSpacing: "-0.02em" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
              >
                {detail.title}
              </motion.h1>
            </div>
          </div>

          {/* Overview */}
          <motion.p
            className="text-lg text-slate-300 max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
          >
            {detail.overview}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <div className="container pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Motivation */}
            <motion.div
              className="ds-card p-7 ds-accent-left"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
            >
              <p className="ds-label mb-3">Motivation</p>
              <p className="text-slate-300 leading-relaxed">{detail.motivation}</p>
            </motion.div>

            {/* Sections */}
            {detail.sections.map((section, i) => (
              <motion.div
                key={section.heading}
                className="ds-card p-7"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: EASE }}
              >
                <h2 className="text-lg font-bold text-white mb-3">{section.heading}</h2>
                <p className="text-slate-400 leading-relaxed mb-4">{section.body}</p>
                {section.tags && (
                  <div className="flex flex-wrap gap-1.5">
                    {section.tags.map((tag) => (
                      <span key={tag} className="ds-tag" style={{ fontSize: "0.65rem" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Outcomes */}
            <motion.div
              className="ds-card p-6"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
            >
              <p className="ds-label mb-4">Key Outcomes</p>
              <ul className="flex flex-col gap-3">
                {detail.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: detail.badgeColor }} />
                    {outcome}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* All tags */}
            <motion.div
              className="ds-card p-6"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38, duration: 0.5, ease: EASE }}
            >
              <p className="ds-label mb-4">Technologies & Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {detail.tags.map((tag) => (
                  <span key={tag} className="ds-tag" style={{ fontSize: "0.65rem" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Back CTA */}
            <motion.button
              onClick={() => navigate("/")}
              className="ds-btn-outline w-full justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4, ease: EASE }}
            >
              <ArrowLeft size={15} /> Back to portfolio
            </motion.button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
