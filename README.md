# Tutorista

Marketing site for Tutorista, a one-to-one tutoring service in Lahore. Built with React 19, Vite 7 and React Router 7, and deployed on Vercel.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Where things live

- `src/content/site.js`: contact details, social links and the subject catalogue. Most content edits happen here. Values left as `null` keep their UI hidden.
- `src/index.css`: design tokens (colour, type, radii) and shared primitives (buttons, chips, photo shapes, reveal motion).
- `src/components/`: `Navbar` (subjects mega-menu), `Footer`, `Accordion`, `Motifs` (`PhotoTile`, `Wave`).
- `src/pages/`: `Home`, `Services` (shown as "How it works"), `About`, `Contact` (tutor request and tutor application form).
- `public/img`, `public/founders`: WebP images. Each has a smaller `-s` variant for `srcset`.
- `public/fonts`: self-hosted Bricolage Grotesque and Figtree.
- `design/originals/`: full-size source logo and portraits. These are not deployed.
- `docs/REDESIGN.md`: audit, design decisions, asset licences, performance report and open questions for the owner.
