const CACHE_NAME = "v1"
const urlsToCache = ['index.html', 'offline.html']
// const self = this

// install service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache: ', cache)
                return cache.addAll(urlsToCache)
            })
    )
})

// listen for requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(_ => fetch(event.request)
                // if fetch request doesn't go through, there's no connection.
                // then load 'offline.html'
                .catch(_ => caches.match('offline.html'))
            )
    )
})

// activate service worker
self.addEventListener('activate', event => {
    const cacheWhitelist = []
    cacheWhitelist.push(CACHE_NAME)

    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames.map(cacheName => {
                    // delete all caches not in the whitelist
                    if (!cacheWhitelist.includes(cacheName)) return caches.delete(cacheName)
                })
            ))
    )
})