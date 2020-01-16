//Service Worker is in the root directory of the project so everything is in scope

//Service worker basics from pluralsight course
const version = 23;

//https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4 by Google Developers accessed 13.11.2019
const CACHE_NAME = 'static-cache-v20';
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
	'graphTrace.js',
	'customButtonStyling.css'
];
//end of https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4

//listen to install event
self.addEventListener('install', function (event) {
	console.log('SW v%s installed at', version, new Date().toLocaleTimeString());
	//when the old version of the service worker is still in use, we skip waiting for it and force it out
	self.skipWaiting();
	//adapted from https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4 by Google Developers accessed 13.11.2019
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('[ServiceWorker] Pre-caching files');
			return cache.addAll(FILES_TO_CACHE);
		})
	);
	//end of  https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4
});

self.addEventListener('activate', function (event) {
	console.log('SW v%s activated at', version, new Date().toLocaleTimeString());
	//https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4 by Google Developers accessed 13.11.2019
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
		//end of https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4
	);
});

self.addEventListener('fetch', function (evt) {
	//https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4 by Google Developers accessed 13.11.2019
	evt.respondWith(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.match(evt.request)
				.then((response) => {
					return response || fetch(evt.request);
				});
		})
	);
	//end of https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4

});