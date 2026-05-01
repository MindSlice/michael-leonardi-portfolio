// Deep Signal — Contact Section
// Clean contact card with LinkedIn, email placeholder, and resume download placeholder
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { Linkedin, Mail, FileDown, ExternalLink } from "lucide-react";
import { siteData } from "@/lib/data";

const EASE: Easing = "easeOut";

export default function ContactSection() {
  return (
    <section
      id="contact"
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
          Contact
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          style={{ letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          Let's{" "}
          <span style={{ color: "#3B82F6" }}>Connect</span>
        </motion.h2>
        <motion.p
          className="text-base text-slate-400 max-w-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
        >
          Open to conversations about staff/principal-level hardware and systems
          architecture roles, technical leadership opportunities, and engineering
          collaboration. LinkedIn is the best way to reach me.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
          {/* LinkedIn */}
          <motion.a
            href={siteData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-card p-6 flex flex-col items-start gap-4 group"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{
                background: "rgba(59,130,246,0.12)",
                color: "#3B82F6",
                border: "1px solid rgba(59,130,246,0.25)",
              }}
            >
              <Linkedin size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">LinkedIn</p>
              <p className="text-xs text-slate-500 mb-2">Primary contact method</p>
              <span
                className="text-xs flex items-center gap-1"
                style={{ color: "#3B82F6", fontFamily: "'JetBrains Mono', monospace" }}
              >
                linkedin.com/in/mihk101
                <ExternalLink size={11} />
              </span>
            </div>
          </motion.a>

          {/* Email placeholder */}
          <motion.div
            className="ds-card p-6 flex flex-col items-start gap-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{
                background: "rgba(6,182,212,0.12)",
                color: "#06B6D4",
                border: "1px solid rgba(6,182,212,0.25)",
              }}
            >
              <Mail size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Email</p>
              <p className="text-xs text-slate-500 mb-2">Public contact email</p>
              {/* TODO: Replace with your public email address */}
              <span
                className="text-xs"
                style={{ color: "#64748B", fontFamily: "'JetBrains Mono', monospace" }}
              >
                [searing_pythons_0v@icloud.com]
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
