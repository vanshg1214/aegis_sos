const CACHE_NAME = 'aegis-v6';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install Event - Pre-cache app shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching App Shell Assets (v6)');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Force active state immediately
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing Old Cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Claim control of active clients
  self.clients.claim();
});

// Fetch Event - Network first fall back to Cache, or Cache first for static assets
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // For external target sites inside the iframe, bypass caching (always network)
  if (requestUrl.origin !== self.location.origin) {
    return; // Let browser handle it normally
  }

  // Network First strategy for React development compatibility
  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      if (networkResponse.status === 200 && event.request.method === 'GET') {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
      }
      return networkResponse;
    }).catch(() => {
      // Fallback to cache if completely offline
      return caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      });
    })
  );
});
