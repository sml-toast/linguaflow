const CACHE_NAME = 'linguaflow-v1';
const BASE_URL = '/linguaflow';
const urlsToCache = [
  BASE_URL + '/',
  BASE_URL + '/index.html',
];

// 安装事件 - 缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 获取事件 - 缓存优先策略
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // 只缓存同源请求
  if (url.origin !== self.location.origin) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果找到缓存，返回缓存的响应
        if (response) {
          return response;
        }
        // 否则发起网络请求
        return fetch(event.request)
          .then((response) => {
            // 检查是否是有效的响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // 克隆响应以便缓存
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
      .catch(() => {
        // 离线时返回离线页面
        if (event.request.mode === 'navigate') {
          return caches.match(BASE_URL + '/index.html');
        }
      })
  );
});

// 后台同步事件
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  }
});

async function syncProgress() {
  // 同步学习进度
  console.log('Syncing progress...');
}
