# Tutorista redesign: direction, decisions and handover

October 2026, round three. Covers the marketing site (`/`, `/services`, `/about`, `/contact`, `/privacy`, `/terms`) in English, with a full Urdu version.

## 1. Audit of round two

What still read as generic, and what changed:

| Problem | Change |
| --- | --- |
| Section rhythm was the template sequence: hero, badges, marquee, cards, steps, cards, testimonials-shaped blocks, CTA, footer | Each homepage section now uses a different form: an image-led hero, a typographic statement, a scroll-drawn story, a comparison table, a row of numbers, an asymmetric pair and a curved closing band. |
| Constant floating, spinning and parallax decoration | Removed. Motion is limited to the hero entrance, line reveals, image-mask reveals and SVG path drawing. |
| Separate Roman Urdu language | Removed as a language. Roman Urdu now appears in six natural places (see §4). Urdu script stays as a full translation. |
| Fonts | Zodiak (display, headings at weight 500, italic for emphasis) with Geist (body). Gulzar Nastaliq for Urdu. |
| Pill buttons and uniform rounded cards | Radius system from the brief: buttons and inputs 12px, cards 16px, quotes 24px, containers 28px, a signature page frame of 48/12/48/12, and feature cards of 40/12/40/12. The asymmetric shapes are used only on page-framed media, the tutor path and the tutor price. |
| Footer had no Terms page | New `/terms`. The footer is now Menu (all pages, Privacy, Terms), Contact us, Follow us (once set), and a ©/™ line. |
| No reading support | New accessibility panel (§5). |

## 2. Creative direction

Three hero concepts were considered:

1. **The open book (chosen).** Two page-framed images, a video of a student studying online and a photo of a classroom, sit tilted apart like an open book over layered cobalt and gold page curves taken from the logo. The pages open on load. A Roman Urdu margin note reads *acha ustaad, munasib fees*. It's built straight from the logo, image-led, and shows both sides of the product: learning online and a real teacher.
2. **Margin notes.** A purely typographic hero written like a page of notes. It was rejected as the main idea because it had too little imagery for a brand that needs warmth. Its best part, a sentence you complete ("I need help with [subject] for [level]"), became the hero's call to action.
3. **Portrait wall.** A row of tutor portraits, as in the InsightPod reference. Rejected because Tutorista has no real tutor photos yet, and stock faces presented as tutors would be fake profiles.

**Headline:** "Every tutor tested. *Every fee upfront.*" It states merit and affordability in the first five seconds, with no claims we can't back up.

**Signature motif, the flowing page:** asymmetric page frames, layered cobalt and gold page curves (in the hero and on the closing band's top edge), a scroll-drawn curved path through the tutor checks, and the gold hand-drawn underline (once per page).

**Photography direction:** real learning moments rather than portraits. Stock photos and footage are placeholders until real sessions can be photographed (§6).

**Competitive notes:** Nearpeer (inspected live) is a recorded-course and app business that leads with exam categories, promotions and a phone number. Tutorista positions against that without naming it: the "Recorded lectures help. A teacher who knows you helps more" table. Tutorful, Preply, Brilliant, Outschool, MyTutor and Duolingo were **not** inspected live this round. The owner's reference screenshots (MyTutor, Outschool, Tutorful, Educa, Pay4Me, Ruang Edit, I9RAA, InsightPod) informed the photo framing, the sentence picker, the footer wordmark and the editorial spacing.

## 3. Homepage structure

1. **Hero:** headline, one line on what Tutorista does, the sentence picker (which opens a pre-filled request form), the open-book images.
2. **Exam-board marquee:** one long greyscale strip (Cambridge, BISE Lahore, FBISE, LUMS, FAST-NUCES, GIKI, NUST, UET, SAT, IELTS) labelled "Boards and entry tests our students prepare for", with a not-affiliated note.
3. **Statement:** one typographic paragraph on merit and fees.
4. **Five checks:** the signature scroll section. A curved path draws beside the checks, next to a sticky classroom video.
5. **Comparison:** recorded course vs your tutor, as a real `<table>` that becomes stacked rows on phones.
6. **Fees:** Rs 0 / 1 lesson / 85%.
7. **Two paths:** a large image-led block for families and a smaller, offset block for tutors.
8. **Closing band:** a page-curve top edge and a Roman Urdu prompt.

There are no testimonials. Real, consented reviews should be added when they exist (§7).

## 4. Roman Urdu touches

There are six in English mode. Each is rendered in Urdu script in Urdu mode.
- Hero margin note: *acha ustaad, munasib fees*
- Checks heading: "Five checks. No shortcuts, no *sifarish*"
- Closing band: *Chalein, shuru karein?*
- FAQ: *Koi aur sawal?* Ask us directly
- Form success: *Shukriya!* Your email is ready to send
- 404: *Oho*, we couldn’t find that page

## 5. Accessibility panel

The round button at the bottom-left opens "Make reading easier". It was designed for Pakistani visitors in particular:
- **Text size:** Normal, Large or Larger, for parents and grandparents reading on phones.
- **Stronger contrast:** for reading in bright sunlight or on dim, low-end screens.
- **Simpler font:** Verdana/Tahoma with extra spacing, for weak readers and dyslexia.
- **Underline links.**
- **Lite mode:** stops all animation and autoplay video and saves mobile data on prepaid packages. The logo strip becomes static.
- **Read this page aloud:** uses the device's own speech voices (Web Speech API), with an Urdu voice when the device has one. If it doesn't, the panel says so.
- Settings are saved in the browser only and applied before first paint, so the page doesn't jump. The panel closes with Escape and returns focus to its button.

## 6. Assets and licences

| Asset | Source | Licence / status |
| --- | --- | --- |
| `public/fonts/zodiak-*` | Fontshare (Indian Type Foundry) | ITF Free Font License, free for commercial and web use |
| `public/fonts/geist-latin.woff2`, `gulzar-arabic.woff2` | Google Fonts | SIL OFL 1.1 |
| `public/video/*` | Pexels videos 6082995, 6082599 and 40122915, re-encoded (200–272 KB each) | Pexels Licence |
| `public/img/*` | Unsplash (IDs listed in earlier rounds) | Unsplash Licence |
| `public/logos/*` | Cambridge, BISE Lahore, FBISE, LUMS, FAST-NUCES, GIKI, NUST, UET, SAT and IELTS, from their Wikipedia/Wikimedia files | **Trademarks of their owners.** Shown only to say what students prepare for, and the page says Tutorista is not affiliated. **The owner should confirm this use, or ask the institutions.** |
| `public/brand/*`, `public/founders/*` | Owner assets | A vector logo is still needed. Founders must approve their photos. |

## 7. Performance and checks

Lighthouse 12.6.1, mobile (simulated slow 4G, 4× CPU), production build:

| Page | Perf | A11y | SEO | BP | LCP | FCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 93 | 100 | 100 | 100 | 3.1s | 1.7s | 0 | 40ms |
| How it works | 95 | 100 | 100 | 100 | 2.7s | 2.0s | 0 | 40ms |
| About | 93 | 100 | 100 | 100 | 3.0s | 2.0s | 0 | 30ms |
| Contact | 98 | 100 | 100 | 100 | 2.3s | 1.7s | 0 | 10ms |
| Home (Urdu) | 82 | 100 | 100 | 100 | 4.3s | 1.7s | 0 | 190ms |

LCP is above the 2.5s target on most pages under this heavy throttling. The main causes are GSAP (about 45 KB gzipped) and the hero's image entrance. For Urdu, the extra cost is Gulzar (209 KB, preloaded only for Urdu visitors) and Nastaliq layout. Lite mode and reduced-motion visitors skip the animation entirely.

Checks run:
- No horizontal overflow at 375px on any page in either language.
- No console errors.
- Menu, search, subject picker and the request form's pre-filling work.
- Every accessibility panel setting applies and saves.

Faded-in content stays in the accessibility tree (fades use opacity, never `visibility`).

## 8. Needs owner confirmation

1. Social profile URLs and a WhatsApp number in `src/content/site.js`. The Follow us column, the WhatsApp buttons and the contact page socials stay hidden until they are set.
2. Permission or comfort with showing the ten institution logos.
3. A native-speaker review of the Urdu and of the Roman Urdu touches.
4. A review of the Privacy policy and Terms of service drafts before launch.
5. That `hello@tutorista.pk` is live and monitored.
6. That the five checks, the 15% fee, the payment methods and the home-tutoring areas are accurate.
7. Founder photo approval, and a vector logo.
8. Real photos or video of Tutorista sessions, and consented reviews, to replace stock media and add honest social proof.
