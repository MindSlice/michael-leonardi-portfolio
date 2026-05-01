# Michael Leonardi — Personal Portfolio Website

A polished personal professional portfolio website for **Michael Leonardi**, Staff-Level Hardware & Systems Architecture Leader. Built with Vite + React + TypeScript + Tailwind CSS 4, designed for GitHub Pages deployment.

**Design direction:** "Deep Signal" — dark graphite background, electric blue accents, JetBrains Mono technical labels, animated circuit-trace hero, glass-morphism cards.

---

## Live Site

> Deploy to GitHub Pages following the instructions below, then update this line with your live URL.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Routing | Wouter |
| Fonts | Inter + JetBrains Mono (Google Fonts) |

---

## Local Development

### Prerequisites

- Node.js 18+ (Node 22 recommended)
- pnpm (`npm install -g pnpm`)

### Install and run

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/michael-leonardi-portfolio.git
cd michael-leonardi-portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The site will be available at `http://localhost:3000`.

---

## Updating Content

All site content lives in a single file — **no component code changes needed** for routine updates:

```
client/src/lib/data.ts
```

This file contains:

- `siteData` — name, title, LinkedIn URL, email placeholder, resume URL placeholder
- `about` — bio paragraphs and highlight stats
- `experience` — all work history entries
- `projects` — project cards (add new projects here)
- `skills` — hardware, tools, programming, and leadership skill lists
- `education` — degree entries
- `honors` — awards and organizations

### Adding a new project

Open `client/src/lib/data.ts` and add an entry to the `projects` array:

```typescript
{
  id: "my-new-project",           // unique slug
  title: "Project Title",
  type: "personal",               // "personal" | "professional"
  badge: "Personal Engineering",
  badgeColor: "#06B6D4",          // cyan for personal, #3B82F6 blue for professional
  description: "Short description of the project.",
  impact: "What this demonstrates about your engineering depth.",
  tags: ["Tag1", "Tag2", "Tag3"],
  icon: "cpu",                    // "cpu" | "server" | "music" | "zap" | "layout"
},
```

### Adding your email

In `client/src/lib/data.ts`, replace:
```typescript
email: "[add-public-email@domain.com]",
```
with your public email address. Then update `client/src/components/ContactSection.tsx` to render it as a `mailto:` link.

### Adding a resume PDF

1. Host your PDF somewhere publicly accessible (GitHub Releases, Google Drive, Dropbox, etc.)
2. In `client/src/lib/data.ts`, set `resumeUrl` to the direct download URL
3. In `client/src/components/ContactSection.tsx`, wrap the resume card in an `<a href={siteData.resumeUrl}>` tag

### Adding a custom domain

In `client/public/`, create a file named `CNAME` with your domain:
```
yourdomain.com
```

---

## Build for Production

```bash
pnpm build
```

Output goes to `dist/public/`. This is what gets deployed to GitHub Pages.

---

## Deployment: GitHub Pages

### Option 1 — Manual deploy (simplest)

1. Build the site:
   ```bash
   pnpm build
   ```
2. Push the `dist/public/` folder contents to a `gh-pages` branch, or use the `gh-pages` npm package:
   ```bash
   pnpm add -D gh-pages
   ```
   Add to `package.json` scripts:
   ```json
   "deploy": "gh-pages -d dist/public"
   ```
   Then run:
   ```bash
   pnpm deploy
   ```
3. In GitHub → **Settings → Pages**, set source to **Deploy from a branch** → branch: `gh-pages` → folder: `/ (root)`.
4. Click **Save**. Your site will be live at `https://YOUR_USERNAME.github.io/michael-leonardi-portfolio/`.

### Option 2 — GitHub Actions (recommended for ongoing updates)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/public
      - uses: actions/deploy-pages@v4
        id: deployment
```

Then in GitHub → **Settings → Pages**, set source to **GitHub Actions**.

Every push to `main` will automatically build and deploy.

### Enabling GitHub Pages (step-by-step)

1. Go to your repository on GitHub
2. Click **Settings** (top tab)
3. In the left sidebar, click **Pages**
4. Under **Source**, choose either:
   - **Deploy from a branch** → select `gh-pages` branch (Option 1)
   - **GitHub Actions** (Option 2)
5. Click **Save**
6. Wait ~2 minutes, then visit `https://YOUR_USERNAME.github.io/michael-leonardi-portfolio/`

---

## Vite Base URL for GitHub Pages

If deploying to a subdirectory (e.g., `github.io/michael-leonardi-portfolio`), set the `base` in `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/michael-leonardi-portfolio/',
  // ...
})
```

If using a custom domain at the root, set `base: '/'`.

---

## Analytics

<!-- TODO: Add analytics provider here (e.g., Plausible, Fathom, or Google Analytics) -->
The HTML template includes a placeholder for analytics. To add Plausible or similar:
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## Project Structure

```
michael-leonardi-portfolio/
├── client/
│   ├── index.html              ← HTML entry point, fonts, meta tags
│   ├── public/
│   │   └── CNAME               ← Add for custom domain
│   └── src/
│       ├── components/
│       │   ├── Navbar.tsx       ← Sticky navigation
│       │   ├── HeroSection.tsx  ← Full-viewport hero with circuit background
│       │   ├── AboutSection.tsx ← Bio and highlights
│       │   ├── ExperienceSection.tsx  ← Vertical timeline
│       │   ├── ProjectsSection.tsx    ← Project cards
│       │   ├── SkillsSection.tsx      ← Skills with depth bars
│       │   ├── EducationSection.tsx   ← Degrees and honors
│       │   ├── ContactSection.tsx     ← Contact links
│       │   └── Footer.tsx
│       ├── lib/
│       │   └── data.ts          ← ALL CONTENT LIVES HERE
│       ├── pages/
│       │   └── Home.tsx         ← Page assembly
│       ├── App.tsx
│       └── index.css            ← Deep Signal design tokens
├── ideas.md                     ← Design direction documentation
├── README.md
└── package.json
```

---

## License

MIT — feel free to adapt for your own portfolio.
