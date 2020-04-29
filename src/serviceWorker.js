importScripts("workbox-v5.1.3/workbox-sw.js")

workbox.setConfig({modulePathPrefix: 'workbox-v5.1.3/'})

const precacheManifest = [[{}],[{}]];

// workbox.routing.registerRoute('https://fonts.googleapis.com/css?family=Roboto&display=swap', new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'my-cache-name2'
// }))

workbox.routing.registerRoute(/.*(?:googleapis|gstatic)\.com.*$/, new workbox.strategies.CacheFirst({
    cacheName: 'my-cache-name'
}))


workbox.precaching.precacheAndRoute(precacheManifest);