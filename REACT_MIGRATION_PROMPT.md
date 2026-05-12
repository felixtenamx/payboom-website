# Prompt: Migrate Payboom Website to React

## Context

We have a static HTML/CSS/JS website for Payboom (payment infrastructure company). The site has already been debugged and works on the `andres_dev` branch. Now we need to rebuild it entirely in React (Vite + React + TypeScript) with proper component architecture, routing, state management, and TypeScript.

The existing codebase is at: https://github.com/felixtenamx/payboom-website/tree/andres_dev

## Branching & Commits

- Work on a branch called **`react_dev`**
- Every commit must have a clear, descriptive message explaining what was done (e.g., "feat: add Hero section with 3D floating card", "feat: implement ContactForm with reCAPTCHA v3", "refactor: move Three.js scenes to lazy-loaded components")
- The `main` branch stays as-is (initial commit). All React work goes into `react_dev`.

## What the site does

### Pages (static HTML files to convert to React routes)

- **index.html** → `/` — Landing page with hero, 3D floating credit card (Three.js), features grid, 3D globe (Three.js), API code snippets, security badges, contact form, cookie banner
- **tarjetas.html** → `/tarjetas` — Card processing product page
- **pagos-internacionales.html** → `/pagos-internacionales` — International payments product page
- **antifraude.html** → `/antifraude` — AI fraud prevention product page
- **privacidad.html** → `/privacidad` — Privacy policy
- **terminos.html** → `/terminos` — Terms of service
- **cookies.html** → `/cookies` — Cookie policy
- **licencias.html** → `/licencias` — Licenses

### Key features to preserve

1. **3D Floating Credit Card** (Three.js) — Hero section, interactive card with animated particles and orbiting symbols, mouse parallax
2. **3D Globe** (Three.js) — International payments section, dot-mapped continents with city markers, animated transaction arcs
3. **Contact Form** — POST to a serverless endpoint (AWS Amplify function or Express backend) with reCAPTCHA v3 token, rate limiting, sanitization, forwarding to formsubmit.co
4. **reCAPTCHA v3** — Standard v3 (not Enterprise). Keys are stored in `.env` (NOT committed to repo). See `server/lead.js` for the serverless backend function that uses the secret key via `process.env.RECAPTCHA_SECRET`.
   - The PHP backend `server/lead.php` must be replaced — see "Backend Replacement" section below
5. **Cookie Consent Banner** — LocalStorage-based accept/reject
6. **Scroll Reveal Animations** — IntersectionObserver-based reveal-on-scroll
7. **Animated Counters** — Number counters in the metrics section
8. **Card Hover Effects** — Spotlight + 3D tilt on hover
9. **Code Tabs** — Toggle between Node.js/Python/cURL code snippets
10. **Mobile Navigation** — Hamburger menu
11. **Google Tag Manager** — GTM-5367GCDJ

### Brand colors

- Orange: `#f05215`, `#ff7a45`
- Teal: `#049ea0`, `#06c4c7`
- Dark navy: `#0a0a1f`, `#0a1f24`

## Tech stack requirements

- **Framework**: Vite 5+ with React 18+ and TypeScript
- **Routing**: React Router v6 (lazy load pages with `React.lazy` + `Suspense`)
- **Language**: TypeScript strict mode
- **Styling**: Tailwind CSS v3+ (port the design system)
- **3D**: `@react-three/fiber` + `@react-three/drei` (React Three Fiber) — port the Three.js scenes
- **Form**: React Hook Form + Zod validation
- **reCAPTCHA**: Custom hook wrapping `grecaptcha.execute` (or `react-google-recaptcha` v3)
- **Animations**: Framer Motion (for scroll reveals, transitions)
- **Icons**: Lucide React or Heroicons
- **SEO**: `react-helmet-async`
- **HTTP Client**: Fetch API or Axios

## Backend Replacement (IMPORTANT)

The current PHP backend at `server/lead.php` does the following — this functionality must be recreated in the React app:

**Current PHP flow to replicate:**

1. Receives JSON POST with lead fields + `g-recaptcha-response` token
2. Verifies reCAPTCHA token via Google's `siteverify` API
3. Applies basic rate-limiting per IP
4. Sanitizes input and forwards validated leads to `https://formsubmit.co/ajax/comercial@payboom.io`
5. Returns success/failure JSON response

**Since we cannot use PHP (deployment is AWS Amplify), you have two options:**

### Option A: Serverless Function (Recommended)

Create an AWS Amplify Function or use a simple Express server deployed alongside:

- Accept POST requests at `/api/lead`
- Verify reCAPTCHA: `POST https://www.google.com/recaptcha/api/siteverify` with `secret` + `response`
- Rate limit by IP (in-memory or DynamoDB)
- Forward to formsubmit.co
- Return JSON response

### Option B: Client-side only (Simpler but less secure)

- Submit directly to formsubmit.co (like the original site did before the PHP backend was added)
- reCAPTCHA v3 token is still generated client-side
- Less control over rate limiting and validation
- Can use a simple Netlify/Vercel serverless function or AWS Lambda@Edge

**Important**: The reCAPTCHA secret key stored in `.env` must NEVER be exposed client-side. It must live in a serverless function or backend environment variable. The `.env` file is listed in `.gitignore` and should NOT be committed.

## Component structure to aim for

```
payboom-react/
├── public/
│   └── vendor/
│       └── three.module.js        # Local copy of Three.js (v0.160.0)
├── src/
│   ├── main.tsx                    # Entry point with BrowserRouter
│   ├── App.tsx                     # Routes layout
│   ├── routes.tsx                  # Route definitions with lazy loading
│   ├── layouts/
│   │   ├── RootLayout.tsx          # Navbar + Footer + CookieBanner + GTM
│   │   └── LegalLayout.tsx         # Simple layout for legal pages
│   ├── pages/
│   │   ├── Home.tsx                # Landing page
│   │   ├── Tarjetas.tsx
│   │   ├── PagosInternacionales.tsx
│   │   ├── Antifraude.tsx
│   │   ├── Privacidad.tsx
│   │   ├── Terminos.tsx
│   │   ├── Cookies.tsx
│   │   └── Licencias.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── CookieBanner.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeaturesGrid.tsx
│   │   │   ├── GlobeSection.tsx
│   │   │   ├── ApiSection.tsx
│   │   │   ├── SecuritySection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── three/
│   │   │   ├── FloatingCard.tsx    — 3D card with particles and symbols
│   │   │   └── PaymentGlobe.tsx    — 3D globe with markers and arcs
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── CodeTabs.tsx
│   │   │   ├── Counter.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Metric.tsx
│   │   ├── contact/
│   │   │   └── ContactForm.tsx     — Form + reCAPTCHA + validation
│   │   └── seo/
│   │       └── MetaTags.tsx
│   ├── hooks/
│   │   ├── useReCaptcha.ts        — Hook for loading & executing reCAPTCHA v3
│   │   ├── useIntersectionObserver.ts
│   │   ├── useCounter.ts
│   │   └── useCookieConsent.ts
│   ├── lib/
│   │   ├── api.ts                  — fetch wrapper for /api/lead
│   │   └── constants.ts            — Site key, brand colors, metrics
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       ├── globals.css             — Tailwind directives + base styles
│       └── animations.css          — @keyframes and transition classes
├── server/                         # OPTIONAL: Express/Lambda backend
│   ├── lead.js                     — Serverless function for lead submission
│   └── package.json
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── .env
```

## Important details to get right

1. **Three.js scenes are lazy-loaded** — Only initialize when scrolled into view. Use `React.lazy()` and `Suspense` for the 3D components. The `@react-three/fiber` Canvas component handles this with `frameloop="demand"`.

2. **reCAPTCHA v3 flow**:
   - Load script: `https://www.google.com/recaptcha/api.js?render=SITE_KEY`
   - Execute: `grecaptcha.execute(SITE_KEY, { action: 'contact_form' })`
   - Send token in `g-recaptcha-response` field to the backend endpoint
   - Backend verifies with Google's siteverify API using the secret key

3. **Contact form payload**:

   ```json
   {
     "Nombre": "...",
     "Correo": "...",
     "Telefono": "...",
     "Mensaje": "...",
     "g-recaptcha-response": "token_from_grecaptcha"
   }
   ```

   The backend should then add `_subject`, `_cc`, `_template` fields before forwarding to formsubmit.co.

4. **Cookie banner** — Uses LocalStorage key `payboom_cookies_v1` with values `accepted` or `rejected`. Respect the user's choice and conditionally load GTM and analytics.

5. **GTM ID**: `GTM-5367GCDJ`

6. **SEO** — Each page needs proper meta tags, Open Graph, and structured data for the payment company. Use `react-helmet-async` per page.

7. **No router-based animations between pages** — Keep it simple with layout transitions.

8. **AWS Amplify compatible**:
   - No server-side rendering (SPA mode only)
   - API calls go to Amplify Functions or a separate API Gateway
   - Static assets (Three.js) should be bundled by Vite, not served separately
   - Environment variables prefixed with `VITE_` for client-side, set in Amplify console for backend

9. **The Three.js vendor file** — The current site has a full local copy of Three.js v0.160.0 at `vendor/three.module.js`. With Vite + npm, install `three` via npm instead (`npm install three`). No need for manual vendor files.

## Files from current site that define the styles

The existing `styles.css` (~800 lines) has all the CSS. Key classes to port to Tailwind:

- `.hero`, `.hero__grid`, `.hero__content`, `.hero__visual`, `.hero__stats`
- `.section`, `.section__head`, `.section__title`, `.section__sub`
- `.card`, `.card--link`, `.card__icon`, `.card__list`, `.card__cta`
- `.badge`, `.badge__dot`
- `.nav`, `.nav__inner`, `.nav__links`, `.nav__cta`, `.nav__toggle`
- `.btn`, `.btn--primary`, `.btn--ghost`, `.btn--lg`
- `.code`, `.code__head`, `.code__tabs`, `.code__body`
- `.global__grid`, `.global__copy`, `.global__visual`, `.global__metrics`
- `.cta`, `.cta__inner`, `.cta__halo`
- `.contact-form`, `.cf-grid`, `.cf-field`, `.cf-submit`, `.cf-status`
- `.footer`, `.footer__grid`, `.footer__bottom`
- `.cookie`, `.cookie__inner`
- `.orb`, `.orb-1`, `.orb-2`, `.orb-3` (decorative background blobs)
- `.noise` (background texture)
- `.grid-bg` (grid background overlay)
- `.grad-text` (orange-to-teal gradient text)
- Various animations (`@keyframes`)

## Deliverable

A complete, production-ready React app (Vite + TS) that:

- Looks pixel-identical to the current site
- Has all 8 pages with proper routing
- Loads faster via code-splitting (lazy Three.js scenes)
- Has proper TypeScript types
- Uses modern React patterns (hooks, context, suspense)
- The Three.js scenes work on localhost (no CSP issues)
- All forms work with reCAPTCHA v3
- Has a working backend endpoint (serverless or Express) that replaces the old PHP backend
- Deployable to AWS Amplify
- Lives on the `react_dev` branch with descriptive commit messages
