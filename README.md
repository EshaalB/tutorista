# Tutorista

Marketing site for Tutorista, a one-to-one tutoring service in Lahore, in English, Roman Urdu and Urdu. Built with React 19, Vite 7, React Router 7 and GSAP, and deployed on Vercel.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Where things live

- `src/i18n/`: all page copy in `en.js`, `roman.js` and `ur.js`. Missing keys fall back to English.
- `src/content/site.js`: contact details, social links, the subject catalogue and exam logos. Values left as `null` keep their UI hidden.
- `src/motion/usePageMotion.js`: GSAP scroll and text animations, driven by `data-*` attributes.
- `src/index.css`: design tokens (colour, type, radii) and shared primitives (buttons, chips, photo shapes, reveal motion).
- `src/components/`: `Navbar` (mega-menu, search, language switch), `FloatingDock`, `LogoMarquee`, `Footer`, `Accordion`, `Motifs` (`PhotoTile`, `LoopVideo`, `Star`, `Wave`).
- `src/pages/`: `Home`, `Services` (shown as "How it works"), `About`, `Contact` (tutor request and tutor application form), `Privacy`.
- `public/img`, `public/founders`: WebP images. Each has a smaller `-s` variant for `srcset`.
- `public/fonts`: self-hosted Young Serif, Atkinson Hyperlegible Next and Gulzar (Urdu).
- `public/video`, `public/logos`: short muted loops and greyscale exam-board logos.
- `design/originals/`: full-size source logo and portraits. These are not deployed.
- `docs/REDESIGN.md`: audit, design decisions, asset licences, performance report and open questions for the owner.
