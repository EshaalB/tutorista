# Tutorista

Marketing site for Tutorista, a one-to-one tutoring service in Lahore, in English and Urdu. Built with React 19, Vite 7, React Router 7 and GSAP, and deployed on Vercel.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Where things live

- `src/i18n/`: all page copy in `en.js` and `ur.js`. Missing keys fall back to English.
- `src/a11y/`: reading preferences (text size, contrast, simpler font, underlined links, Lite mode) used by `AccessibilityPanel`.
- `src/content/site.js`: contact details, social links, the subject catalogue and exam logos. Values left as `null` keep their UI hidden.
- `src/motion/usePageMotion.js`: GSAP scroll and text animations, driven by `data-*` attributes.
- `src/index.css`: design tokens (colour, type, radius system) and shared primitives (buttons, chips, media frames).
- `src/components/`: `Navbar` (mega-menu, search, language switch), `AccessibilityPanel`, `FloatingDock`, `LogoMarquee`, `Footer`, `Accordion`, `Motifs` (`PhotoTile`, `LoopVideo`, `PageCurves`).
- `src/pages/`: `Home`, `Services` (shown as "How it works"), `About`, `Contact` (tutor request and tutor application form), `Legal` (privacy policy and terms).
- `public/img`, `public/founders`: WebP images. Each has a smaller `-s` variant for `srcset`.
- `public/fonts`: self-hosted Zodiak, Geist and Gulzar (Urdu).
- `public/video`, `public/logos`: short muted loops and greyscale exam-board and university logos.
- `design/originals/`: full-size source logo and portraits. These are not deployed.
- `docs/REDESIGN.md`: audit, design decisions, asset licences, performance report and open questions for the owner.
