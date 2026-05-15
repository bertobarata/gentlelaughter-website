/**
 * Gentle Laughter — i18n
 * Phase 1: nav, footer, CTAs, cookie banner, lang switcher.
 * Body content stays Portuguese until Phase 2 (per-language URLs).
 */
(function () {
  'use strict';

  var SUPPORTED = ['pt', 'en', 'fr', 'de'];
  var DEFAULT = 'pt';
  var STORAGE_KEY = 'gl-lang';

  function detectLang() {
    var p = new URLSearchParams(location.search).get('lang');
    if (p && SUPPORTED.indexOf(p) !== -1) return p;
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s && SUPPORTED.indexOf(s) !== -1) return s;
    } catch (e) {}
    var nav = (navigator.language || '').toLowerCase().slice(0, 2);
    if (SUPPORTED.indexOf(nav) !== -1) return nav;
    return DEFAULT;
  }

  function apply(dict) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (dict[key]) el.setAttribute('aria-label', dict[key]);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      // format: "attr:key, attr2:key2"
      var spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach(function (pair) {
        var parts = pair.trim().split(':');
        if (parts.length === 2 && dict[parts[1].trim()]) {
          el.setAttribute(parts[0].trim(), dict[parts[1].trim()]);
        }
      });
    });
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    document.documentElement.setAttribute('lang', lang);
    fetch('js/i18n.json', { cache: 'force-cache' })
      .then(function (r) { return r.json(); })
      .then(function (all) {
        var dict = all[lang] || all[DEFAULT];
        apply(dict);
        document.querySelectorAll('.lang-switcher [data-lang]').forEach(function (b) {
          b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
          b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
        });
      })
      .catch(function () { /* keep PT defaults from HTML */ });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var lang = detectLang();
    setLang(lang);

    document.querySelectorAll('.lang-switcher [data-lang]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var l = b.getAttribute('data-lang');
        setLang(l);
        var url = new URL(location.href);
        url.searchParams.set('lang', l);
        history.replaceState(null, '', url.toString());
      });
    });
  });
})();
