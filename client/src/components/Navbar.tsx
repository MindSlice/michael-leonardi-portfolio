// Deep Signal — Navbar
// Sticky top nav with smooth scroll links and mobile hamburger menu
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { siteData } from "@/lib/data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Approach", href: "#approach" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(10, 12, 16, 0.92)"
          : "rgba(10, 12, 16, 0.0)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 group"
            aria-label="Go to top"
          >
            <span
              className="text-sm font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ML
            </span>
            <span
              className="hidden sm:block text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}
            >
              Michael Leonardi
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <a
              href={siteData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-btn-primary text-sm py-2 px-4"
            >
              LinkedIn
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: "rgba(10, 12, 16, 0.98)",
            borderColor: "rgba(255,255,255,0.07)",
          }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium py-3 px-3 rounded-lg"
              >
                {link.label}
              </button>
            ))}
            <a
              href={siteData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-btn-primary mt-2 justify-center"
            >
              LinkedIn
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
