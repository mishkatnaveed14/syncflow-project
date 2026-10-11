# SyncFlow — Landing Page

A complete, original landing page for **SyncFlow, the all-in-one Work OS for modern teams**.
Built with **React + Vite + GSAP (ScrollTrigger)**. Plain CSS, no Next.js.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the production build
```

Requires Node 18+.

## Page structure

1. Hero with a 3D glassmorphic app preview, floating badges and mouse parallax
2. Logo cloud and social proof (marquee + animated counters)
3. Product showcase: 4 tilt cards (Tasks, Docs, AI Copilot, Databases)
4. "Why SyncFlow over 5 apps?" with a scroll-scrubbed 3D orbit that collapses into one workspace
5. Pricing: Monthly / Yearly toggle (20% off yearly), Free / Pro / Enterprise
6. Interactive feature matrix (collapsible groups, "differences only" switch)
7. Testimonials 3D carousel and case-study metrics
8. Accordion FAQ
9. Bottom CTA with 3D rings and a full footer

## Where things live

| What | File |
| --- | --- |
| GSAP + ScrollTrigger registration | `src/lib/gsap.js` |
| Global scroll animations (data attributes) | `src/hooks/useScrollAnimations.js` |
| 3D hover tilt | `src/components/TiltCard.jsx` |
| Colors, fonts, all styling | `src/index.css` (see `:root` variables) |
| Plan prices and features | `src/components/Pricing.jsx` |
| Matrix rows | `src/components/Matrix.jsx` |

### Animation attributes

Add these to any element to animate it:

- `data-reveal="up | left | right | zoom"` — 3D reveal on scroll
- `data-stagger` — children rise in one by one
- `data-parallax="0.5"` — depth drift while scrolling
- `data-depth-section` on a section (with a `.section-inner` child) — tilts flat as it arrives

Animations are skipped automatically for visitors with "reduce motion" enabled.

## Before you launch

- Customer names, testimonials, stats and case-study numbers are **sample placeholders**. Replace them with real ones.
- Links point to `#` anchors and `hello@syncflow.example`. Wire them to your real app, sign-up and email.
- Prices: Pro $12 and Enterprise $29 are the yearly per-user prices; monthly prices are derived at +25% (so yearly is 20% cheaper).
# syncflow-project
