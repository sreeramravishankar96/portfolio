# Sreeram Ravishankar — Production Portfolio

A bespoke, production-ready personal portfolio built for **Sreeram Ravishankar**, Software Engineer specializing in Java, Spring Boot, distributed microservices, and enterprise authentication platforms.

The website is **100% client-side static HTML, CSS, and JavaScript** with **zero backend services, zero server code, and zero network API calls**.

---

## 1. Quick Start

### Run Locally (Development)
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Generate 100% Static HTML / CSS / JS Export
```bash
npm run build
```
This generates the static website files directly into the **`out/`** folder.

### Preview Static Front-End
```bash
npm run preview
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

You can also deploy the contents of the `out/` folder directly to any static hosting service (such as **GitHub Pages**, **Cloudflare Pages**, **Netlify**, or **Vercel**)—no server or backend is required.

---

## 2. Architecture & Design System

- **Zero Backend**: All data, navigation, interactions, animations, and video playback run 100% in the visitor's browser. There are no API routes, no server calls, and no database queries.
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript (configured with `output: 'export'` for pure static compilation).
- **Styling**: Tailwind CSS v4 + component-level CSS in `@layer components` and `<style jsx>`.
- **Motion & Scrolling**: Lenis smooth scrolling (only external animation library), browser `requestAnimationFrame` physics loops, and `IntersectionObserver`.
- **Design Tokens**:
  - `--paper`: `#f4f2ee` (warm off-white background)
  - `--card`: `#ffffff` (white card background)
  - `--ink`: `#0d0d0d` (typography, buttons, active states)
  - `--ink-2`: `#3a3a3a`
  - `--mute`: `#77756f`
  - `--line`: `rgba(13, 13, 13, 0.1)`
  - `--ease`: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Self-Hosted Typography** (`src/fonts/`):
  - **Inter Tight** (variable): Primary display and body text
  - **Instrument Serif** (regular & italic): Editorial italic accent word per section heading
  - **JetBrains Mono** (variable): Monospace tags, indicators, and element cards
- **Single Source of Truth**: All profile data, experience, skills, projects, and certifications live strictly in [`src/lib/data.ts`](src/lib/data.ts), derived 100% verbatim from `resume.pdf`.

---

## 3. Sections Table

| # | Section | Nav Link | Description & Key Interaction |
|---|---|---|---|
| **00** | **Hero** | — | Center video with backdrop blend mode `multiply` and bottom feather mask (person silhouette only, no box). Speaks introduction once on load, and replays upon clicking the ▶ button. |
| **01** | **About** | `About` | Three-column layout. Verbatim résumé summary, quick facts, and interactive 3D ID card hanging from a lanyard with damped pendulum swing physics and card-flip (Front: developer ID / Back: résumé credentials). |
| **02** | **Skills** | `Skills` | "Periodic Table of My Stack". 8-column element tiles with family filters (Languages, Frameworks, Security, Cloud, Databases, DevOps, Concepts) and a sticky 150px logo inspector with pop animation. |
| **03** | **Work** | `Work` | Expanding horizontal accordion (`flex: 8` expanded, folded spines). Features, tech chips, and illustrative grayscale mini-UIs (Hospital Admin, Multiplayer Cards, ISRO Baseband Telemetry). |
| **04** | **Certifications** | `Certifications` | Numbered list with left sticky header and full-bleed white background. Smooth left-to-right ink-flood fill on hover/focus (`scaleX: 0 → 1`) with sliding diagonal arrows. |
| **05** | **Experience** | `Experience` | Unified chronological path combining education (Glasgow M.Sc., REVA B.Tech) and industry experience (Straumann Group, Yell, FLAGROOT) with a scroll-drawn active ink spine. Flows directly into Contact. |
| **06** | **Contact** | `Contact` | Bouncing letter hopping headline (`translateY` bounce per character), one-click copy email button with `aria-live`, phone, LinkedIn, resume download, and spinning circular badge. |

---

## 4. Rebuilding Hero Video Assets (One-Time Media Prep)

The video processing script [`scripts/build-hero-assets.py`](scripts/build-hero-assets.py) is strictly an offline utility script:
- Crops the video tightly around the subject (560×700 scaled to 768px wide).
- Whitens the backdrop to pure 255 `#ffffff` so it blends cleanly into the `#f4f2ee` background.
- Loops video and audio cleanly.
- Exports static `.mp4` and `.webm` files directly into `public/hero/`.

Once generated, the website itself loads these static files directly like any other image or asset.

---

## 5. Credits & Licenses

- **Logos**: Official brand SVGs from [Devicon](https://github.com/devicons/devicon) (MIT License) and [Simple Icons](https://simpleicons.org) (CC0 1.0 Universal). License notice preserved at [`public/logos/LICENSE`](public/logos/LICENSE).
- **Fonts**: Inter Tight (SIL OFL 1.1), Instrument Serif (SIL OFL 1.1), JetBrains Mono (Apache 2.0).
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis) (MIT License).
