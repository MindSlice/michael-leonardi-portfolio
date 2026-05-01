// Deep Signal — Skills Section
// Grouped skill cards with category icons and tag chips
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { Cpu, Code, Terminal, Users } from "lucide-react";
import { skills } from "@/lib/data";

const EASE: Easing = "easeOut";

const categories = [
  {
    key: "hardware" as const,
    label: "Hardware",
    sublabel: "Systems & Electrical",
    icon: <Cpu size={20} />,
    color: "#3B82F6",
    items: skills.hardware,
  },
  {
    key: "tools" as const,
    label: "Tools & Equipment",
    sublabel: "EDA, Simulation & Lab",
    icon: <Terminal size={20} />,
    color: "#06B6D4",
    items: skills.tools,
  },
  {
    key: "programming" as const,
    label: "Programming",
    sublabel: "Embedded & Scripting",
    icon: <Code size={20} />,
    color: "#8B5CF6",
    items: skills.programming,
  },
  {
    key: "leadership" as const,
    label: "Leadership",
    sublabel: "Execution & Strategy",
    icon: <Users size={20} />,
    color: "#10B981",
    items: skills.leadership,
  },
];

// Systems depth areas for the visual bar
const systemsDepth = [
  { label: "Architecture", pct: 95, color: "#3B82F6" },
  { label: "Power Systems", pct: 92, color: "#3B82F6" },
  { label: "Firmware Integration", pct: 85, color: "#06B6D4" },
  { label: "Validation & Test", pct: 90, color: "#06B6D4" },
  { label: "Manufacturing & CM", pct: 88, color: "#8B5CF6" },
  { label: "Automation & Tooling", pct: 80, color: "#8B5CF6" },
  { label: "Technical Leadership", pct: 95, color: "#10B981" },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
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
          Skills & Expertise
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-16"
          style={{ letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          Full-Stack{" "}
          <span style={{ color: "#3B82F6" }}>Hardware Engineering</span>
        </motion.h2>

        {/* Skill category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              className="ds-card p-6"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-lg"
                  style={{
                    background: `${cat.color}15`,
                    color: cat.color,
                    border: `1px solid ${cat.color}30`,
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{cat.label}</div>
                  <div
                    className="text-xs"
                    style={{ color: "#64748B", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {cat.sublabel}
                  </div>
                </div>
              </div>

              {/* Tag chips */}
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="ds-tag"
                    style={{
                      background: `${cat.color}10`,
                      borderColor: `${cat.color}25`,
                      color: `${cat.color}CC`,
                      fontSize: "0.65rem",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Systems depth visualization */}
        <motion.div
          className="ds-card p-8"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="ds-label mb-6">Systems Depth</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
            {systemsDepth.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: EASE }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-slate-300 font-medium">{item.label}</span>
                  <span
                    className="text-xs"
                    style={{ color: item.color, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.pct}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(to right, ${item.color}, ${item.color}99)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.07 + 0.2, duration: 0.8, ease: EASE }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
