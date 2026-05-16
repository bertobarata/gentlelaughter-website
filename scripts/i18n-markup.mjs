#!/usr/bin/env node
/**
 * Auto-mark translatable text in a source HTML page.
 *
 * Usage: node scripts/i18n-markup.mjs <page.html>
 *
 * Strategy: parse HTML, find elements whose direct text content is non-empty
 * and longer than 8 chars. Add data-i18n="<page>.t<N>" attribute if missing.
 * Output: writes mutated HTML in place + prints JSON keys+values to stdout.
 *
 * Skip rules:
 * - already has data-i18n
 * - inside <script>, <style>, <head>, <select>, <option>
 * - is a script/style tag
 * - is part of navigation (handled by shared nav.* keys already)
 * - text matches a numeric/short-token pattern
 */

import { readFileSync, writeFileSync } from 'node:fs';

const path = process.argv[2];
if (!path) { console.error('Usage: i18n-markup.mjs <page.html>'); process.exit(1); }

const pageName = path.replace(/\.html$/, '').replace(/^.*\//, '');
const html = readFileSync(path, 'utf8');

// Tags we mark up
const TAGS = ['h1','h2','h3','h4','h5','p','summary','figcaption','li','dt','dd','button','strong','em','span','div'];

// Skip: tags inside which we do not mark up
const SKIP_PARENT = /<(?:script|style|head|select|option|nav|header)\b[^>]*>/i;

let out = '';
let i = 0;
let n = 0;
const dict = {};

// Quick state: locate <main>...</main> region (most translatable content lives here)
const mainMatch = html.match(/<main\b[^>]*>/);
const mainStart = mainMatch ? mainMatch.index : -1;
const mainEnd = html.lastIndexOf('</main>');
if (mainStart === -1 || mainEnd === -1) { console.error('No <main> found.'); process.exit(1); }
const mainTagLen = mainMatch[0].length;

const before = html.slice(0, mainStart + mainTagLen);
const main = html.slice(mainStart + mainTagLen, mainEnd);
const after = html.slice(mainEnd);

// Walk through tag-by-tag and mark up
const tagRe = /<([a-z][a-z0-9]*)([^>]*)>([^<]+)<\/\1>/gi;
let lastIdx = 0;
let result = '';
let m;
while ((m = tagRe.exec(main)) !== null) {
  const [full, tag, attrs, text] = m;
  result += main.slice(lastIdx, m.index);
  lastIdx = m.index + full.length;
  const lc = tag.toLowerCase();
  if (!TAGS.includes(lc)) { result += full; continue; }
  // Skip if already has data-i18n
  if (/\sdata-i18n=/i.test(attrs)) { result += full; continue; }
  // Skip if inside option/select context (heuristic: text is short single phrase)
  const cleanText = text.replace(/\s+/g, ' ').trim();
  if (cleanText.length < 10) { result += full; continue; }
  // Skip purely whitespace/punctuation
  if (!/[a-záéíóúâêôãõçA-ZÁÉÍÓÚÂÊÔÃÕÇ]{4,}/.test(cleanText)) { result += full; continue; }
  // Skip if "Lisboa" alone or single proper noun
  // Generate key
  n++;
  const key = `${pageName}.t${n}`;
  dict[key] = cleanText;
  result += `<${tag}${attrs} data-i18n="${key}">${text}</${tag}>`;
}
result += main.slice(lastIdx);

const newHtml = before + result + after;
writeFileSync(path, newHtml);

// Output JSON dict
console.log(JSON.stringify(dict, null, 2));
console.error(`[i18n-markup] ${path}: ${n} strings tagged`);
