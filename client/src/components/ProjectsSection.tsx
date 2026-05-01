// Deep Signal — Projects Section
// Rich project cards with type badges, impact lines, and technical tags
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { Cpu, Server, Music, Zap, Layout, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

const EASE: Easing = "easeOut";

const iconMap: Record<string, React.ReactNode> = {
  cpu: <Cpu size={22} />,
  server: <Server size={22} />,
  music: <Music size={22} />,
  zap: <Zap size={22} />,
  layout: <Layout size={22} />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
  }),
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
          engineering projects that demonstrate hands-on systems depth across hardware,
          firmware, and software.
        </motion.p>

        {/* Professional Projects */}
        <div className="mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: "#3B82F6", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Professional Projects
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* Personal Projects */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: "#06B6D4", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Personal Engineering Projects
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + professionalProjects.length} />
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
            {/* TODO: Add new project entries in client/src/lib/data.ts */}
            Add new entries in <code className="text-blue-400/70">data.ts</code> to expand this section
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const EASE: Easing = "easeOut";
  return (
    <motion.div
      className="ds-card p-6 flex flex-col h-full group"
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
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{
            background: `${project.badgeColor}15`,
            color: project.badgeColor,
            border: `1px solid ${project.badgeColor}30`,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.04em",
          }}
        >
          {project.badge}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-blue-300 transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">
        {project.description}
      </p>

      {/* Impact line */}
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

      {/* Tags */}
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
