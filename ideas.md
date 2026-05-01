# Design Direction: Deep Signal

## Chosen Approach: "Deep Signal"

**Design Movement:** Dark-mode engineering precision — PCB trace aesthetic meets senior technical leadership profile.

**Core Principles:**
1. Near-black graphite background (#0A0C10) — serious, premium, not trendy
2. Electric blue (#3B82F6) + cyan (#06B6D4) accents used sparingly for maximum impact
3. JetBrains Mono for labels, tags, and technical metadata — signals engineering depth
4. Inter for body copy — maximum readability
5. Glassmorphism cards: bg-white/5 backdrop-blur border border-white/10

**Color Philosophy:**
- Background: #0A0C10 (near-black graphite)
- Surface: #0F1117 (card backgrounds)
- Accent primary: #3B82F6 (electric blue)
- Accent secondary: #06B6D4 (cyan)
- Text primary: #F8FAFC (near-white)
- Text secondary: #94A3B8 (slate-400)
- Border: rgba(255,255,255,0.08)

**Layout Paradigm:**
- Full-viewport hero with circuit-trace background image
- Single-page scroll with sticky nav
- Left-rail vertical timeline for experience
- Asymmetric card grid for projects (3-col desktop, 2-col tablet, 1-col mobile)
- Skills in grouped tag-chip clusters with category headers

**Signature Elements:**
1. Animated circuit-trace hero background (generated image + CSS pulse animation)
2. Blue left-border accent on experience timeline cards
3. Monospace JetBrains Mono for all technical labels, tags, and metadata

**Interaction Philosophy:**
- Scroll-triggered fade-in for all sections (Framer Motion)
- Card lift on hover (translateY -4px + shadow glow)
- CTA buttons with glowing blue border + subtle pulse

**Animation:**
- Hero: background image with slow CSS opacity pulse overlay
- Sections: fade-in + slide-up on scroll intersection
- Cards: hover lift with box-shadow glow
- Nav: smooth scroll to sections
- Reduced-motion: all animations disabled via prefers-reduced-motion

**Typography System:**
- Headings: Inter 700/800 — large, confident
- Labels/tags: JetBrains Mono 400/500 — technical precision
- Body: Inter 400 — clean readability
- Section labels: uppercase monospace with blue accent color
