//Service Worker is in the root directory of the project so everything is in scope

//Service worker basics from pluralsight course
const version = 4;

//https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4 by Google Developers accessed 13.11.2019
const CACHE_NAME = 'static-cache-v1';
const FILES_TO_CACHE = [
	'myDataMixer/offline.html',
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
			console.log('[ServiceWorker] Pre-caching offline page');
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

self.addEventListener('fetch', function (event) {
	//https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4 by Google Developers accessed 13.11.2019

	// CODELAB: Add fetch event handler here.
	if (event.request.mode !== 'navigate') {
		// Not a page navigation, bail.
		return;
	}
	event.respondWith(
		fetch(event.request)
		.catch(() => {
			return caches.open(CACHE_NAME)
				.then((cache) => {
					return cache.match('offline.html');
				});
		})
	);
	//end of https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4

});