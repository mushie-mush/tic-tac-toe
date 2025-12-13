const OFFLINE_VERSION = 3;
const CACHE_NAME = "offline";
const OFFLINE_URL = ["/", "/index.html", "/static/js/bundle.js", "/offline.html", "/manifest.json"];
const DB_VERSION = 1

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("tic-tac-toe", DB_VERSION)
        request.onsuccess = (event) => {
            resolve(event.target.result)
        }
        request.onerror = (event) => {
            reject(event)
        }
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore("savedrequests", { keyPath: "timestamp" })
            console.log("onupgradeneeded")
        }
    })
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(OFFLINE_URL);
        })()
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            if ("navigationPreload" in self.registration) {
                await self.registration.navigationPreload.enable();
            }
        })()
    );

    self.clients.claim();
});

self.addEventListener('message', async (event) => {
    console.log('event', event)
    if (event.data && event.data.type === '123') {
        if (navigator.onLine) {
            const db = await openDB()
            const objectStore = db.transaction('savedrequests', 'readwrite').objectStore('savedrequests')
            const request = objectStore.openCursor()

            request.onsuccess = async (event) => {
                if (event.target.result) {
                    const result = event.target.result
                    console.log(result.value)

                    fetch(result.value.url, {
                        method: result.value.method,
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(result.value.body)
                    })

                    const request1 = objectStore.delete(result.key)

                    // const request = result.delete()
                    request1.onsuccess = () => {
                        console.log("deleted")
                    }
                    request1.onerror = (error) => {
                        console.error(error)
                    }
                    result.continue()
                }
            }
        }
    }
});

self.addEventListener("fetch", async (event) => {

    // if (event.request.url === "http://127.0.0.1:5000/games/save") {
    //     const db = await openDB()
    //     const body = await event.request.clone().json()
    //     const objectStore = db.transaction('savedrequests', 'readwrite').objectStore('savedrequests')
    //     console.log('objectStore', objectStore)
    //     objectStore.add({ timestamp: Date.now(), method: event.request.method, url: event.request.url, body: body })
    // }

    // Are we offline? If so,
    // Return an empty response

    console.log(event.request)
    // const body = await event.request.clone().json()
    // if (event.request.mode === "navigate") {
    if (event.request.method === "POST") {
        event.respondWith(
            (async () => {
                let body
                try {

                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }
                    body = await event.request.clone()
                    body = await body.json()

                    console.log("body:", body)

                    const networkResponse = await fetch(event.request);
                    return networkResponse;
                } catch (error) {
                    if (event.request.url === "http://127.0.0.1:5000/games/save") {
                        const db = await openDB()
                        // const body = await event.request.clone().json()
                        const objectStore = db.transaction('savedrequests', 'readwrite').objectStore('savedrequests')
                        console.log('objectStore', objectStore)
                        objectStore.add({ timestamp: Date.now(), method: event.request.method, url: event.request.url, body: body })
                        return new Response(JSON.stringify({
                            gameId: 0
                        }))
                    }

                    console.log("Fetch failed; returning offline page instead.", error);

                    // const cache = await caches.open(CACHE_NAME);
                    // const cachedResponse = await cache.match("/offline.html");
                    return;
                }
            })()
        );
    }
});


navigator.connection.onchange = async () => {
    console.log(navigator.onLine)

    if (navigator.onLine) {
        const db = await openDB()
        const objectStore = db.transaction('savedrequests', 'readwrite').objectStore('savedrequests')
        const request = objectStore.openCursor()

        request.onsuccess = async (event) => {
            if (event.target.result) {
                const result = event.target.result
                console.log(result.value)

                fetch(result.value.url, {
                    method: result.value.method,
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(result.value.body)
                })

                const request1 = objectStore.delete(result.key)

                // const request = result.delete()
                request1.onsuccess = () => {
                    console.log("deleted")
                }
                request1.onerror = (error) => {
                    console.error(error)
                }
                result.continue()
            }
        }
    }
}
