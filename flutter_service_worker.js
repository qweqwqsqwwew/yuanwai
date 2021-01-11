'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "89aaaf1a4ff74e7b459a003cd2668789",
"index.html": "d8739a399f4104168d25f3e8858d8239",
"/": "d8739a399f4104168d25f3e8858d8239",
"main.dart.js": "f54cbf41dae24e5c8e78a45b4e3708c0",
"assets/asset/images/home/home_man.png": "801f4556c7e334cc5f27de8d67847bdf",
"assets/asset/images/home/home_dingwei.png": "1f5eeeaff4b2a6e02d2f1c88c349fcd0",
"assets/asset/images/home/zanwushuju.png": "4df3a836a4d61c68c96db624b2093773",
"assets/asset/images/home/home_women.png": "8a673bc74cd882c3eecdab766ff13ea3",
"assets/asset/images/home/home_zhanwei.png": "3e0555cdffdcce1cc9b4e9b837971a81",
"assets/asset/images/home/home_ji.png": "58d69c67c0f81a5a48d642fdd5e2507e",
"assets/asset/images/mine/peixunkecheng.png": "62775141d92e4616d6c7c3293f550182",
"assets/asset/images/mine/star_kong.png": "a42bc9b34d0a4fad79d57cd51353eecd",
"assets/asset/images/mine/fuwuduixiang.png": "5bd0e51602a9cbc2648de9a8c691c345",
"assets/asset/images/mine/lianxikefu.png": "12773068fd580a8ddb3ff8d69948a719",
"assets/asset/images/mine/laotou.png": "425c9a91e7d7c3092285cb7de81e07a0",
"assets/asset/images/mine/shezhi.png": "f1a9f0b6571009b8d62f8d4ad83a3b7d",
"assets/asset/images/mine/star_man.png": "201728f72cd27b58d2a6aabf508fa437",
"assets/asset/images/mine/man.png": "66adedd71335eaef9a17cd186fb79212",
"assets/asset/images/mine/yonghubangzhu.png": "5f8046510f19da8253b3a03990c207f1",
"assets/asset/images/mine/mine_renxiang.png": "953fdbe15b285be62efc02940fdef8a6",
"assets/asset/images/mine/yonghuxieyi.png": "7d15df543b4e0a40065483064c244f27",
"assets/asset/images/mine/LoginHeader.png": "2a735eea2da34ee28857e7c971353496",
"assets/asset/images/mine/yinsizhengce.png": "d8885c9231295984de4719f577f45c84",
"assets/asset/images/mine/arrowyou.png": "a6fc11b0b11866fba9328f95207ee89b",
"assets/asset/images/updateVersion/header/up_header.png": "79b422739c5345d6c00a6d6060c4e8ce",
"assets/asset/images/updateVersion/header/1.5x/up_header.png": "28148ff0f3cda8f70ac285269c6dfcfa",
"assets/asset/images/updateVersion/header/3.0x/up_header.png": "434c5e37ec702b08608f4b1801421389",
"assets/asset/images/updateVersion/header/4.0x/up_header.png": "50d40058d6940ddf89aeec78a695a3e1",
"assets/asset/images/updateVersion/header/1.0x/up_header.png": "01bc9a8f4585f866933e89c45dae3eb1",
"assets/asset/images/updateVersion/header/2x/up_header.png": "79b422739c5345d6c00a6d6060c4e8ce",
"assets/asset/images/login/icon_display.png": "e429804ee2fb0307a40a119fd905fb2b",
"assets/asset/images/login/icon_hide.png": "a15c6b3b60e05f5f7ba2580d436b3df9",
"assets/asset/images/login/icon_delete.png": "dc3b2c85713bb317b8673c80067c2a12",
"assets/asset/files/chinese_cities.json": "ee7ff73180653e2b8ad2f888938f97bd",
"assets/asset/fonts/EyeIcon.ttf": "344e44c2596b0ca6bc11c90f355d8d6a",
"assets/AssetManifest.json": "c733027a6108a7b10b0b287d8c582fd9",
"assets/NOTICES": "03104d3e22686412c47a9ad54a36955f",
"assets/FontManifest.json": "69e5b8bdd1b32f92e09daa7246870547",
"assets/packages/fluttertoast/assets/toastify.js": "8f5ac78dd0b9b5c9959ea1ade77f68ae",
"assets/packages/fluttertoast/assets/toastify.css": "8beb4c67569fb90146861e66d94163d7",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
