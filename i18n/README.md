# i18n — translation source files

One JSON per language. Each file mirrors the same key tree.

- `en.json` — English
- `fr.json` — Français
- `de.json` — Deutsch

PT is the canonical source. Source HTML files in repo root remain PT.

## How it works

1. Source HTML files in repo root use `data-i18n="key"` attributes on every translatable element. Source text content is the PT default.
2. `scripts/i18n-build.mjs` reads each source HTML, applies translations for each lang, writes copies to `/en/`, `/fr/`, `/de/` directories.
3. SEO: each `/lang/` page gets its own canonical, `hreflang`, `<html lang>`, OG/Twitter meta and JSON-LD content.
4. Internal links remain page-relative (`<a href="eventos.html">`) so the same markup works in any lang directory.
5. Build runs via `npm run build:i18n`.

## Translatable attributes

- `data-i18n="key"` — text content of the element
- `data-i18n-attr="attr:key, attr2:key2"` — replace specific attributes (e.g. `alt`, `title`, `aria-label`, `content`)

## Key naming convention

`<page>.<section>.<element>`

Examples:
- `index.hero.title`
- `index.hero.lede`
- `agenciamento.album.headline`
- `nav.contact` (shared)
- `footer.tagline` (shared)
