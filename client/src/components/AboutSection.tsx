// Deep Signal — About Section
// Clean two-column layout: text left, stat highlights right
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { about } from "@/lib/data";

const EASE: Easing = "easeOut";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: EASE },
  }),
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 relative"
      style={{ background: "#0A0C10" }}
    >
      {/* Subtle top divider */}
      <div className="ds-divider mb-20" />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Text column */}
          <div className="lg:col-span-2">
            <motion.p
              className="ds-label mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0}
              variants={fadeUp}
            >
              About
            </motion.p>
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-white mb-8"
              style={{ letterSpacing: "-0.02em" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={1}
              variants={fadeUp}
            >
              Engineering depth.
              <br />
              <span style={{ color: "#3B82F6" }}>Leadership at scale.</span>
            </motion.h2>

            {about.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className="text-base leading-relaxed mb-5"
                style={{ color: "#94A3B8" }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i + 2}
                variants={fadeUp}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Stats column */}
          <div className="flex flex-col gap-4">
            {about.highlights.map((h, i) => (
              <motion.div
                key={i}
                className="ds-card p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i + 1}
                variants={fadeUp}
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: "#3B82F6", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {h.label}
                </div>
                <div className="text-sm text-slate-400">{h.description}</div>
              </motion.div>
            ))}

            {/* Domains quick-list */}
            <motion.div
              className="ds-card p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={5}
              variants={fadeUp}
            >
              <p className="ds-label mb-3">Domain Expertise</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Wearables",
                  "Smart Glasses",
                  "VR / AR",
                  "Smartphones",
                  "Aerospace",
                  "UAV",
                  "Embedded Systems",
                  "Power Systems",
                ].map((d) => (
                  <span key={d} className="ds-tag">
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
