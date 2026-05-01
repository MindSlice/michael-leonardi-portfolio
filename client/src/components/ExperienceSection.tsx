// Deep Signal — Experience Section
// Vertical timeline with glass cards, blue left-accent, and scroll-triggered animations
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { experience } from "@/lib/data";

const EASE: Easing = "easeOut";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: EASE },
  }),
};

export default function ExperienceSection() {
  return (
    <section
      id="experience"
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
          Professional Experience
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-16"
          style={{ letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          18+ Years of Engineering{" "}
          <span style={{ color: "#3B82F6" }}>Leadership</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical rail */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(59,130,246,0.35) 8%, rgba(59,130,246,0.35) 92%, transparent)",
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="relative sm:pl-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                variants={fadeUp}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-6 hidden sm:flex items-center justify-center w-12 h-12 rounded-full text-xs font-bold z-10"
                  style={{
                    background: "#0F1117",
                    border: `2px solid ${exp.color}`,
                    color: exp.color,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.05em",
                    boxShadow: `0 0 16px ${exp.color}30`,
                  }}
                >
                  {exp.companyInitial}
                </div>

                {/* Card */}
                <div
                  className="ds-card p-6 sm:p-8"
                  style={{ borderLeft: `3px solid ${exp.color}` }}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-white">
                          {exp.company}
                        </h3>
                        <span
                          className="ds-tag"
                          style={{
                            background: `${exp.color}18`,
                            borderColor: `${exp.color}40`,
                            color: exp.color,
                          }}
                        >
                          {exp.role}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-5">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm leading-relaxed"
                        style={{ color: "#94A3B8" }}
                      >
                        <span
                          className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: exp.color }}
                          aria-hidden="true"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="ds-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
