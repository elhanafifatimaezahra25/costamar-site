# Costamar — Design System (locked before component work)

Derived from studying Aman, Aesop, Apple (Vision Pro), Stripe, and Linear:
- Aman/Aesop: dark, warm neutrals, generous negative space, serif display type,
  photography does the talking, copy is short and declarative.
- Apple (Vision Pro): huge type scale jumps, one idea per screen/section,
  scroll-driven reveals tied 1:1 to content, restrained motion.
- Stripe: crisp micro-interactions, subtle gradients/glass, precise spacing grid.
- Linear: fast, confident easing curves, no bounce, monochrome + single accent.

## Color

Base surface and text avoid pure black/white per brief.

| Token                | Value      | Use                                   |
|---------------------|------------|----------------------------------------|
| `--color-bg`          | `#121414` | page background                        |
| `--color-bg-raised`   | `#181B1A` | cards, panels                          |
| `--color-bg-inset`    | `#0D0F0E` | deep sections / footer                 |
| `--color-fg`          | `#E3E2E2` | primary text                           |
| `--color-fg-muted`    | `#A6A9A6` | secondary text / captions              |
| `--color-fg-faint`    | `#6E716E` | tertiary / disabled                    |
| `--color-gold`        | `#C9A96A` | accent — CTAs, active states, dividers |
| `--color-gold-soft`   | `#C9A96A` @ 12% | gold glass fills                  |
| `--color-stone`       | `#8C8577` | secondary accent                       |
| `--color-beige`       | `#D8CFC0` | secondary accent / imagery overlay     |
| `--color-emerald`     | `#1F3B32` | dark emerald accent (section tinting)  |
| `--color-border`      | `#2A2D2B` | hairlines                              |

Never pure `#000` / `#fff`. Glass surfaces = `--color-fg` at 4–8% opacity over
`--color-bg-raised`, with a 1px `--color-border` edge — used sparingly (nav,
sticky booking bar), not as a default card style.

## Typography

- **Display / headings:** `Cormorant Garamond` (Canela/Gambetta-style high-contrast
  serif, freely licensed). Weight 400–500 only. Large sizes, tight tracking,
  generous leading on multi-line headlines.
- **Body / UI:** `Inter`. Weights 400/500/600. Used for paragraphs, labels, nav,
  forms, buttons.

Type scale (desktop / mobile):

| Role        | Desktop         | Mobile         | Font              |
|-------------|-----------------|----------------|-------------------|
| Display XL  | 96px / 1.02     | 48px / 1.05    | Cormorant, 400     |
| Display L   | 64px / 1.05     | 40px / 1.08    | Cormorant, 400     |
| Display M   | 44px / 1.1      | 32px / 1.15    | Cormorant, 500     |
| Eyebrow     | 13px / uppercase, tracked +0.18em | same | Inter, 600 |
| Body L      | 20px / 1.6      | 17px / 1.6     | Inter, 400         |
| Body M      | 16px / 1.7      | 15px / 1.7     | Inter, 400         |
| Caption     | 13px / 1.5      | 12px / 1.5     | Inter, 500         |

## Spacing & layout rhythm

8px base unit. Section vertical padding is intentionally large (Aman/Apple
cue: one idea, lots of air):

- Section padding: `160px` desktop / `88px` mobile (top+bottom)
- Container max-width: `1280px`, gutters `32px` desktop / `20px` mobile
- Grid gap default: `32px`; large media grids: `24px`
- Card internal padding: `40px` desktop / `24px` mobile

## Motion language

Single easing family, no bounce, borrowed from Linear/Stripe restraint:

- `ease-premium`: `cubic-bezier(0.16, 1, 0.3, 1)` — standard reveal/exit
- Durations: micro `200ms`, standard `600ms`, cinematic `900–1400ms`
- Smooth scroll: Lenis, lerp `0.1`
- Section reveal default: fade + 24px translate-Y, staggered 80ms per child
- Hero: cinematic fade-scale (1.06 → 1.0) on load, parallax on scroll
- Pinned-scrub reserved for the Signature Hammam Experience section only
  (one pin per page keeps it "alive, never distracting")
- Sticky-stack for the Featured Treatments cards
- Sticky image + staggered numbered list for the Signature Hammam Experience
  (replaces the earlier pinned-scrub: overlapping absolute captions read as
  empty/broken on load and in user testing — a sticky visual next to a plain
  reveal-in list keeps the "parcours" storytelling legible at any scroll speed)
- Horizontal-on-vertical for the Gallery
- Staggered cards for Why Choose Us + Testimonials
- Animated SVG rings (stroke-dashoffset on scroll-into-view) for Key Figures
- SplitText reveal for section headlines (word-by-word, 40ms stagger)

## Section → animation pattern map

1. Hero — fade-scale + parallax layers
2. Luxury Introduction — splittext-reveal headline, fade-up copy
3. Featured Treatments — sticky-stack cards
4. Signature Hammam Experience — sticky image + staggered numbered list
5. Why Choose Us — staggered cards
6. Key Figures — staggered cards, animated ring reveal
7. Gallery — horizontal-on-vertical scroll
8. Pricing / Packages — fade-scale reveal
9. Testimonials — staggered cards + auto-crossfade
10. Booking CTA — fade-up, gold glass panel
11. Contact + Map + Hours — split layout, fade-up
12. Footer — simple fade-in, no scroll trickery (respect the reader's exit)

## Imagery direction

Real on-site Costamar photography only (no stock, no AI-generated imagery).
Raw phone photos live outside the repo; `scripts/process-photos.mjs` crops,
color-grades (warm lift, +saturation, unsharp mask to counter the source
compression) and exports the derivatives checked into `public/images/`. See
that script's `SRC`/`JOBS` maps for which raw file feeds which section. The
`.photo-treated` CSS class layers a light gold-tinted gradient + vignette on
top so the set reads as one consistent world across sections.
