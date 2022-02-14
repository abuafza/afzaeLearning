// https://www.youtube.com/watch?v=WbbAPfDVqfY

self.addEventListener("install", e =>{
    // console.log("install!");
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([".","/stylesheets/style.css", "/images/book_512.png"]);
        })
    );
});
self.addEventListener("fetch", e =>{
    // console.log('Intercepting fetch request for: ${e.request.url}');
    e.respondWith(
        caches.match(e.request).then(response =>{
            return response || fetch(e.request);
        })
    );
});

// https://www.youtube.com/watch?v=sFsRylCQblw

// workbox.routing.registerRouter(
//     ({request}) => request.destination === 'image',
//     new workbox.strategies.NetworkFirst()
// );