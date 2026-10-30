# Tutorista redesign: audit, decisions and handover

October 2026. Covers the public marketing site (`/`, `/services`, `/about`, `/contact`).

## 1. Audit: keep, change, remove

| Area | Before | Decision |
| --- | --- | --- |
| Stack | Vite 7, React 19, React Router 7, react-icons | **Keep.** No new runtime dependencies added. |
| Routes | 4 routes, no 404, deep links 404 on Vercel without rewrites | **Keep routes** (SEO). Added a 404 page, `vercel.json` SPA rewrite, `robots.txt`, `sitemap.xml`, per-route titles and descriptions. |
| Visual system | "Sharp edges, glow buttons", dark teal + gold, Inter + Poppins via render-blocking `@import` | **Change.** New tokens and shape language taken from the logo. Fonts self-hosted. |
| Navbar | 4 text links + "Get Started" | **Change.** Subjects mega-menu (level, then subject, links prefill the request form), "Teach with us", "Find a tutor". Mobile drawer with grouped subjects. |
| Hero | Dark block, "Pakistan's Leading EdTech Platform", "Rated #1" chip, fake avatar initials + "4.9/5 from 2,500+ reviews" | **Remove the claims.** New hero: direct promise, two CTAs, shaped photo collage, one illustrative request card. |
| Marquee | Scrolling list including school names ("Aitchison College Prep", "LGS Students Trust Us") | **Removed.** Implied endorsements that aren't verified. |
| "Trusted by" strip | 10 universities and schools as text logos | **Removed.** No partnership evidence. |
| Stats | 2,500+ tutors, 4.9/5, 15 min match, 10K families, 95% satisfaction | **Removed.** Unverified counts. |
| Testimonials | 3 named reviews with 5 stars | **Removed.** No evidence they are real. Section can return once real reviews exist (see §6). |
| Urgency banner | "Only 47 MDCAT tutor slots left for 2025" | **Removed.** Fake scarcity. |
| Feature claims | "Blockchain credential verification", "AI matching (15+ parameters)", "<100ms video", "99.9% SLA", "100,000 concurrent sessions", "8% acceptance", "top 1%" | **Removed.** No product exists in this repo to back them. |
| Price comparison | "Agency Rs. 5,000/hr vs Tutorista Rs. 2,500/hr" | **Removed.** Invented numbers. Kept the model: students pay the tutor's rate, tutors pay 15%. |
| Contact page | Long dark hero, fake phone `+92 300 1234567`, WhatsApp button linking to `/contact`, form that pretended to send (`setTimeout`), FAQ | **Rebuilt** as a short request form. It now really sends, by opening an email to `hello@tutorista.pk` with the fields filled in. Subject links prefill it. The FAQ moved to `/services#faq`. |
| Footer | `#` links (social, privacy, terms, sitemap, dashboards), fake phone, "Arfa Technology Park" | **Rebuilt.** Only links that go somewhere. Social icons render only once real URLs are set in `src/content/site.js`. |
| About | LUMS-founder story, metrics, timeline with invented milestones, `#` LinkedIn and email buttons | **Kept** names, roles, photos and the mission. Removed metrics, the timeline and dead buttons. Shortened bios to role focus only. |
| Headings | Trailing periods ("Education in Lahore."), forced `<br>` breaks | **Fixed.** No trailing periods, no manual breaks. Bold used once per page, in the hero. |
| CSS | 1,430 lines, utility classes (`mt-4`, `opacity-70`), repeated hero/card patterns per page | **Rewritten** around shared tokens and primitives (`index.css`), with page CSS for layout only. |
| Dead files | `App.css`, `assets/react.svg`, `vite.svg`, `Marquee.*` | **Deleted.** |

## 2. Design tokens and motifs

All tokens live in `src/index.css` under `:root`.

- **Colour.** `--teal-900/700/500/100`, `--gold-500/600/100`, `--coral-400/100` (small accents only), `--ink`, `--ink-soft`, `--ink-mute`, warm `--paper` background, `--line`. Teal and gold come from the logo.
- **Type.** Bricolage Grotesque (display, 500–700) and Figtree (body, 400–600). Fluid scale `--step--1` to `--step-4`.
- **Shape.** `--r-sm/md/lg/pill`. Buttons and chips are pills. Cards are 28px.
- **Motifs.** These are what make the brand recognisable with the logo hidden.
  - Photo masks `.shape--circle`, `.shape--leaf` (the cupped hand), `.shape--arch` (the open book) and `.shape--quarter`, applied with `<PhotoTile>`.
  - Gold hand-drawn underline `.mark`, used once per page on a key phrase.
  - Teal and gold swoosh `<Wave>`, redrawn from the logo, used on the closing CTA.
  - Solid dots and a gold "sun" circle behind photo groups.
  - The same three shapes reused as step numbers.
- **Reusable pieces.** `.btn` (`--primary` gold, `--dark` teal, `--ghost`), `.chip`, `.eyebrow`, `.section-head`, `.list-check`, `<Accordion>`, `<PhotoTile>`, `<Wave>`.
- **Content.** `src/content/site.js` holds contact facts, the subject catalogue (which drives the mega-menu, homepage subject finder, subjects list, footer and form datalist), and `requestLink()`.

## 3. Asset inventory

| Asset | Source | Licence / status |
| --- | --- | --- |
| `public/brand/mark.webp`, `mark.png`, `favicon.png` | Cropped from the original `logo.png` (kept in `design/originals/`) | Owner asset. **A vector (SVG) logo is still needed.** The PNG has heavy padding and is low detail at small sizes. |
| `public/founders/*.webp` (+ `-s` variants) | Converted from owner PNGs (originals in `design/originals/`) | Owner supplied. **Confirm** these are real photos of the named people and that each person has approved publication. They look like studio or AI-generated portraits. |
| `public/img/study-group*` | Unsplash photo `1522202176988-66273c2fd55f` | Unsplash Licence (free commercial use, no attribution required) |
| `public/img/online-learner*` | Unsplash `1513258496099-48168024aec0` | Unsplash Licence |
| `public/img/classroom*` | Unsplash `1571260899304-425eee4c7efc` | Unsplash Licence |
| `public/img/young-learner*` | Unsplash `1529390079861-591de354faf5` | Unsplash Licence |
| `public/img/focused-writing*` | Unsplash `1434030216411-0b793f4b4173` (was already used on the old site) | Unsplash Licence |
| `public/fonts/*.woff2` | Google Fonts latin subsets of Bricolage Grotesque and Figtree | SIL Open Font Licence 1.1 |

The stock photos are **placeholders.** Photos of real Tutorista tutors and students in Lahore, with consent, will do more for trust than any stock image. Swap the files and keep the same names and sizes: 560px square plus a 280px `-s` version for the hero, and 800px wide plus a 480px `-s` version for the rest.

## 4. Motion map

GSAP, ScrollTrigger and Lenis were considered and **not added.** The site needs only a few light effects, and on low-end Android over slow mobile data roughly 70 KB of animation JS plus scroll hijacking costs more than it gives.

| Element | Motion | Implementation |
| --- | --- | --- |
| Section content | 18px fade-up, once, on entering the viewport | `useScrollReveal` (IntersectionObserver) + `.reveal`. Content stays visible if JS fails, because the hidden state only applies under `html.js`. |
| Hero request card | Fade and slide in once, 300ms delay | CSS keyframe. Disabled on phones. |
| Mega-menu | 180ms fade and drop | CSS keyframe |
| Buttons, chips, links | Colour transitions, arrow nudge | CSS transitions |
| Accordion | Icon rotates, gold fill when open | CSS transitions |

`prefers-reduced-motion: reduce` turns off all transitions and animations and shows reveal content immediately.

## 5. Performance report

Lighthouse 12.6.1, mobile preset (simulated slow 4G, 4× CPU slowdown), local `vite preview` builds of the old commit (`3a7cb74`) and the new code.

| Page | Perf before → after | LCP before → after | FCP before → after | CLS | Transfer before → after | A11y before → after | SEO before → after |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 85 → **97** | 3.3s → 2.5s | 3.3s → 1.4s | 0 → 0 | 402 KiB → 271 KiB | 93 → **100** | 92 → **100** |
| About | 68 → **98** | 7.0s → 2.3s | 3.6s → 1.4s | 0 → 0 | 2,628 KiB → 240 KiB | 93 → **100** | 92 → **100** |
| How it works | n/a → 99 | 2.1s | 1.4s | 0 | 195 KiB | 100 | 100 |
| Contact | n/a → 98 | 2.2s | 1.4s | 0 | 195 KiB | 100 | 100 |

What changed:

- **JS bundle:** 94.8 → 87.1 KB gzipped.
- **Images:** 500 KB PNG founder portraits became 10–14 KB WebP. Unsplash hotlinks became self-hosted WebP with `srcset`.
- **Fonts:** the render-blocking Google Fonts `@import` (two families, six weights each) became two preloaded, self-hosted variable woff2 files. That removed every third-party request and the font-swap layout shift (CLS 0.14 → 0).

Field Core Web Vitals (CrUX) can only be judged after deploy and real traffic. These are lab numbers.

Remaining opportunity: about 44 KB of unused JS is reported, mostly React Router and React itself. Route-level code splitting would save little on a four-page site, so it was not done.

## 6. Needs owner confirmation

The copy was written to be honest without these facts, but each of the following should be confirmed or corrected before launch.

1. **Email `hello@tutorista.pk`.** Is it live and monitored? The request form sends to it.
2. **Phone and WhatsApp numbers.** The old site used a placeholder. Add real ones in `src/content/site.js` and they appear automatically. A WhatsApp click-to-chat would likely convert better than email in Pakistan.
3. **Social profile URLs.** Instagram, Facebook, LinkedIn. They are hidden until set.
4. **The five tutor checks** (CNIC, credentials, subject test, interview, trial lesson). Is each one actually done for every tutor?
5. **Pricing model.** Free for students, 15% tutor fee, no markup, pay per session, no contract. Is it current?
6. **Payment methods.** EasyPaisa, JazzCash, card, bank transfer. Which are actually live?
7. **Home tutoring coverage.** Which areas of Lahore?
8. **"We suggest another tutor if it's not a fit"** and **"nothing is charged until you choose"** (`/services`, `/contact`). Confirm both.
9. **Subject catalogue** in `src/content/site.js`. Do you actually have tutors for each subject listed?
10. **Founder photos and names.** Confirm they are real and approved for publication. The old bios' claims ("LUMS graduates", "5+ years", "top 1%") were dropped until confirmed.
11. **Privacy policy and terms.** None exist. They are needed before collecting personal data at scale. The current mailto form stores nothing on our side.
12. **Form backend.** `mailto:` works without a server but depends on the visitor having an email app. A form service (Formspree, Basin, or a Vercel function) plus a WhatsApp option is the recommended next step.
13. **Real reviews and outcomes.** Once you have consented reviews from real families, add a review section. One review with a real name and real photo beats three anonymous five-star cards.
14. **Domain.** `robots.txt`, `sitemap.xml` and `og:image` point to `tutorista.vercel.app`. Update them if a custom domain is used.

## 7. Spec items not done

- The original brief that was provided started partway through, so any constraints that came before "Test low-end Android…" are unknown.
- Hosted test on real low-end Android hardware over Pakistani networks was not possible. Throttled Lighthouse is the stand-in.
- No genuine partner logos exist, so there is no logo strip (the brief allowed at most one).
- Nearpeer and the other reference sites were not inspected live. The design takes from the attached MyTutor (shaped photo collage, stat-free trust), Outschool (two-level browse menu) and Tutorful (giant wordmark footer, pathway columns) screenshots, plus the brief's notes.
