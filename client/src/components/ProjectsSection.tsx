// Deep Signal — Projects Section
// Personal projects are CLICKABLE (link to detail page)
// Professional projects are NOT clickable (NDA / confidential)
// Clear visual distinction between the two types
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { Cpu, Server, Music, Zap, Layout, ArrowRight, Lock } from "lucide-react";
import { useLocation } from "wouter";
import { projects } from "@/lib/data";
import { projectDetails } from "@/lib/projectDetails";
import { trpc } from "@/lib/trpc";

const EASE: Easing = "easeOut";

const iconMap: Record<string, React.ReactNode> = {
  cpu: <Cpu size={22} />,
  server: <Server size={22} />,
  music: <Music size={22} />,
  zap: <Zap size={22} />,
  layout: <Layout size={22} />,
};

export default function ProjectsSection() {
  const personalProjects = projects.filter((p) => p.type === "personal");
  const professionalProjects = projects.filter((p) => p.type === "professional");

  return (
    <section
      id="projects"
      className="py-24 relative"
      style={{ background: "#0A0C10" }}
    >
      <div className="ds-divider mb-20" />

      <div className="container">
        <motion.p
          className="ds-label mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Projects
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          style={{ letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          Engineering Work,{" "}
          <span style={{ color: "#3B82F6" }}>Professional &amp; Personal</span>
        </motion.h2>
        <motion.p
          className="text-base text-slate-400 max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
        >
          Selected professional NTI and cross-functional execution work, alongside personal
          engineering projects with full technical detail available.
        </motion.p>

        {/* Professional Projects — NOT clickable */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#3B82F6", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Professional Projects
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Lock size={11} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>Confidential — no public detail pages</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalProjects.map((project, i) => (
              <ProfessionalCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* Personal Projects — CLICKABLE */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#06B6D4", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Personal Engineering Projects
            </p>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#06B6D4", opacity: 0.7 }}>
              <ArrowRight size={11} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>Click any card for full technical detail</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalProjects.map((project, i) => (
              <PersonalCard key={project.id} project={project} index={i + professionalProjects.length} />
            ))}
          </div>
        </div>

        {/* Add more projects note */}
        <motion.div
          className="mt-12 ds-card p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ borderStyle: "dashed", borderColor: "rgba(59,130,246,0.2)" }}
        >
          <p className="text-slate-500 text-sm mb-1">More projects coming soon</p>
          <p
            className="text-xs"
            style={{ color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Add new entries in <code className="text-blue-400/70">data.ts</code> + <code className="text-cyan-400/70">projectDetails.ts</code> to expand this section
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── Professional Card (non-clickable, confidential badge) ──────────────────
function ProfessionalCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      className="ds-card p-6 flex flex-col h-full"
      style={{ cursor: "default" }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: EASE }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
          style={{
            background: `${project.badgeColor}15`,
            color: project.badgeColor,
            border: `1px solid ${project.badgeColor}30`,
          }}
        >
          {iconMap[project.icon]}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: `${project.badgeColor}15`,
              color: project.badgeColor,
              border: `1px solid ${project.badgeColor}30`,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {project.badge}
          </span>
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}
          >
            <Lock size={10} /> Confidential
          </span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-3 leading-snug">{project.title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">{project.description}</p>

      <div
        className="text-xs leading-relaxed mb-4 p-3 rounded-lg"
        style={{
          background: "rgba(59,130,246,0.06)",
          borderLeft: `2px solid ${project.badgeColor}`,
          color: "#94A3B8",
          fontStyle: "italic",
        }}
      >
        <span className="not-italic font-semibold" style={{ color: project.badgeColor }}>
          What it demonstrates:{" "}
        </span>
        {project.impact}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="ds-tag" style={{ fontSize: "0.65rem" }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Personal Card (clickable, has detail page) ─────────────────────────────
function PersonalCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [, navigate] = useLocation();
  const hasDetail = !!projectDetails[project.id];
  const trackView = trpc.analytics.trackView.useMutation();

  const handleClick = () => {
    if (!hasDetail) return;
    trackView.mutate({ path: `/project/${project.id}`, referrer: window.location.pathname });
    navigate(`/project/${project.id}`);
  };

  return (
    <motion.div
      className="ds-card p-6 flex flex-col h-full group"
      style={{ cursor: hasDetail ? "pointer" : "default" }}
      onClick={handleClick}
      role={hasDetail ? "button" : undefined}
      tabIndex={hasDetail ? 0 : undefined}
      onKeyDown={(e) => { if (hasDetail && (e.key === "Enter" || e.key === " ")) handleClick(); }}
      aria-label={hasDetail ? `View details for ${project.title}` : undefined}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: EASE }}
      whileHover={hasDetail ? { y: -4, boxShadow: "0 0 28px rgba(6,182,212,0.18), 0 12px 40px rgba(0,0,0,0.5)" } : {}}
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 transition-colors"
          style={{
            background: `${project.badgeColor}15`,
            color: project.badgeColor,
            border: `1px solid ${project.badgeColor}30`,
          }}
        >
          {iconMap[project.icon]}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: `${project.badgeColor}15`,
              color: project.badgeColor,
              border: `1px solid ${project.badgeColor}30`,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {project.badge}
          </span>
          {hasDetail && (
            <span
              className="flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: "#06B6D4", fontFamily: "'JetBrains Mono', monospace" }}
            >
              View details <ArrowRight size={10} />
            </span>
          )}
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-cyan-300 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">{project.description}</p>

      <div
        className="text-xs leading-relaxed mb-4 p-3 rounded-lg"
        style={{
          background: "rgba(6,182,212,0.06)",
          borderLeft: `2px solid ${project.badgeColor}`,
          color: "#94A3B8",
          fontStyle: "italic",
        }}
      >
        <span className="not-italic font-semibold" style={{ color: project.badgeColor }}>
          What it demonstrates:{" "}
        </span>
        {project.impact}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="ds-tag" style={{ fontSize: "0.65rem" }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Click indicator at bottom */}
      {hasDetail && (
        <div
          className="mt-4 pt-3 flex items-center gap-1.5 text-xs opacity-50 group-hover:opacity-100 transition-opacity"
          style={{ borderTop: "1px solid rgba(6,182,212,0.15)", color: "#06B6D4" }}
        >
          <ArrowRight size={12} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>Full technical write-up</span>
        </div>
      )}
    </motion.div>
  );
}
