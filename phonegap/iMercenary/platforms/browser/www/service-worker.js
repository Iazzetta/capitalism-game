if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function() {
    // Success
    console.log("Success")
  }).catch(function() {
    // Fail :(
    console.log("Fail :(")
  });
}
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('service-worker-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/app.css',
        '/js/themes/cannabis.js',
        '/js/themes/fruit.js',
        '/js/app.js',
        '/img/cash.png',
        '/img/truck.png',
        '/img/cannabis/hindu_kush.jpg',
        '/img/cannabis/purple_bud_automatic.jpg',
        '/img/cannabis/purple_bud.jpg',
        '/img/cannabis/sativa_mexicana.jpg',
        '/img/cannabis/sensi_skunk.jpg',
        '/img/cannabis/skunk_1.jpg',
        '/img/cannabis/white_skunk_automatic.jpg',
        '/img/cannabis/white_skunk.jpg',
        '/img/cannabis/white_widow.jpg',
        '/img/fruit/banana.png',
        '/img/fruit/blueberry.png',
        '/img/fruit/cebola.png',
        '/img/fruit/cenoura.png',
        '/img/fruit/cogumelo.png',
        '/img/fruit/limao.png',
        '/img/fruit/pera.png',
        '/img/fruit/tomate.png',
        '/img/icons/16x16.png',
        '/img/icons/192x192.png'
      ]);
    })
  );
});