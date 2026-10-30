# Tutorista redesign: audit, decisions and handover

October 2026. Covers the public marketing site (`/`, `/services`, `/about`, `/contact`, `/privacy`) in English, Roman Urdu and Urdu.

## 1. What changed in round two

The owner's feedback on round one, and what was done about each point:

| Feedback | Change |
| --- | --- |
| Brand palette not used | Every colour now comes from the owner's palette: Cobalt `#254D91` (primary, CTAs, blue sections), Golden `#EFC35D` (highlights, secondary buttons), Emerald `#176B52` (eyebrows, badges, Pakistan details), Ivory `#FBF7EC` (background), Vanilla `#F5EBCF` (alternating sections), Deep Blue `#233653` (text), Slate `#4B6080` (secondary text), Light Yellow `#FEF9E8` (text on blue). |
| Site felt static | GSAP 3.13 with SplitText and ScrollTrigger: headings rise line by line, the gold underline draws in, sections fade up, the hero collage assembles, and there's subtle parallax, a scroll-drawn process line, and idle float/spin on small details. Three short muted video loops (hero, classroom, online study). Micro-interactions on buttons, chips, links, cards, the accordion, the mega-menu and the search. |
| Muted text used opacity | No text uses opacity anymore. Secondary text uses the Slate token, and on blue it uses `--on-primary-muted`. |
| CTAs should be on most pages, subtly | A floating "Find a tutor" pill plus back-to-top appears after the hero on every page except Contact. Each section ends with a link-arrow to its next step. |
| Search bar in the navbar | A search pill in the navbar (icon only on smaller screens) opens a search dialog. Press `/` or `Ctrl+K` to open it. It searches subjects and pages in all three languages, including Roman Urdu and Urdu aliases (riazi, ریاضی). |
| Scroll back to top | Back-to-top button in the floating dock. It respects reduced motion and returns focus to the logo. |
| Logo marquee | One greyscale strip of the exam boards and tests we prepare for: Cambridge, FBISE, UET (ECAT), NUST (NET), SAT and IELTS. It pauses on hover or focus, each logo shows its colour on hover, and it becomes a static row under reduced motion. |
| Font pairing felt AI-styled | Young Serif for headings (a single weight, so headings can't be heavy-bolded) and Atkinson Hyperlegible Next for body text (designed for legibility, good on low-end screens). Gulzar Nastaliq for Urdu, loaded only when Urdu is chosen. |
| More images | Five photos plus three video loops, all in brand-shaped frames. |
| Footer structure | A Menu column with every page and the privacy policy, then Contact us (email, plus WhatsApp and phone once set) and Follow us (once URLs are set), then the © / ™ line. |
| Brand identity | Mughal-arch frames (which double as the logo's open book), the eight-point star from Lahore's tilework (eyebrows, badges, the jaali pattern on blue sections), the gold hand-drawn underline and the logo's wave. |
| Story: merit first, fair price, verified teachers | Hero line "Great teachers, fair fees" (*Acha ustaad, munasib fees* / اچھا استاد، مناسب فیس). A "Merit first" section with three promises, the five tutor checks, and an About story about fair prices for families across Lahore. |
| Competitor (Nearpeer) | "Recorded lectures are a start. A teacher who knows you is better" compares recorded courses with a personal tutor. It never names a competitor. |
| Headings with dashes, bold overuse | No dashes in any heading or copy. Headings are a single weight. Bold is reserved for labels and buttons. |
| Roman Urdu and Urdu | A three-way language switch (EN / Roman / اردو) in the navbar and mobile menu. Urdu switches the whole layout to right-to-left using logical CSS properties. The choice is remembered in the browser, and `?lang=ur` or `?lang=roman` links open in that language. |
| Privacy policy | New `/privacy` page in all three languages. |

## 2. Audit from round one (still applies)

Removed because they couldn't be verified: the stats (2,500+ tutors, 4.9/5, 10K families), testimonials, the school and university name strip, the "47 MDCAT slots" urgency banner, the blockchain/AI/uptime claims, the invented price comparison, the placeholder phone number and every `#` link. Kept: the four routes, the business model (free for students, 15% tutor fee), the five tutor checks and the founders.

## 3. Tokens and components

- **Tokens** (`src/index.css`): colour, type scale, radii, shadows, the `--jaali` pattern, and the Urdu overrides (`:root:lang(ur)`: Nastaliq stack, line-height 2.1, no letter-spacing).
- **Copy** (`src/i18n/en.js`, `roman.js`, `ur.js`): all user-facing text. Missing keys fall back to English. Read it with `useLang().t`.
- **Business facts** (`src/content/site.js`): email, WhatsApp, phone, socials, the subject catalogue, Urdu subject names and search aliases, and the exam logos.
- **Components:** `Navbar` (mega-menu, `SearchDialog`, `LangSwitch`), `FloatingDock`, `LogoMarquee`, `Footer`, `Accordion`, and `Motifs` (`PhotoTile`, `LoopVideo`, `Star`, `Wave`).
- **Motion** (`src/motion/usePageMotion.js`): declarative `data-*` attributes, documented at the top of the file. Pages remount on a language switch so SplitText never fights React.

## 4. Motion map

| Element | Motion | Notes |
| --- | --- | --- |
| Headings (`data-split`) | Lines rise out of a mask, staggered | Urdu headings fade up instead, because line-splitting Nastaliq is expensive |
| `.mark` underline | Draws in after its heading | The `--mark` CSS variable is animated |
| `data-reveal` | Fade up, batched as sections enter | Hidden only once JS and motion are allowed |
| Hero collage | Pops in with a stagger. The gold sun drifts with scroll (desktop). The request card floats. The verified star spins slowly. | |
| Process line on How it works | Draws down as you scroll | Scrubbed |
| Videos | Play only while on screen | Never autoplay under reduced motion or Save-Data. Every video has a visible pause/play button (WCAG 2.2.2). |
| Marquee | CSS loop, 36s | Pauses on hover/focus. Static under reduced motion. |
| Micro-interactions | Button lift and arrow nudge, link underline grow, chip lift, card lift and image zoom, accordion height and icon, mega-menu list slide, search option highlight, number shapes that tilt on hover | CSS |

`prefers-reduced-motion: reduce` disables all GSAP motion (via `gsap.matchMedia`) and every CSS transition.

## 5. Assets and licences

| Asset | Source | Licence / status |
| --- | --- | --- |
| `public/video/online-study.mp4`, `notes.mp4` | Pexels videos 6082995 and 6082599, re-encoded to 480×600 H.264, 7s, about 200–260 KB | Pexels Licence (free commercial use, no attribution required) |
| `public/video/classroom.mp4` | Pexels video 40122915, 960×540, 8s, 272 KB | Pexels Licence |
| `public/img/*` | Unsplash photos 1522202176988, 1513258496099, 1571260899304, 1529390079861 and 1434030216411 | Unsplash Licence |
| `public/logos/*` | Cambridge International, FBISE, UET Lahore, NUST, SAT and IELTS logos, from their Wikipedia/Wikimedia files | **Trademarks of their owners.** Used only to say which syllabuses and tests we prepare for, and the footer says so. Tutorista is not affiliated with any of them. **The owner should confirm they are comfortable with this use, or swap in text names.** |
| `public/fonts/*` | Young Serif, Atkinson Hyperlegible Next and Gulzar (latin/arabic subsets) | SIL Open Font Licence 1.1 |
| `public/brand/*`, `public/founders/*` | Owner assets (originals in `design/originals/`) | A vector logo is still needed. Founder photos need approval from each person. |

Stock media are placeholders. Footage and photos of real Tutorista tutors and students, with consent, will do more for trust.

## 6. Performance

Lighthouse 12.6.1, mobile (simulated slow 4G, 4× CPU), local production build.

| Page | Perf | A11y | SEO | Best practices | LCP | FCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home (EN) | 92 | 100 | 100 | 100 | 3.2s | 1.7s | 0 | 110ms |
| How it works | 95 | 100 | 100 | 100 | 2.7s | 1.7s | 0 | 110ms |
| About | 95 | 100 | 100 | 100 | 2.9s | 1.7s | 0 | 70ms |
| Contact | 97 | 100 | 100 | 100 | 2.3s | 1.7s | 0 | 50ms |
| Home (Urdu) | 77 | 100 | 100 | 100 | 4.2s | 1.7s | 0 | 310ms |

Compared with round one, scores dropped slightly because of GSAP (about 45 KB gzipped), the three-language copy, and the videos the owner asked for. The JS bundle is 153 KB gzipped (87 KB before). Urdu costs more because the Gulzar font is 209 KB (preloaded only for Urdu visitors) and Nastaliq text is slower to lay out. Phone checks found no horizontal overflow on any page in any language.

Possible next optimisations:
- Load the Roman Urdu and Urdu copy on demand (about 14 KB gzipped saved for English visitors).
- Subset Gulzar to the characters actually used (about 60% smaller).

## 7. Needs owner confirmation

1. **Social profile URLs and a WhatsApp number.** The Follow us column and the WhatsApp/phone links stay hidden until they are added to `src/content/site.js`. Showing icons that link nowhere would be dead buttons.
2. **Exam board logos.** Confirm you're comfortable showing them (see §5).
3. **Translations.** A native speaker should review the Roman Urdu and Urdu copy, especially tone and the privacy page.
4. **Privacy policy.** It's a plain-language draft. Have it reviewed before collecting data at scale.
5. **Is `hello@tutorista.pk` live?** The form sends there. A form backend or WhatsApp would be more reliable than `mailto:`.
6. **Business facts.** The five checks, 15% fee, payment methods, home-tutoring areas, "we suggest another tutor", and "nothing is charged until you choose".
7. **Founder photos.** Confirm each person has approved their photo.
8. **Domain.** `robots.txt`, `sitemap.xml` and `og:image` point to `tutorista.vercel.app`.
