# Rendering and content audit

30 October 2026. This applies the zero-slop quality gate to the marketing site. The automated checks come from `scripts/render-audit.js`, run in a real browser with the page's fonts loaded on every route: `/`, `/services`, `/plans`, `/about`, `/contact`, `/login`, `/signup`, `/privacy` and `/terms`.

## Audit table (found before changes)

| Page / component | Exact issue | Category | Severity | Root cause | Fix | Why it's better | Affects functionality? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Header, all pages, 320px | "Find a tutor" button sat at 208–322px on a 320px screen, making the page 370px wide | Overflow | High | The brand, search, call to action and menu button had a fixed combined minimum width of more than 320px | Under 420px the search button moves into the mobile menu as a full-width search field | Nothing goes off-screen, and search is still one tap away | No. Search stays available. |
| Footer, all pages, 320px | The second column, "Tutorista / Follow us / email", started at 157px and ended at 338px | Clipping | High | `1fr 1fr` columns can't shrink below the email link's minimum content width | `minmax(0, 1fr)` columns, one column under 400px, and `overflow-wrap: anywhere` on links | The full email and every link stay readable | No |
| `/plans` heading, 320px | "not for packages" ran to 359px | Overflow | High | The highlight is `white-space: nowrap` | The highlight may wrap under 560px | The phrase wraps instead of running off the screen | No |
| FAQ questions, 375–1024px | Single-word last lines ("cost?") | Typography | Medium | Default greedy line breaking | `text-wrap: balance` on headings and FAQ questions, `pretty` on paragraphs | Lines come out even without manual breaks | No |
| Log in / Sign up checkboxes | Checkbox controls were 20×20px | Target size | Low | Native checkbox size | 24×24px | Meets WCAG 2.2's 24px minimum target size even without the label | No |
| How it works contents links (Urdu) | "طریقہ" link was 22px wide | Target size | Low | A short word with no minimum width | `min-width: 44px` | Easier to tap | No |
| Announcement ticker | "+123 marks", "5.0 Google rating", "50k+ testers satisfied", "first lesson free" | Fabricated proof | **Gate fail** | Concept placeholders shown as facts | Replaced with verifiable statements: the five checks, Rs 0 to request, pay per lesson, 85% to tutors, online from anywhere in Pakistan, subjects covered | Nothing on the site claims numbers we can't back up | No |
| Homepage testimonials | Invented names and quotes | Fabricated proof | **Gate fail** | Concept placeholders | The same drag cards now answer the worries parents and students actually raise before starting ("Before you start"), unattributed and partly in Roman Urdu. Real, consented testimonials can go back into the same component. | Keeps the interaction and colour without inventing people | No |
| Hero stats | "30+ subjects and tests" | Inflated claim | **Gate fail** | A rounded-up guess | "20+": the catalogue lists 22 | It matches the real catalogue | No |

Flags checked by hand and judged false positives:
- **"Heading widow" on numbered FAQs (English and Urdu):** the small number is top-aligned, and in Nastaliq the line box is taller. Measured rects show the question on one line. The checker now groups lines within 8px. The Urdu number offset is 15px, so Urdu still flags and was checked by hand.
- **Closed FAQ answers "clipped":** these are collapsed panels marked `inert`, so they're hidden on purpose. The checker now skips inert content.

## Verification

- **Viewports, English:** 320, 375, 390, 640 (200% zoom of 1280), 768, 1024, 1280, 1440 and 1920px. Every route is clean after the fixes.
- **Viewports, Urdu:** 320 and 640px. Every route is clean apart from the FAQ false positive above.
- **Not tested:** real devices, landscape phones, 400% zoom beyond the 320px reflow, or browsers other than Chromium.

## Found during verification, also fixed

| Issue | Root cause | Fix |
| --- | --- | --- |
| "Log in" couldn't be reached at 1021–1320px | Hidden under 1320px, while the mobile menu only appeared under 1020px | It stays visible on desktop, and the menu-button layout now starts at 1100px |
| Header 9px too wide at 1024px once "Log in" showed | Too many items for that width | Same breakpoint change as above |
| Focus ring hard to see on the hero and transparent header | A cobalt ring on a near-black background | Gold ring in dark areas |
| Sign-up/log-in errors didn't move focus | The focus call ran before React had marked the fields invalid | Focus is deferred one tick |
| GIKI logo showed as a solid white disc | Its crest has a filled background, which flattens to white | Cropped to the wordmark |
| Footer tagline left "unique." on its own line | `max-width: 14ch` | `20ch` |

## Verification summary

- **Viewports checked with the measuring script (English):** 320, 375, 390, 640, 768, 1024, 1120, 1280, 1440 and 1920px. **Urdu:** 320, 640 and 1120px.
- **Checked visually from screenshots:** 1440px home, Plans and Contact, with fonts loaded and reduced motion forced.
- **Interactions tested:**
  - The keyboard Tab order through the header and hero, with the focus ring visible at each stop.
  - The subjects menu: opens, Escape closes it, and focus returns to its button.
  - Sign-up validation: four errors shown, focus on the first invalid field.
  - The "Why Tutorista?" drag strip updates the photo stack as you move.
- **Reduced motion:** content renders fully with motion forced off (in the headless screenshots).
- **Not verified:** real phones, Safari or Firefox, landscape phones, 400% zoom beyond 320px reflow, screen reader announcements, and Lighthouse after this round.
