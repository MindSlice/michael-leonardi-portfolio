// Deep Signal — Engineering Approach Section
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { Target, Layers, GitBranch, Users, BarChart2, ShieldCheck } from "lucide-react";
import { engineeringApproach } from "@/lib/data";

const EASE: Easing = "easeOut";

const iconMap: Record<string, React.ReactNode> = {
  target: <Target size={20} />,
  layers: <Layers size={20} />,
  "git-branch": <GitBranch size={20} />,
  users: <Users size={20} />,
  "bar-chart": <BarChart2 size={20} />,
  "shield-check": <ShieldCheck size={20} />,
};

export default function EngineeringApproachSection() {
  return (
    <section id="approach" className="py-24 relative" style={{ background: "#0A0C10" }}>
      <div className="ds-divider mb-20" />
      <div className="container">
        <motion.p
          className="ds-label mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Engineering Approach
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          style={{ letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          How I <span style={{ color: "#3B82F6" }}>Think &amp; Work</span>
        </motion.h2>
        <motion.p
          className="text-base text-slate-400 max-w-2xl mb-14 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
        >
          {engineeringApproach.intro}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineeringApproach.principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              className="ds-card p-6 flex flex-col gap-4"
              style={{ borderLeft: `3px solid ${principle.color}` }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                  style={{
                    background: `${principle.color}15`,
                    color: principle.color,
                    border: `1px solid ${principle.color}30`,
                  }}
                >
                  {iconMap[principle.icon]}
                </div>
                <h3 className="text-sm font-bold text-white leading-tight">{principle.title}</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{principle.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Leadership callout */}
        <motion.div
          className="mt-10 ds-card p-7"
          style={{ borderLeft: "3px solid #10B981", background: "rgba(16,185,129,0.04)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.3, duration: 0.55, ease: EASE }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 mt-0.5"
              style={{
                background: "rgba(16,185,129,0.12)",
                color: "#10B981",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              <Users size={18} />
            </div>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#10B981", fontFamily: "'JetBrains Mono', monospace" }}
              >
                On Technical Leadership
              </p>
              <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
                Throughout my career I have led engineering teams, directed contractors, and driven cross-functional programs — frequently without a formal management title. I task engineers technically, run architecture reviews, establish ownership frameworks, and hold teams accountable to outcomes. I believe the most effective technical leaders stay close to the work: they can review a schematic, debug a firmware issue, or challenge a vendor's datasheet claim from a position of real understanding.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
