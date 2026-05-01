// Deep Signal — Education & Honors Section
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { GraduationCap, Award, Shield } from "lucide-react";
import { education, honors } from "@/lib/data";

const EASE: Easing = "easeOut";

export default function EducationSection() {
  return (
    <section
      id="education"
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
          Education & Honors
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-16"
          style={{ letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          Academic{" "}
          <span style={{ color: "#3B82F6" }}>Foundation</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education cards */}
          <div className="flex flex-col gap-6">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#3B82F6", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Degrees
            </p>
            {education.map((edu, i) => (
              <motion.div
                key={edu.school}
                className="ds-card p-6 ds-accent-left"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: EASE }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                    style={{
                      background: "rgba(59,130,246,0.12)",
                      color: "#3B82F6",
                      border: "1px solid rgba(59,130,246,0.25)",
                    }}
                  >
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{edu.school}</h3>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#93C5FD" }}>
                      {edu.degree}
                    </p>
                    <p className="text-xs text-slate-500 mb-2">{edu.year}</p>
                    <span className="ds-tag">{edu.emphasis}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Honors & Clearance */}
          <div className="flex flex-col gap-6">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#06B6D4", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Awards & Organizations
            </p>
            {honors.map((honor, i) => (
              <motion.div
                key={honor.title}
                className="ds-card p-6"
                style={{ borderLeft: "3px solid #06B6D4" }}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: EASE }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                    style={{
                      background: "rgba(6,182,212,0.12)",
                      color: "#06B6D4",
                      border: "1px solid rgba(6,182,212,0.25)",
                    }}
                  >
                    {honor.icon === "award" ? (
                      <Award size={18} />
                    ) : (
                      <Shield size={18} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{honor.title}</h3>
                    <p className="text-sm text-slate-400">{honor.description}</p>
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
