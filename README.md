# EnrollPath 🎓

> A school-to-college enrollment portal for students, teachers, and parents — built with pure HTML, CSS, and vanilla JS. No frameworks, no build step.

![Status](https://img.shields.io/badge/status-demo-orange) ![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

> ⚠️ **This is a demo site** — no real authentication, no real data. Built for presentation purposes only.

---

## What is this?

EnrollPath is a front-end demo portal that simulates a real school-to-college enrollment system built for the Indian education context (CBSE/ICSE, JoSAA, IITs, NITs, BITS etc.). It has three role-based dashboards, a full marketing landing page, and a login modal — all in static HTML/CSS/JS with zero dependencies.

**Live demo:** `https://enrollpath.up.railway.app` *(replace with your Railway URL)*

---

## Project Structure

```
enrollpath/
├── index.html              ← Landing page + login modal
├── railway.toml            ← Railway deployment config
├── css/
│   ├── base.css            ← Design system, shared components, dashboard shell, responsive
│   ├── login.css           ← Landing page, modal, all marketing sections, responsive
│   └── dashboard.css       ← Dashboard-specific components (timeline, fees, messages)
├── js/
│   ├── canvas.js           ← Animated particle mesh + ambient orb background (Canvas 2D)
│   ├── main.js             ← Landing page logic (modal open/close, role routing)
│   └── dashboard.js        ← Shared dashboard utilities (toast, section switcher)
└── pages/
    ├── student.html        ← Student portal
    ├── teacher.html        ← Teacher dashboard
    └── parent.html         ← Parent portal
```

---

## Features

### Landing Page
- Split hero — text + animated browser mockup with floating notification cards
- "Trusted by" school name strip
- Feature cards — Student, Teacher, Parent with role-specific CTAs
- How It Works — 4 numbered steps + sticky live timeline card
- Stats banner — 12,400+ students, 340+ colleges, 98% satisfaction, 3× faster
- Partner colleges grid — IITs, NITs, BITS, SRCC, LSR + "+333 more" card
- Testimonials — 6 cards (students, parents, teachers)
- FAQ accordion — 6 questions, 2-column layout
- CTA banner + 4-column footer with social links
- Demo site banner — fixed bottom strip on every page
- Fully responsive — mobile (≤480px), tablet (≤768px), desktop

### Student Portal
- Step-by-step application progress tracker
- College shortlisting — up to 5, with search + stream filter
- Document upload checklist
- Live application status table

### Teacher Dashboard
- Stats — total students, submitted, pending, incomplete
- Full applications table with search + status filter
- Approve / Reject / Nudge actions per student
- Bulk notification sender
- Class completion progress bars

### Parent Portal
- Live enrollment timeline (full journey from profile to admission)
- Pending action alerts with urgency badges
- Fee tracker — paid vs due, with Pay button
- Direct messaging thread with coordinator

---

## Running Locally

### Option 1 — Live Server (VSCode, recommended)
1. Install the **Live Server** extension
2. Right-click `index.html` → **Open with Live Server**
3. Opens at `http://127.0.0.1:5500`

### Option 2 — Python
```bash
python -m http.server 5500
# open http://localhost:5500
```

### Option 3 — Node
```bash
npx serve .
```

> ⚠️ Don't open `index.html` directly as a `file://` URL — relative CSS/JS imports won't resolve.

---

## Deploying to Railway

`railway.toml` is already configured — Railway picks it up automatically.

```toml
[deploy]
startCommand = "npx serve . --listen $PORT --no-clipboard"
```

**Steps:**
1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
3. Select your repo — Railway auto-detects the config
4. Hit **Deploy** → live in ~30 seconds
5. **Settings → Domains** → generate a Railway domain or connect `enrollpath.in`

---

## Login / Roles

Any credentials work — there's no real auth. Pick a role and submit:

| Role    | Redirects to           | Colour accent |
|---------|------------------------|---------------|
| Student | `pages/student.html`   | Teal          |
| Teacher | `pages/teacher.html`   | Gold          |
| Parent  | `pages/parent.html`    | Coral         |

Click the **EnrollPath** logo in any sidebar to return to the landing page.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Markup | Pure HTML5 |
| Styling | Pure CSS3 (custom properties, grid, flexbox) |
| Logic | Vanilla JS (no frameworks) |
| Fonts | Google Fonts — Cormorant Garamond + Outfit |
| Background | Canvas 2D API — particle mesh + soft orb glows |
| Animations | CSS keyframes + IntersectionObserver scroll reveal |
| Deployment | Railway (static `npx serve`) |

---

## Design System

All tokens in `css/base.css` under `:root`:

| Token | Value | Use |
|---|---|---|
| `--teal` | `#1ECFAA` | Primary accent, Student |
| `--gold` | `#F0C060` | Teacher, warnings |
| `--coral` | `#FF6B6B` | Parent, danger |
| `--info` | `#5B9CF6` | Info states |
| `--bg-void` | `#060A12` | Page background |
| `--bg-card` | `#101E34` | Card backgrounds |
| `--font-display` | Cormorant Garamond | All headings |
| `--font-body` | Outfit | Body, UI text |

### Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| `≤1024px` | Hero goes single column, mockup hidden, 2-col grids |
| `≤768px` | Nav collapses, all grids single column, sidebar → top tab bar |
| `≤480px` | Fonts scale down, footer single column, tables compact |

---

## Known Limitations (demo)

- No real authentication — any input logs you in
- No backend — all data is hardcoded HTML
- No persistent state — refreshing resets everything
- No email/notification delivery — actions show toast messages only

---

## License

MIT — free to use, modify, and deploy.
