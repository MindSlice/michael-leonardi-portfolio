// Deep Signal — Footer
import { siteData } from "@/lib/data";
import { Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-10 border-t"
      style={{
        background: "#080A0E",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-bold text-white"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ML
          </span>
          <span className="text-sm text-slate-600">
            Michael Leonardi · Hardware & Systems Architecture
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={siteData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <span
            className="text-xs text-slate-700"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © {year}
          </span>
        </div>
      </div>
    </footer>
  );
}
