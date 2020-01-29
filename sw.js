//adapted from https://codelabs.developers.google.com/codelabs/your-first-pwapp/ by Google Developers accessed 13.11.2019
//Service Worker is in the root directory of the project so everything is in scope

const version = 35;

const CACHE_NAME = 'static-cache-v32';
const FILES_TO_CACHE = [
	'index.html',
	'images/favicon.png',
	'images/logo_192x192.png',
	'images/logo_512x512.png',
	'app.js',
	'dataConverter.js',
	'dataSource.js',
	'graph.js',
	'graphCreator.js',
	'simple_classes.js',
	'customButtonStyling.css'
];

//listen to install event
self.addEventListener('install', function (event) {
	console.log('SW v%s installed at', version, new Date().toLocaleTimeString());
	event.waitUntil(
		// caches open returns a promise<cache>
		// when the promise is returned all files from FILES_TO_CACHE are added to the cache
		caches.open(CACHE_NAME).then((cache) => {
			console.log('[ServiceWorker] Pre-caching files');
			return cache.addAll(FILES_TO_CACHE);
		})
	);
});

self.addEventListener('activate', function (event) {
	console.log('SW v%s activated at', version, new Date().toLocaleTimeString());
	// CODELAB: Remove previous cached data from disk.
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(keyList.map((key) => {
				if (key !== CACHE_NAME) {
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function (evt) {
	evt.respondWith(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.match(evt.request)
				.then((response) => {
					return response || fetch(evt.request);
				});
		})
	);
});
//end of https://codelabs.developers.google.com/codelabs/your-first-pwapp/