#!/usr/bin/env node
/**
 * Gentle Laughter — i18n build.
 *
 * Reads source HTML files from repo root (Portuguese, canonical) plus
 * i18n/<lang>.json dictionaries, writes translated copies under
 * <lang>/<page>.html. Updates <html lang>, canonical, og:url, hreflang
 * alternates per output.
 *
 * Run: npm run build:i18n
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['en', 'fr', 'de'];
const SITE = 'https://gentlelaughter.com';

const SOURCE_PAGES = readdirSync(__root)
  .filter((f) => f.endsWith('.html') && !f.startsWith('_'));

function getDict(lang) {
  const path = join(__root, 'i18n', `${lang}.json`);
  if (!existsSync(path)) return {};
  return JSON.parse(readFileSync(path, 'utf8'));
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function translate(html, dict, lang, pageName) {
  let out = html;

  // 1. Swap <html lang="pt"> → <html lang="<lang>">
  out = out.replace(/<html\s+lang="pt"/i, `<html lang="${lang}"`);

  // 2. data-i18n text content swap
  out = out.replace(/<([a-z][a-z0-9]*)([^>]*\sdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag, attrs, key, originalContent) => {
      const t = dict[key];
      if (!t) return match;
      return `<${tag}${attrs}>${t}</${tag}>`;
    });

  // 3. data-i18n-attr (format: "attr:key, attr2:key2")
  out = out.replace(/(<[a-z][a-z0-9]*[^>]*\sdata-i18n-attr="([^"]+)"[^>]*\/?>)/gi,
    (match, fullTag, spec) => {
      let updated = fullTag;
      spec.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        const t = dict[key];
        if (!attr || !t) return;
        const re = new RegExp(`\\s${attr}="[^"]*"`, 'i');
        if (re.test(updated)) {
          updated = updated.replace(re, ` ${attr}="${escapeHtml(t)}"`);
        } else {
          // Insert attribute before closing >
          updated = updated.replace(/>$/, ` ${attr}="${escapeHtml(t)}">`);
        }
      });
      return updated;
    });

  // 4. Adjust <title>
  const titleKey = `${pageName}.title`;
  if (dict[titleKey]) {
    out = out.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(dict[titleKey])}</title>`);
  }

  // 5. Adjust meta description / og / twitter using <pageName>.description
  const descKey = `${pageName}.description`;
  if (dict[descKey]) {
    const d = escapeHtml(dict[descKey]);
    out = out.replace(/(<meta\s+name="description"\s+content=")[^"]*"/i, `$1${d}"`);
    out = out.replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/i, `$1${d}"`);
    out = out.replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*"/i, `$1${d}"`);
  }
  if (dict[titleKey]) {
    const t = escapeHtml(dict[titleKey]);
    out = out.replace(/(<meta\s+property="og:title"\s+content=")[^"]*"/i, `$1${t}"`);
    out = out.replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*"/i, `$1${t}"`);
  }

  // 6. Rewrite canonical + og:url + JSON-LD url to /<lang>/...
  const pageFile = pageName === 'index' ? '' : `${pageName}.html`;
  const langUrl = `${SITE}/${lang}/${pageFile}`;
  out = out.replace(/(<link\s+rel="canonical"\s+href=")[^"]*"/i, `$1${langUrl}"`);
  out = out.replace(/(<meta\s+property="og:url"\s+content=")[^"]*"/i, `$1${langUrl}"`);
  out = out.replace(/(<meta\s+property="og:locale"\s+content=")[^"]*"/i, `$1${langLocale(lang)}"`);

  // 7. hreflang alternates — rewrite for current lang context
  out = out.replace(/<link\s+rel="alternate"[^>]*>/gi, '');
  let alts = `\n  <link rel="alternate" hreflang="pt" href="${SITE}/${pageFile}" />`;
  ['en', 'fr', 'de'].forEach((l) => {
    alts += `\n  <link rel="alternate" hreflang="${l}" href="${SITE}/${l}/${pageFile}" />`;
  });
  alts += `\n  <link rel="alternate" hreflang="x-default" href="${SITE}/${pageFile}" />\n`;
  out = out.replace('</head>', alts + '</head>');

  // 8. Active flag in lang switcher
  out = out.replace(/data-lang="pt"\s+aria-pressed="true"/i, `data-lang="pt" aria-pressed="false"`);
  out = out.replace(new RegExp(`data-lang="${lang}"\\s+aria-pressed="false"`, 'i'),
    `data-lang="${lang}" aria-pressed="true"`);

  // 9. Rewrite relative asset/page paths to root-absolute so they work from /<lang>/
  out = out.replace(/(\s(?:href|src)=")(?!https?:|\/|#|mailto:|tel:|wa\.me|data:)([^"]+)"/g,
    (m, head, path) => `${head}/${path}"`);

  return out;
}

function langLocale(lang) {
  return { en: 'en_GB', fr: 'fr_FR', de: 'de_DE' }[lang] || 'en_GB';
}

function build() {
  let total = 0;
  for (const lang of LANGS) {
    const dict = getDict(lang);
    if (Object.keys(dict).length === 0) {
      console.warn(`[i18n] No translations for ${lang}. Skipping.`);
      continue;
    }
    const outDir = join(__root, lang);
    mkdirSync(outDir, { recursive: true });
    for (const page of SOURCE_PAGES) {
      const pageName = page.replace('.html', '');
      const sourceHtml = readFileSync(join(__root, page), 'utf8');
      // Only translate pages that have at least one key in the dictionary
      const hasContent = Object.keys(dict).some((k) => k.startsWith(`${pageName}.`));
      if (!hasContent && pageName !== 'index') continue;
      const translated = translate(sourceHtml, dict, lang, pageName);
      writeFileSync(join(outDir, page), translated);
      total++;
    }
    console.log(`[i18n] ${lang} → ${outDir} (${SOURCE_PAGES.length} pages)`);
  }
  console.log(`[i18n] Done. ${total} files written.`);
}

build();
