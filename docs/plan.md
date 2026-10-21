# Portfolio Upgrade Plan — vldm.is-a.dev

> Goal: turn the current portfolio into a recruiter-focused, accessible, measurable site
> without losing its visual identity. No database. Deployed on Netlify.

- **Repo:** `VLDeMenezes/vldm`
- **Canonical domain:** `https://vldm.is-a.dev`
- **Netlify URL:** `https://vldm.netlify.app`
- **Analytics:** Umami Cloud, website ID `25370e63-6824-45b7-988c-5c583d2cb2bc`
- **Source of truth for career data:** `public/cv.pdf`
- **Started:** 2026-10-21

## Status legend

- `[ ]` pending
- `[~]` in progress
- `[x]` done
- A phase is only marked done when its **Done when** checks pass.

**Current status (2026-10-21):** Phases 0–4 are complete. Phase 5 analytics is wired
and verified locally against Umami Cloud; the dashboard readback happens after deploy.
Phase 6 passes locally for Lighthouse, axe, keyboard, reduced motion and responsive
layouts; VoiceOver, 200% zoom, Safari/Firefox/iOS and the Netlify production checks
remain manual.

---

## Phase 0 — Baseline, framework upgrade and tooling

**Why:** the site runs Next.js 14.2.13 with 5 known vulnerabilities (1 critical). Netlify
supports Next.js 16 with zero configuration, so we upgrade to the latest safe pair.

- [x] Create branch `feat/recruiter-refresh`
- [x] Upgrade `next` `14.2.13` → `16.4.2` and `react`/`react-dom` `18` → `19.3.1`
- [x] Upgrade `eslint` `8` → `9`, `eslint-config-next` → `16.4.2`, `@types/react*` → 19
- [x] Replace legacy `.eslintrc.json` with `eslint.config.mjs` (flat config + `jsx-a11y`)
- [x] Replace `next lint` with `eslint .` in `package.json`
- [x] Remove unused deps: `aos`, `framer-motion`, `react-typed` (replaced by static copy)
- [x] Update `next.config.mjs` for Next 16 (Turbopack is default; no webpack config needed)
- [x] Add `netlify.toml` (`command`, `publish`, Node version; adapter stays auto-installed)
- [x] Run `npm audit` and confirm 0 high/critical
- [x] Confirm `npm run build` and `npm run lint` pass

**Audit result:** `npm audit --omit=dev` → **0 vulnerabilities**. The remaining 10
advisories are dev-only Tailwind 3 build tooling (`braces`, `postcss-selector-parser`);
their only fix is a breaking Tailwind 4 migration, which is out of scope. ESLint stays
on 9.39.5 because `eslint-plugin-jsx-a11y@6` does not declare ESLint 10 support yet.

**Done when:** build + lint pass on Next 16/React 19, audit is clean, and no runtime
regression on `/`. ✅

---

## Phase 1 — Accessibility and design foundation

**Why:** the current color system fails WCAG AA badly and several controls are not
keyboard usable.

Measured contrast today (WCAG AA needs 4.5:1 for body text, 3:1 for large text/UI):

- `text-gray-50` on `Background #D9CCC1` → **1.50:1**
- `text-iconDarkSelect #00001A` on `Darkground #011720` → **1.13:1**
- `Detail #BF6415` on `SectionDark #012B3C` → **3.58:1**
- white on `SectionLigth #BF6415` → **4.16:1**

### Tokens and CSS

- [x] Keep brand fills (`Background`, `Darkground`, `SectionLigth`, `SectionDark`, `Detail`)
- [x] Add semantic tokens: `Ink` (#04121A), `InkMuted` (#3F4E52), `InkDark` (#EAF2F5),
      `InkDarkMuted` (#B9CBD2), `AccentInk` (#7A3A08), `DetailLight` (#BF6316 on light,
      #F2A65A on dark), `Surface` (#F3EBE4), `SurfaceDark` (#022E40), `Focus` (#FFD166)
- [x] Body: `bg-Background text-Ink dark:bg-Darkground dark:text-InkDark`
- [x] Sections: dark ink on orange, light ink on teal, in both themes
- [x] Global `:focus-visible` double ring (dark inner + light outer) that works on every surface
- [x] Remove `focus:outline-none` from carousel/dot controls (carousel is removed in Phase 3)
- [x] `scroll-behavior: smooth` only under `prefers-reduced-motion: no-preference`
- [x] Global reduced-motion override for animations/transitions
- [x] `scroll-margin-top` on sections so the fixed nav does not cover anchors
- [x] Minimum 44×44 px touch targets

### Document, metadata and landmarks

- [x] Remove the manual `<head>` in `src/app/layout.js`; use the `metadata` API
- [x] `metadataBase: https://vldm.is-a.dev`, canonical, Open Graph, Twitter cards
      (current `twitter:image` wrongly points to `metatags.io`)
- [x] `export const viewport` with `themeColor` for light/dark
- [x] `<html lang>` rendered server-side from the locale (Phase 2) instead of hardcoded `es`
- [x] Skip link to `#main`; `header` / `nav[aria-label]` / `main` / `footer` landmarks
- [x] One `<h1>` per page; section `<h2>`; card `<h3>`
- [x] JSON-LD `Person` schema
- [x] Remove the unpkg Lottie player and 605 KB JSON; the hero now uses the optimized
      static portrait (`/profile.webp`). This was the single biggest LCP win.
- [x] Icons get `aria-hidden`; icon-only controls get `aria-label`
- [x] Tooltips visible on hover **and** focus-visible
- [x] Fix invalid `<p alt="...">` in `ContactSection`
- [x] Replace hover-only project cards with `<button>` / `<li>` semantics

### Navigation, theme, language

- [x] `useScrollSpy` with a rAF-throttled scroll/resize reference line (replaces the
      IntersectionObserver band, which missed Work when scrolling up from the footer)
- [x] `aria-current="location"` on the active section link
- [x] Visible labels on desktop, accessible names on mobile
- [x] Theme toggle is a `<button aria-pressed>`; `instrumentation-client.js` applies
      the stored theme before hydration and `ThemeSync` re-applies it on navigation,
      so no inline script tag is rendered and the theme survives locale changes
- [x] Language switcher is a `<button>` with an accessible name and pending state

### Project modal

- [x] Native `<dialog>` + `showModal()` (focus trap, Escape, backdrop, focus restore)
- [x] `aria-labelledby` on the project title; labelled close button
- [x] `useBodyScrollLock` while open
- [x] Fix empty modal body: use `t("Projects." + name)` instead of the missing `description`
- [x] Add live/github links in the modal with `rel="noopener noreferrer"`

**Done when:** axe reports 0 critical/serious on `/` and `/movile`, full keyboard pass,
WCAG AA contrast, `prefers-reduced-motion` disables non-essential motion, Lighthouse
accessibility ≥ 95. ✅

**Result:** axe-core 0 violations in light, dark, EN, ES, 320 px, 1440 px and `/en/movile`. Lighthouse
accessibility 100. Ink on orange is 4.56:1; chips use black text on the translucent
overlay (5.05:1). `DetailLight` resolves to #BF6316 in light and #F2A65A in dark, so
case-study labels and links stay above 4.5:1 on both surfaces. The skip link moves
focus to `#main`, the theme persists across reloads and locale changes, and reduced
motion is honoured globally.

---

## Phase 2 — SSR i18n with locale routing

**Why:** i18next is initialized client-side, `page.js` is a client component and there is
no locale URL. Search engines and social previews only ever see English, and `<html lang>`
is wrong. We move to path-based locales and server-rendered translations.

- [x] Move locale JSON to `src/i18n/locales/{en,es}.json` and keep the `init` namespace
- [x] Add `src/i18n/settings.js` (`locales = ['en','es']`, fallback `en`, cookie `i18next`)
- [x] Share static resources in `src/i18n/resources.js`; server components read them
      directly, so no per-request i18next server instance is needed for SSG routes
- [x] Add `src/i18n/I18nProvider.jsx` client provider; synchronous init, remount on locale change
- [x] Move routes to `src/app/[locale]/layout.js` (root layout) and `src/app/[locale]/page.js`
- [x] Move `/movile` to `src/app/[locale]/movile/page.jsx`
- [x] `generateStaticParams` + `dynamicParams = false`; invalid locales call `notFound()`
- [x] `params` awaited (Next 16 async request APIs)
- [x] `generateMetadata` with localized title/description and `alternates.languages`
- [x] Add `src/proxy.js` (Next 16 renamed middleware → proxy): cookie → `Accept-Language` → `en`
- [x] Language switch navigates to the other locale path, sets the cookie, preserves hash
- [x] Internal links use locale-aware `Link`; CV and project external links unchanged
- [x] Add `sitemap.js`, `robots.js` and a localized 404

**Done when:** `/en` and `/es` return fully translated HTML in `view-source`, `<html lang>`
matches, canonical/hreflang are correct, and switching language does a real navigation. ✅

---

## Phase 3 — Recruiter content (CV-based)

### Experience timeline (replaces the auto-rotating carousel)

- [x] New `src/data/experience.js` with the 4 CV roles, newest first
- [x] Vertical `<ol>` timeline with role, company, dates (`<time>`), location/type, stack
- [x] Achievements as bullets; "Present" for Beland
- [x] Remove `Carrousel.jobs.jsx`, `Carrousel.dots.jsx` and the carousel auto-rotation
- [x] Keep company logos, decorative alt

Real data:

| Company | Role | Dates |
| --- | --- | --- |
| Beland | Founding Product Engineer – Frontend & Mobile | Sep 2025 – Present |
| AWAQ | Frontend Engineer / Full Stack Developer | Apr 2025 – Sep 2025 |
| Happ3n XYZ | Frontend / Full Stack Developer | Nov 2024 – Mar 2025 |
| Prisma Technologies | Frontend / Full Stack Developer | Mar 2020 – Nov 2024 |

### Skills matrix

- [x] New `src/data/skills.js` grouped exactly as the CV
- [x] Core badges: React, React Native, TypeScript, Next.js, Node.js, AWS
- [x] Text labels only (no icon-only skills), `aria-labelledby`

Groups: Frontend · Mobile · Backend · Testing · AI-Assisted Engineering ·
Cloud/DevOps · Monitoring & Tools · Practices.

### STAR case studies (3, with CV metrics)

- [x] New `src/data/caseStudies.js` + translations under `CaseStudies`
- [x] Three cards with Situation / Task / Action / Result and metric chips:

| Company | Situation | Actions | Result (from CV) |
| --- | --- | --- | --- |
| Beland | E-wallet platform shipping web + mobile | Feature-based architecture, shared React/RN library, tested 20+ core paths, AI harnessing workflow | **+25%** feature delivery, fewer regressions, faster onboarding |
| AWAQ | Low-latency NGO platform with SAP and manual deploys | 6+ reusable components, Node/Express APIs, SAP extension, GitHub Actions CI/CD | **−30%** feature development time, manual deploy errors eliminated |
| Happ3n XYZ | Web3 events platform going international | i18n, accessible React/RN Web UI, REST microservice integration, Vercel/Railway deploys | **3** major features on time, **99.9%** deployment uptime |

- [x] Project cards show year, role and one-line impact; featured projects first
- [x] Fix wrong tech icons (e.g. LeyriaApp says "HTML 5" with a React icon)
- [x] Rewrite hero and section copy with recruiter hooks (result-first, no filler)
- [x] Update EN + ES translations; fix existing grammar/typos

**Done when:** a recruiter can answer who / what / where / how long / impact above the fold
and in the first scroll, in both languages. ✅

---

## Phase 4 — Hooks refactor

- [x] `useScrollSpy` — rAF-throttled reference line
- [x] `useTheme` — localStorage + system preference + `<html>.dark`
- [x] `useLocale` — locale switch, cookie, hash preservation, pending state
- [x] `useDialog` — native `<dialog>` lifecycle + focus restore
- [x] `useBodyScrollLock`
- [x] Motion: global `prefers-reduced-motion` override (the client-only hook became
      unnecessary when the Lottie was replaced by a static poster)
- [x] N/A: theme persistence lives in `useTheme`; the unused generic `useLocalStorage`
      hook was removed
- [x] `useAnalytics` / `track` — typed event names, no-op when blocked or SSR
- [x] Refactor `NavBar`, `DarkModeToggle`, `LanguageSwitcher`, `ProjectSection`,
      `Hero`, `ContactSection` to use them
- [x] Delete dead components and unused imports

**Done when:** no duplicated theme/locale/dialog logic remains; all hooks clean up listeners. ✅

---

## Phase 5 — Umami Cloud analytics

- [x] Load `https://cloud.umami.is/script.js` with `next/script` (`afterInteractive`)
- [x] Website ID from `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, fallback to the provided ID
- [x] `src/lib/analytics.js` with a safe `track(name, data)` helper
- [x] Track events:

| Event | Data |
| --- | --- |
| `cv_open` | — |
| `contact_click` | `channel: mail \| linkedin \| github` |
| `project_open` | `project` |
| `project_link_click` | `project`, `type: live \| repo` |
| `case_study_open` | `id` |
| `language_change` | `from`, `to` |
| `theme_change` | `theme` |
| `scroll_depth` | `25 \| 50 \| 75 \| 100` |

- [x] UTM tags on the LinkedIn and GitHub contact links (`utm_source=portfolio`); the CV
      is a local PDF, so a query string would break the file
- [x] Cookieless privacy note in the footer (no consent banner needed)
- [~] Verify events in the Umami realtime dashboard on a preview deploy. Locally, the
      script returns 200 and pageview, `theme_change`, `project_open` and `scroll_depth`
      POST 200 to `gateway.umami.is` with the configured website ID.

**Done when:** pageviews + custom events appear in Umami, no console errors with an
ad-blocker, and no personal data is sent. `[~]` Wiring verified; dashboard readback and
the ad-blocker check remain deploy-time checks.

---

## Phase 6 — Verification and polish

- [x] `npm run lint`, `npm run build`, `npm audit --omit=dev` (0 vulnerabilities)
- [x] Lighthouse on `/en` and `/es` (mobile + desktop) and `/en/movile` (mobile) — see the
      measured table below; mobile `/en` scores 95/100/100/100, desktop 100/100/100/100
- [x] axe-core: 0 violations in light, dark, EN, ES, 320 px, 1440 px and `/en/movile`
- [~] Keyboard-only and reduced motion pass. VoiceOver and 200% zoom remain manual QA.
- [x] Light/dark, EN/ES, 320 / 768 / 1440 px; no horizontal overflow at any width
- [~] Chrome (desktop + 390/320 mobile) tested via Playwright. Safari, Firefox and iOS
      Safari remain manual QA.
- [~] Netlify deploy preview and production domain must be checked after the user deploys;
      the production build and `netlify.toml` are verified locally.
- [x] Update this document with final results

**Targets:** accessibility ≥ 95 (goal 100), performance ≥ 90, SEO ≥ 95,
best practices ≥ 95.

**Measured on the final build (Lighthouse 12, local production server):**

| Page / preset | Performance | Accessibility | Best practices | SEO | LCP |
| --- | --- | --- | --- | --- | --- |
| `/en` mobile | 95 | 100 | 100 | 100 | 3.0 s |
| `/en` desktop | 100 | 100 | 100 | 100 | 0.6 s |
| `/es` mobile | 95 | 100 | 100 | 100 | 2.9 s |
| `/es` desktop | 100 | 100 | 100 | 100 | 0.6 s |
| `/en/movile` mobile | 96 | 100 | 100 | 66 | 2.7 s |

The `/en/movile` SEO score is intentionally 66 because the page is `noindex`; it is a
preview surface, not a search result.

---

## Out of scope

- Contact form / serverless email endpoint
- Testimonials
- Print-specific CV page
- Full visual redesign (colors and layout identity are preserved)

---

## Appendix A — CV source data

**Profile:** Victor Leandro De Menezes · Full Stack Developer | Frontend Engineer |
React & React Native · Barcelona, Spain · victorleandrodemenezes@gmail.com ·
6+ years experience · Spanish native, English B2.

**Education**

- Advanced Full Stack Software Engineering, Soy Henry (2024)
- Web Development and Logical Thinking, Silicon Misiones (2020)
- Law Degree, Universidad Católica de Santa Fe (2014–2018)

**Certifications**

- Python, Santander Open Academy (2026)
- AWS: Cloud, Serverless y Operations, Commit Academy (2026)
- AWS Cloud Practitioner Essentials, AWS Skills Builder (2026)
- DevOps Cloud, Oracle University (2025)
- App Mobile Development & Web Development, Google Developer Program (2023)

**Skills (exact CV list)**

- Frontend: React, React Native, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3,
  Tailwind CSS, NativeWind, Responsive Design, Component-Based Architecture,
  TanStack Query, Zustand, Context API, Redux
- Mobile: React Native, Expo, Expo Router, React Navigation, Expo APIs, NativeWind,
  Mobile UI Development, Cross-Platform Development
- Backend: Node.js, Express.js, NestJS, REST APIs, PostgreSQL, MongoDB, Prisma ORM,
  Docker, Kubernetes
- Testing: Jest, Vitest, React Testing Library, Playwright
- AI-Assisted Engineering: Codex, OpenCode, Claude Code, Cursor, Copilot, MCP,
  LLM APIs, AI Harnessing, Custom Agents & Sub-Agents, Context Management,
  Workflow Automation
- Cloud/DevOps: AWS, Git, GitHub, GitHub Actions, CI/CD, Vercel, Railway, Render,
  Netlify, Cloud Deployment, Automated Deployments
- Monitoring & Tools: Sentry, Firebase Crashlytics, ESLint, Prettier
- Practices: REST API Integration, Authentication, Payment Integration, i18n, UI/UX,
  Agile, Scrum, Clean Code, SOLID Principles, Software Architecture,
  Technical Documentation, Code Review, Spec-Driven Development

## Appendix B — Deployment

- Hosting: Netlify (`vldm.netlify.app`), custom domain `vldm.is-a.dev`
- Build: `npm run build`, publish `.next`
- Next runtime: OpenNext adapter, auto-installed by Netlify; do not pin
- `netlify.toml` exists: Node 22, build/publish, and security headers
  (`X-Frame-Options: SAMEORIGIN` for the `/movile` iframe, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`, HSTS)
- The footer links to securityheaders.com for `vldm.is-a.dev` and does **not** claim a
  letter grade. A nonce-based CSP would force dynamic rendering, so it is deliberately
  left out; the copy says headers are configured rather than overstating a grade.
  `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
  and HSTS are present in the branch config; the published site (and its D scan) is
  still the older deployment. Re-scan after deploying this branch.

## Appendix C — Progress log

| Date | Phase | Notes |
| --- | --- | --- |
| 2026-10-21 | Plan | Plan created from CV and code audit |
| 2026-10-21 | Phase 0 | Next 16.4.2 + React 19.3.1, ESLint 9 flat config, Netlify config. Build/lint green. Prod audit 0. |
| 2026-10-21 | Performance | Replaced the Lottie intro (605 KB JSON + 98 KB player) with a 15 KB static poster. Mobile LCP 7.0 s → 3.0 s; performance 76 → 95. |
| 2026-10-21 | Phase 1 | Accessible tokens, global focus ring, skip link, landmarks, metadata/JSON-LD, native dialog, scroll spy, tooltips. axe 0; Lighthouse accessibility 100. |
| 2026-10-21 | Phase 2 | `/en` and `/es` SSR with `[locale]` routes, async params, `proxy.js` cookie/Accept-Language detection, sitemap/robots, localized 404 and `/movile`. Language switch verified. |
| 2026-10-21 | Phase 3 | CV timeline (4 roles), skills matrix, 3 STAR case studies with CV metrics, featured/other project grid, EN/ES copy. |
| 2026-10-21 | Phase 4 | `useTheme`, `useLocale`, `useDialog`, `useBodyScrollLock`, `useScrollSpy`, `useScrollDepth`; native dialog focus/Escape verified. Removed unused `useLocalStorage`/`usePrefersReducedMotion`. |
| 2026-10-21 | Phase 5 | Umami script + queue, all events wired (including `case_study_open`), UTM contact links, cookieless footer note. Local requests: script 200, pageview/theme/project/scroll events 200 with the website ID. Dashboard readback pending deploy. |
| 2026-10-21 | Phase 6 | Final Lighthouse `/en` 95/100/100/100 mobile, 100/100/100/100 desktop; `/es` 95/100/100/100 mobile, 100/100/100/100 desktop; `/en/movile` 96/100/100/66. axe 0 including `/en/movile`; 0 overflow at 320/768/1440; skip link, theme persistence, reduced motion, dialog and `/movile` iframe/focus guard pass; prod audit 0. Cross-browser/VoiceOver/zoom and Netlify deploy remain manual. |
| 2026-10-21 | Follow-up | Fixed scroll spy (reference line; Contact → Work after ~50 px up), removed the inline theme script (instrumentation + ThemeSync; no script warning, theme survives EN↔ES), restored WCAG AA contrast for the new orange palette, and added scroll-spy/locale-theme checks to `npm run qa`. QA: axe 0, 0 overflow, no console errors. Security headers: XFO/Referrer/Permissions/HSTS/nosniff configured in `netlify.toml`; CSP still intentionally absent. |
