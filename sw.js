const CACHE_NAME = 'quoc-khanh-80-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg',
  'https://icolor.vn/wp-content/uploads/2024/08/co-nuoc-viet-nam-la-gi-e1667528714698.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1n_W-nWxXNPVI-6zjtlSUIf8KwQJdOJ0fyA&s',
  'https://noibo.kiengiang.dcs.vn/uploads/news/2023_08/anh-1.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/0/05/Nhac_quoc_ca_Viet_Nam.ogg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});