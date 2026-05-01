// Deep Signal — Michael Leonardi Portfolio
// Design: dark graphite (#0A0C10) + electric blue (#3B82F6) + cyan (#06B6D4)
// Typography: Inter (body/headings) + JetBrains Mono (labels, tags, metadata)
// Layout: single-page scroll, sticky nav, vertical timeline, card grid
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { usePageTracking } from "@/hooks/usePageTracking";

export default function Home() {
  usePageTracking("/");
  return (
    <div
      className="min-h-screen"
      style={{ background: "#0A0C10", color: "#F1F5F9" }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
