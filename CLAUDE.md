# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **static, no-build, single-tenant business website template** (Portuguese-language) intended to be cloned and customized per project. There is no framework, no bundler, and no server-side code — pages are plain HTML files that link directly to `css/styles.css` and `js/site.js`. Deployment is via Apache (`.htaccess` is checked in) on shared hosting.

This particular checkout is the `gentlelaughter-website` instance of the template. As of writing, the HTML still contains the unsubstituted `{{...}}` placeholders from the template — see "Placeholder system" below.

## Commands

```bash
npm run serve   # npx serve . — local static server for previewing pages
npm run purge   # purgecss against css/styles.css → css/styles.purged.css (gitignored)
```

There is no build step, no test suite, and no linter configured. Pages are edited directly and refreshed in the browser.

## Architecture

### Page model
Every top-level `*.html` file is a complete, standalone page. There is no templating engine — shared chrome (header, footer, floating WhatsApp button, scripts) is **copy-pasted** into each page from `_partials.html`, which is a *reference file only* and is not served. When you change a partial, you must update every page that uses it (or introduce a build step / SSI). `_partials.html` itself documents the snippets and the placeholders.

### Placeholder system
The template uses `{{TOKEN}}` placeholders (e.g. `{{NOME_NEGOCIO}}`, `{{TELEFONE_WHATSAPP}}`, `{{FORMSPREE_ENDPOINT}}`, `{{LOGO_FILE}}`, `{{SITE_URL}}`) that must be replaced project-wide before launch. The full list with formats lives at the top of `_partials.html`. `package.json` also still has `{{SITE_SLUG}}` / `{{SITE_DESCRIPTION}}`. The intended workflow is a single project-wide find-and-replace.

### Shared runtime (`js/site.js`)
A single IIFE that handles, for every page: mobile nav toggle (`.nav-toggle` + `.top-nav ul.open`), the footer year (`#year`), active-link highlighting in the top nav (matched by pathname's last segment), and Service Worker registration. Keep new shared UX behaviors here rather than per-page scripts.

### PWA / offline
`service-worker.js` + `manifest.json` make the site installable. The SW uses a versioned cache; bump the cache version in `service-worker.js` whenever cached assets change, otherwise returning visitors will see stale files.

### Forms
Contact form (`formulario.html`) posts to a Formspree endpoint via the `{{FORMSPREE_ENDPOINT}}` placeholder. There is no backend in this repo.

### Cookies
`js/cookie-consent.js` is a self-contained banner — load it on every page after `site.js`.

### Apache config
`.htaccess` controls caching headers, compression, and any redirects for the production host. Edit it (not server config) for redirect/cache changes.

## When editing

- Treat `_partials.html` as documentation — never link to it from a page.
- A change to header/footer markup is an N-page edit; check every `*.html` at the repo root.
- Bump the `?v=` query string on `css/styles.css` references when shipping CSS changes (it's the cache-buster used in the HTML).
- `css/styles.purged.css` is generated and gitignored; don't edit or commit it.
