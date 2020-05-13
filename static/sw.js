importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.1/workbox/workbox-sw.js')

// --------------------------------------------------
// Configure
// --------------------------------------------------

// Set workbox config
workbox.setConfig({
  "debug": false
})

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim()

// Skip over the SW waiting lifecycle stage
workbox.core.skipWaiting()

workbox.precaching.cleanupOutdatedCaches()

// --------------------------------------------------
// Precaches
  // Cache Google Fonts with a stale-while-revalidate strategy, with
  // a maximum number of entries.
  workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com' ||
               url.origin === 'https://fonts.gstatic.com' ||
               url.origin === 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap',
    new StaleWhileRevalidate({
      cacheName: 'google-fonts',
      plugins: [
        new ExpirationPlugin({maxEntries: 20}),
      ],
    }),
  );

  workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
    new StaleWhileRevalidate({
      cacheName: 'mdi-icons',
      plugins: [
        new ExpirationPlugin({maxEntries: 20}),
      ],
    }),
  );

  //Css And JS
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'script' ||
                   request.destination === 'style',
    new StaleWhileRevalidate()
  );

  //Images
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new CacheFirst({
      cacheName: 'images',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );
// --------------------------------------------------

// Precache assets

// --------------------------------------------------
// Runtime Caching
// --------------------------------------------------

// Register route handlers for runtimeCaching
workbox.routing.registerRoute(new RegExp('/_nuxt/'), new workbox.strategies.CacheFirst ({}), 'GET')
workbox.routing.registerRoute(new RegExp('/'), new workbox.strategies.NetworkFirst ({}), 'GET')
workbox.routing.registerRoute(new RegExp('https://control-unity-api.herokuapp.com'), new workbox.strategies.NetworkFirst ({}), 'GET')
