// Deep Signal — Hero Section
// Full-viewport dark hero with animated circuit-trace background and staggered text reveal
import { ChevronDown, ExternalLink, Briefcase, FolderOpen } from "lucide-react";
import { siteData } from "@/lib/data";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663324449406/k6j4FwKcvw65qMZP73xxuJ/hero-bg-QfAtSCMTtzNdXc2bGDxuSt.webp";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0A0C10" }}
    >
      {/* Circuit background image */}
      <div
        className="absolute inset-0 animate-circuit-pulse"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />

      {/* Gradient overlays for depth and text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(10,12,16,0.45) 0%, rgba(10,12,16,0.85) 70%, rgba(10,12,16,0.98) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, #0A0C10)",
        }}
        aria-hidden="true"
      />

      {/* Hero content */}
      <div className="relative z-10 container text-center px-4">
        {/* Section label */}
        <p
          className="ds-label animate-fade-in-up hero-delay-1 mb-6"
          style={{ display: "inline-block" }}
        >
          Hardware &amp; Systems Architecture
        </p>

        {/* Name */}
        <h1
          className="animate-fade-in-up hero-delay-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}
        >
          Michael Leonardi
        </h1>

        {/* Title */}
        <p
          className="animate-fade-in-up hero-delay-3 text-lg sm:text-xl md:text-2xl font-semibold mb-4"
          style={{ color: "#93C5FD", letterSpacing: "-0.01em" }}
        >
          {siteData.title}
        </p>

        {/* Subtitle domains */}
        <p
          className="animate-fade-in-up hero-delay-3 text-sm sm:text-base mb-8 max-w-2xl mx-auto"
          style={{
            color: "#64748B",
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.7,
          }}
        >
          {siteData.subtitle}
        </p>

        {/* Positioning statement */}
        <p
          className="animate-fade-in-up hero-delay-4 text-base sm:text-lg max-w-3xl mx-auto mb-12 leading-relaxed"
          style={{ color: "#94A3B8" }}
        >
          {siteData.positioning}
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-in-up hero-delay-5 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("#experience")}
            className="ds-btn-primary"
          >
            <Briefcase size={16} />
            View Experience
          </button>
          <button
            onClick={() => scrollTo("#projects")}
            className="ds-btn-outline"
          >
            <FolderOpen size={16} />
            View Projects
          </button>
          <a
            href={siteData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-btn-outline"
          >
            <ExternalLink size={16} />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-600 hover:text-blue-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
