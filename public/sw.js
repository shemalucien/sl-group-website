const CACHE_NAME = "sl-group-cache-v1"

// Add list of files to cache here.
const urlsToCache = ["/", "/offline", "/icons/icon-192x192.png", "/icons/icon-512x512.png", "/images/logo.png"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }
      return fetch(event.request)
        .then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            // Don't cache if it's an API request
            if (!event.request.url.includes("/api/")) {
              cache.put(event.request, responseToCache)
            }
          })

          return response
        })
        .catch(() => {
          // If the request is for a page, show the offline page
          if (event.request.destination === "document") {
            return caches.match("/offline")
          }
        })
    }),
  )
})

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})
