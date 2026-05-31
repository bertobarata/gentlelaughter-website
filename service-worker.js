/**
 * Gentle Laughter — Kill-switch SW
 * Unregisters itself + wipes all caches on every load.
 * Replace with normal SW once browsers are clean.
 */

self.addEventListener('install', (e) => { self.skipWaiting(); });

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.map((n) => caches.delete(n)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate(c.url));
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
