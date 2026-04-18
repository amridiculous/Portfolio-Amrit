# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build locally
```

## Stack

| Concern | Library |
|---|---|
| UI framework | React 18 + Vite |
| Routing | React Router DOM v6 |
| Styling | styled-components v6 |
| Entry animations | GSAP (timeline, stagger) |
| Scroll / hover / page transitions | Framer Motion |

## Architecture

```
src/
├── App.jsx                    # ThemeProvider + GlobalStyles wrapper
├── router/AppRouter.jsx       # BrowserRouter + AnimatePresence + Routes
├── styles/
│   ├── theme.js               # single source of truth for colors, fonts, radii, shadows
│   └── GlobalStyles.js        # CSS reset + base body/scrollbar styles
├── components/common/
│   ├── Navbar/                # fixed frosted-glass nav, mobile hamburger
│   ├── Footer/                # copyright + social links
│   ├── PageTransition/        # wraps every page; Framer Motion fade+slide
│   └── ScrollToTop/           # resets scroll position on route change
└── pages/
    ├── Home/                  # full-viewport hero: GSAP letter stagger → bio fade → avatar spring
    ├── About/                 # bio, skills grid, cert badges
    ├── Projects/              # card grid, Framer Motion whileInView stagger
    ├── Experience/            # GSAP ScrollTrigger timeline (slides in from left)
    └── Contact/               # two-column layout: info + form
```

### Key patterns

- **Styled-components transient props** — props that should not reach the DOM are prefixed with `$` (e.g. `$scrolled`, `$active`). Always follow this convention.
- **Animation split** — GSAP owns entrance sequences driven by a `gsap.timeline()` in `useEffect`; Framer Motion owns scroll-reveal (`whileInView`), hover states, and page transitions via `AnimatePresence`.
- **Each page** starts with `<PageTransition>` as the outermost wrapper to participate in route transitions.
- **Placeholder data** — all personal content (bio, projects, experience, contact links, social URLs) lives at the top of each page file as a `const` array/object so it is easy to swap out.

## Customisation checklist

- `src/pages/Home/index.jsx` — update tagline
- `src/pages/About/index.jsx` — SKILLS, CERTS arrays + bio paragraphs
- `src/pages/Projects/index.jsx` — PROJECTS array
- `src/pages/Experience/index.jsx` — EXPERIENCE array
- `src/pages/Contact/index.jsx` — email, LinkedIn, location; wire `handleSubmit` to a service (e.g. EmailJS, Formspree)
- `src/components/common/Footer/index.jsx` — SOCIALS array
- Replace avatar initials `AD` in `src/pages/Home/index.jsx` with an `<img>` tag when a real photo is available

## Deployment

`npm run build` outputs a static `dist/` folder deployable to Vercel, Netlify, or any static host. For React Router to work on page refresh, configure the host to serve `index.html` for all routes (Netlify: `_redirects` file with `/* /index.html 200`; Vercel: handled automatically).
