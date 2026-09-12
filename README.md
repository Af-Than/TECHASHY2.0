# Techashy — Official Hackathon Website

> **Premier 24-hour hackathon powered by Betalabs @ IIIT Kottayam**  
> March 14–15, 2026 · ₹80,808 in prizes · Free to participate

---

## Table of Contents

1. [Overview](#overview)
2. [Live Site Structure](#live-site-structure)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Available Scripts](#available-scripts)
7. [Components Reference](#components-reference)
8. [Design System](#design-system)
9. [Sections & Content](#sections--content)
10. [Dependencies](#dependencies)
11. [Environment & Configuration](#environment--configuration)

---

## Overview

Techashy is a fully custom-built, single-page hackathon website for the inaugural Techashy event organized by **Betalabs** at **IIIT Kottayam, Kerala**. The site features:

- Animated hero section with a live countdown clock (slot-machine rolling digits)
- Scroll-driven GSAP animations on every section
- Mobile-first responsive design with a React Portal–powered fullscreen mobile navbar
- 7 competition tracks, prize breakdown, event timeline, venue details, and FAQ
- Dark cyberpunk aesthetic — crimson (`#DC143C`) on near-black backgrounds

---

## Live Site Structure

The page renders sections in this order:

| # | Section | Component | ID |
|---|---------|-----------|-----|
| 1 | Hero + Countdown | `page.js` (inline) | `#home` |
| 2 | About / Stats | `About.jsx` | `#about` |
| 3 | Competition Tracks | `Tracks.jsx` | `#tracks` |
| 4 | Prizes | `Prizes.jsx` | `#prizes` |
| 5 | Event Timeline | `Timeline.jsx` | `#timeline` |
| 6 | Venue | `Venue.jsx` | `#venue` |
| 7 | FAQ | `FAQ.jsx` | `#faq` |
| 8 | Footer | `Footer.jsx` | — |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI Library | React 19 |
| Styling | Plain CSS per component + Tailwind CSS 4 (utility classes in `page.js`) |
| Animations | [GSAP](https://gsap.com/) 3.14 + ScrollTrigger plugin |
| 3D / Canvas | Three.js, `@react-three/fiber`, `@react-three/drei`, Spline |
| Icons | `react-icons`, `lucide-react` |
| Fonts | Google Fonts via `next/font/google` (Iceberg, Montserrat, Press Start 2P, Six Caps, Exo 2, Noto Sans JP) |
| Linting | ESLint 9 + eslint-config-next |
| Build | Webpack (via `--webpack` flag), PostCSS, LightningCSS |

---

## Project Structure

```
techashy-website/
├── public/
│   └── Techashi_Logo-removebg-preview.png   # Favicon & OG image
│
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout — font loading, metadata, OG tags
│   │   ├── page.js            # Main page — hero, countdown, section orchestration
│   │   ├── globals.css        # Global styles, countdown animation, CSS variables
│   │   └── api/
│   │       └── health/
│   │           └── route.js   # Health-check API endpoint
│   │
│   ├── components/            # Shared / structural UI components
│   │   ├── Navbar.jsx         # Fixed nav with React Portal mobile menu
│   │   ├── Navbar.css
│   │   ├── Footer.jsx         # Site footer
│   │   ├── Footer.css
│   │   ├── Timeline.jsx       # Event schedule timeline
│   │   ├── Timeline.css
│   │   ├── Venue.jsx          # Venue location + Google Maps embed
│   │   ├── Venue.css
│   │   ├── FAQ.jsx            # Accordion FAQ
│   │   ├── FAQ.css
│   │   ├── LoadingAnimation.jsx  # Intro loading screen
│   │   └── LoadingAnimation.css
│   │
│   ├── pageComponents/        # Full-page sections
│   │   ├── About.jsx          # Mission, stats (24 hrs, 150+ participants, ₹80,808, 3-5 team)
│   │   ├── About.css
│   │   ├── Tracks.jsx         # 7 competition tracks grid
│   │   ├── Tracks.css
│   │   ├── Prizes.jsx         # Prize tier cards (₹40,404 / ₹20,202 / ₹10,101)
│   │   ├── Prizes.css
│   │   ├── Sponsors.jsx       # Sponsors section (currently hidden in page.js)
│   │   └── Sponsors.css
│   │
│   └── lib/
│       ├── useGsapReveal.js   # Custom hook — generic GSAP scroll-reveal
│       └── utils.js           # Tailwind class-merge utility (clsx + tailwind-merge)
│
├── components.json            # shadcn/ui config
├── eslint.config.mjs          # ESLint flat config
├── jsconfig.json              # Path aliases (@/components → src/components)
├── next.config.mjs            # Next.js config
├── postcss.config.mjs         # PostCSS / Tailwind pipeline
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or pnpm / yarn)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd techashy-website

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Opens at **http://localhost:3001** (port 3001 is set explicitly in `package.json`).

### Production Build

```bash
npm run build
npm run start
```

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev -p 3001 --webpack` | Start dev server on port 3001 using Webpack |
| `build` | `next build` | Create optimised production build |
| `start` | `next start -p 3001` | Serve the production build on port 3001 |
| `lint` | `eslint` | Run ESLint across the project |

---

## Components Reference

### `Navbar.jsx`
Fixed top navigation bar with:
- **Desktop**: Horizontal link list with smooth scroll and active-section highlighting via `IntersectionObserver`
- **Mobile**: Fullscreen overlay rendered via **React `createPortal`** directly onto `document.body` — bypasses `backdrop-filter` stacking context issues
- Body scroll is locked (`overflow: hidden`) while the mobile menu is open
- Close button (×) positioned in the top-right corner of the overlay
- Active section detection updates both desktop and mobile link styles

### `LoadingAnimation.jsx`
Intro animation shown before the site content is revealed. Controls `isLoading` state in `page.js`; triggers GSAP hero entrance animation on completion.

### `Timeline.jsx`
Vertical timeline of 6 key events from Registration Opens (Feb 27) through Results & Certificates (Mar 15). Highlights the current/upcoming event dynamically based on today's date. Day 1 includes an expandable schedule sub-list.

### `Venue.jsx`
- Location card: IIIT Kottayam, Kerala with a Google Maps directions link
- Arrival schedule card: Day 1 morning schedule (8 AM → 12 PM)
- Google Maps `<iframe>` embed with a crimson-toned CSS filter matching the site theme

### `About.jsx`
Stats section with GSAP counter animation for numeric values. Non-numeric values (e.g. `"3-5"` for team size) are rendered directly, bypassing the counter to avoid corruption.

### `Tracks.jsx`
7-card grid of competition tracks. Each card has a number, short tag, full name, and one-liner description.

### `Prizes.jsx`
Three-tier prize cards:
- 🥇 **1st Place** — ₹40,404 + Internship Opportunity at an IIIT Kottayam student startup
- 🥈 **2nd Place** — ₹20,202
- 🥉 **3rd Place** — ₹10,101
- All participants receive a certificate of participation

### `FAQ.jsx`
Accordion-style FAQ. Key answers:
- Registration is **completely free**
- Event: **March 14–15, 2026 @ IIIT Kottayam**
- Total prize pool: **₹80,808**

---

## Design System

### Colors

| Role | Value |
|------|-------|
| Primary accent | `#DC143C` (crimson) |
| Background (primary) | `#080808` |
| Background (secondary) | `#050505` |
| Text (primary) | `#FFFFFF` |
| Text (muted) | `rgba(255,255,255,0.6)` |
| Border / divider | `rgba(220, 20, 60, 0.15)` |

### Typography

| Variable | Font | Usage |
|----------|------|-------|
| `--font-iceberg` | Iceberg | Section headings, navbar links |
| `--font-montserrat` | Montserrat 700–900 | Sub-headings, bold labels |
| `--font-pixel` | Press Start 2P | Retro/pixel accent text |
| `--font-six-caps` | Six Caps | Large display caps |
| `--font-exo2` | Exo 2 | Body / regular text |
| — | Courier New | Mono labels, eyebrow text |
| — | Gang of Three | Hero `TECHASHY` title |

### Section Header Pattern

Every section follows this eyebrow pattern:
```
/ LABEL          ← small Courier New, crimson
/HEADING         ← Iceberg display font, white
Subtitle text    ← smaller muted helper text
```

### Card Pattern
Cards use:
- `#0a0a0a` / `#0d0d0d` background
- `1px solid rgba(220, 20, 60, 0.15)` border
- Left `3px solid #DC143C` accent bar on hover / active states
- `backdrop-filter: blur(...)` for glass effect where applicable

---

## Sections & Content

### Event Details
- **Name**: Techashy Hackathon
- **Organized by**: Betalabs
- **Venue**: IIIT Kottayam, Kerala, India
- **Dates**: March 14–15, 2026
- **Duration**: 24 hours (continuous)
- **Format**: Offline, in-person
- **Team Size**: 3–5 members
- **Entry Fee**: Free

### Timeline Summary

| Date | Milestone |
|------|-----------|
| Feb 27 | Registration opens (Google Form, 10 AM) |
| Mar 07 | Registration & submission deadline (11:59 PM) |
| Mar 08 | Round 1 shortlisting — selected teams notified |
| Mar 11 | RSVP deadline for shortlisted teams |
| Mar 14 | Day 1 — Registration 8 AM, Hackathon begins 12 PM |
| Mar 15 | Day 2 — Final submission, judging, results |

### Competition Tracks

| # | Tag | Full Name |
|---|-----|-----------|
| 01 | Heal | Healthcare & MedTech |
| 02 | Intelligence | AI & ML |
| 03 | GreenTech | Agriculture & Climate Tech |
| 04 | Connect | Smart Cities & IoT |
| 05 | Learn | Education & EdTech |
| 06 | Secure | Blockchain & Cybersecurity |
| 07 | Impact | Social Good & Governance |

---

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^16.1.6 | React framework (App Router) |
| `react` / `react-dom` | ^19.2.4 | UI library + DOM rendering |
| `gsap` | ^3.14.2 | Animation engine (timelines, ScrollTrigger) |
| `three` | ^0.182.0 | 3D rendering (via R3F) |
| `@react-three/fiber` | ^9.5.0 | React renderer for Three.js |
| `@react-three/drei` | ^10.7.7 | Helpers for R3F scenes |
| `@splinetool/react-spline` | ^4.1.0 | Spline 3D scene component |
| `@splinetool/viewer` | ^1.12.46 | Spline viewer runtime |
| `react-icons` | ^5.5.0 | SVG icon library |
| `lucide-react` | ^0.563.0 | Lucide icon set |
| `clsx` | ^2.1.1 | Conditional class name utility |
| `tailwind-merge` | ^3.4.0 | TW class conflict resolver |
| `class-variance-authority` | ^0.7.1 | Component variant builder |
| `ogl` | ^1.0.11 | Lightweight WebGL library |

### Development

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^4 | Utility CSS framework |
| `@tailwindcss/postcss` | ^4 | TW PostCSS integration |
| `eslint` | ^9 | Linting |
| `eslint-config-next` | ^16.1.6 | Next.js ESLint rules |
| `tw-animate-css` | ^1.4.0 | TW animation utilities |
| `babel-plugin-react-compiler` | ^1.0.0 | React compiler Babel plugin |

---

## Environment & Configuration

### Path Aliases (`jsconfig.json`)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Use `@/components/...` or `@/pageComponents/...` as absolute imports anywhere in the project.

### Port

The dev and production servers both run on **port 3001** (configured in `package.json` scripts). To change:

```json
"dev": "next dev -p <YOUR_PORT> --webpack",
"start": "next start -p <YOUR_PORT>"
```

### API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/health` | `GET` | Health check — returns `{ status: "ok" }` |

### SEO & Open Graph

Configured in `src/app/layout.js`:
- **Title**: `Techashy - Premier Technology Hackathon`
- **Description**: Join Techashy, a premier hackathon powered by Betalabs…
- **OG Image**: `/Techashi_Logo-removebg-preview.png`
- **Keywords**: Techashy, Betalabs, Hackathon, Coding Competition, Innovation, Technology
- **Twitter Card**: `summary_large_image`

---

## Notes for Developers

- **Sponsors section** is imported but currently commented out in `page.js`. Uncomment `<Sponsors />` when sponsor data is ready.
- **GSAP ScrollTrigger** is registered globally in `page.js` via `gsap.registerPlugin(ScrollTrigger)` and also registered individually inside each component's `useEffect` — this is intentional for component-level isolation.
- **`overflowX: hidden`** must NOT be placed on the root `<div>` in `page.js` — it creates a new CSS containing block that clips `position: fixed` elements (navbar, mobile menu). It is safely handled by `body { overflow-x: hidden }` in `globals.css`.
- **Mobile menu** uses React `createPortal` to render on `document.body` because the `<nav>` element has `backdrop-filter: blur()` which creates a stacking context that traps `position: fixed` children.
- The GSAP counter animation in `About.jsx` skips values containing non-numeric characters (e.g. `"3-5"` for team size) using the guard: `/[^\d,.]/.test(value)`.

---

*Built with ❤️ by Betalabs — IIIT Kottayam*
