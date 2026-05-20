# Gentle Laughter — Design system

Source-of-truth notes for the visual system. Implementation lives in `css/styles.css`. PRODUCT.md owns the brand register and tone.

## Palette

Locked: ink + paper + cal + rule + burgundy. **No accent peach.** Burgundy is reserved for the album drench on `agenciamento.html` only — never use as an interaction colour.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#eae0d5` | `#1c1916` | Page background, default surface |
| `--paper-soft` | `#f4ede6` | `#24201b` | Hover surfaces, panels, glass tints |
| `--cal` | `#e8ddc9` | `#2d2620` | Warm field — `btn--accent`, hero side panel |
| `--ink` | `#27241c` | `#ece3d4` | Primary text, primary CTA, focus ring |
| `--ink-soft` | `#555645` | `#a8a190` | Secondary text, eyebrows |
| `--rule` | `rgba(39,36,28,0.10)` | `rgba(236,227,212,0.14)` | Hairlines, borders |
| `--burgundy` | `#3d1820` | `#6b2935` | Album drench only (`.album-drench` on agenciamento.html) |

`--accent` and `--accent-ink` are aliases mapped to `--ink` / `--paper` to avoid mass renames in legacy class hooks. They never carry colour.

Tints are written with `color-mix(in srgb, var(--token) X%, transparent)` so they swap cleanly between modes. No raw `rgba()` literals for surfaces.

## Theme — light + dark are equals

PRODUCT.md mandates dark parity. Both modes are warm parchment: light is paper-on-ink-text, dark is parchment-on-near-black. Neither sterile blue-grey nor flat black.

- `@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]` both swap the token block.
- `<meta name="theme-color">` ships two media variants per page.
- WCAG AA contrast verified for body, eyebrow, links, buttons in both modes.

## Typography

| Token | Family | Use |
|---|---|---|
| `--font-serif` | Tenor Sans | Headings, page-hero titles, hero wordmark, service-card titles, contact-slab heading |
| `--font-sans` | Public Sans | Body, eyebrows, labels, navigation, button text, .spine label |

Loaded via Google Fonts CDN (`@import` at top of styles.css). Self-hosted woff2 still pending — see `em falta.md` §16.

Numerals: lining figures only. `service-card__num` uses `font-variant-numeric: lining-nums` and is **roman, not italic**. Italicised digits read as decorative reflex.

Line length capped at `--measure: 68ch` for body prose.

## Spacing

| Token | Value | Use |
|---|---|---|
| `--space-1`–`--space-8` | 0.75rem → 9rem | Section rhythm |
| `--silence` | `clamp(4rem, 10vw, 9rem)` | Vertical breathing room above hero, below contact slab — the "white field" device |
| `--pad-x` | `clamp(1.15rem, 4.5vw, 3rem)` | Shell horizontal padding |

## Layout

- `.shell` — content container, max width `--content-width` (1080px).
- `.services-grid` — strict 3-col desktop, 2-col `≤960px`, 1-col `≤600px`. No `auto-fill`.
- `.service-card` uses **hanging numerals**: number is absolutely positioned in a left margin gutter; title hangs against a flat baseline.
- `.spine` — vertical 1px ink rule with hanging label, used for editorial sidebar treatment (intended for hero rebuild, sobre.html, álbum colophon).
- `.two-col` — generic 2-col, collapses to 1-col `≤760px`.

## Components

- `.btn` — pill, ink-on-paper default. Min-height 44px (touch target). Hover inverts: paper bg + ink box-shadow inset.
- `.btn--accent` — cal background, ink text, ink hairline. The ONLY non-ink CTA.
- `.btn--ghost` — transparent, rule border.
- `.contact-slab` — closer block on every page. Heading + lede + CTA on left, contact list on right. Collapses to single column ≤760px.
- `.mobile-cta-bar` — fixed-bottom CTA bar injected by `js/site.js` on service pages and `livro.html` / `parceiros.html` only. Hides when `.contact-slab` or footer enters viewport.
- `.whatsapp-float` — fixed bottom-right WhatsApp circle. Auto-hides via IntersectionObserver when contact slab or footer is visible.
- `.bento` — home services index, 9-tile editorial asymmetric grid (desktop 4-col, 2-col ≤960px). Tile sizes: `--hero` (01, 2×2 span), `--medium` (02, 2-col), `--small` (03-08), `--wide` (09, full-width). Mobile ≤760px collapses to single-column hairline rows. `.bento__footer` carries the venues caption (`Multiusos · Coliseu · Campo Pequeno · MEO Arena`) and link to `sobre.html`. Replaces former `.index` + `.lineage-strip` on home only.
- `.album-drench__eyebrow|title|lede|aside|media|grid` — typed class hooks for the burgundy album section on `agenciamento.html`. All previously-inline declarations now live in `styles.css`. Burgundy reservation still applies (this section only).

## Motion

- `.reveal` + `.is-visible` — opacity/transform fade-in, staggered via `.delay-100/200/…/600`.
- Easing: `--ease-out` and `--ease-out-quart` (exponential, no bounce).
- Hover transforms only on transform/opacity. No layout property animation.

## Absolute bans (from impeccable shared laws)

- No side-stripe borders.
- No gradient text.
- No glassmorphism as default. The header bar uses backdrop-blur as a measured frosted bar — once, on purpose.
- No hero-metric template.
- No identical card grids (services-grid is index, not catalogue).
- No modals.
- No em dashes in copy. No banned phrases (see PRODUCT.md voice rules).

## Forms

`formulario.html` ships **4 + 1 fields**: Linha → Mensagem → Nome → Contacto → RGPD. Single combined contact field accepts WhatsApp or email — channel is inferred, not asked.

`?intent=` query param pre-fills:
- `book-a-call` — call request preset
- `guide` — selects "Guia de planeamento" + message preset
- `vanessa-alves` / `album` — selects "02 · Agenciamento de fado" + reservation preset

Submit handler builds a WhatsApp deep-link, opens it in a new tab, then redirects to `sucesso.html` after 2s.

## Testing

Playwright suite under `tests/` with 11 spec files: smoke, banned copy, axe a11y, keyboard focus, form structure, dark-mode, touch targets, SEO infra, no `{{...}}` placeholders, visual baselines, agenciamento fado-only assertions. GHA runs on push + PR (`.github/workflows/playwright.yml`). User must run `npm install` once, then `npx playwright install`. Visual baselines need first capture via `npm run test:update`.

## Cache busting

CSS shipped with `?v=N` query string in every HTML `<link>` tag. Bump on every CSS ship. Service worker `CACHE_NAME` and `RUNTIME_CACHE` versions follow the same number. Currently at `v=69`.
