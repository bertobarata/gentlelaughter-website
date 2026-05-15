/**
 * Gentle Laughter — Service Worker
 * Cache-first for static, network-first for HTML.
 * Bump CACHE_NAME when shipping changes that touch precached assets.
 */

const CACHE_NAME = 'gl-cache-v26';
const RUNTIME_CACHE = 'gl-runtime-v26';

const PRECACHE_ASSETS = [
  './',
  'index.html',
  'sobre.html',
  'casos.html',
  'css/styles.css?v=26',
  'js/site.js',
  'js/cookie-consent.js',
  'manifest.json',
  'assets/logos/WhatsApp_Image_2026-04-30_at_12.31.01-removebg-previewfinal.png',
  'assets/hero-background.webp',
  'assets/fonts/switzer-400.woff2',
  'assets/fonts/switzer-500.woff2',
  'assets/fonts/gambarino-400.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((n) => n !== CACHE_NAME && n !== RUNTIME_CACHE)
          .map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== location.origin) return;
  if (request.method !== 'GET') return;

  // Never cache MP4s — they're heavy and would inflate user storage.
  if (url.pathname.endsWith('.mp4')) return;

  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('index.html')))
    );
    return;
  }

  if (['style', 'script', 'image', 'font'].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') return response;
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  event.respondWith(fetch(request).catch(() => caches.match(request)));
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
