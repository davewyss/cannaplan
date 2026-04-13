const CACHE_NAME = 'cannaplan-v1';
const SHELL = ['/', '/index.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only intercept same-origin navigation requests (page loads).
  // Everything else — CDN scripts, API calls, images — passes through natively.
  const { request } = event;
  if (request.mode !== 'navigate') return;

  event.respondWith(
    fetch(request).catch(() => caches.match('/index.html'))
  );
});
