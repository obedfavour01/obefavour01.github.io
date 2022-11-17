const cacheName = 'v2';

const cacheAssets = [
    'about.html',
    'home.html',
    'contact.html',
    'script.js',
    'style.css  '
]

//"self" here refers to this service worker file itself

//Call install event
self.addEventListener('install',(e)=>{
    console.log("Service Worker : installed");


    e.waitUntil(caches.
        open(cacheName)
        .then((cache) => {
            console.log("Service Worker: Caching Files")
            cache.addAll(cacheAssets);
        }))
        .then(() => self.skipWaiting())
})


//Call activate event
self.addEventListener('activate',(e)=>{
    console.log("Service Worker : Activated")
    //remove unwanted caches

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
                return Promise.all(
                    cacheNames.map((cache) => {
                        if(cache !== cacheName){
                            console.log("Service Worker : clearing Old caches");
                            return caches.delete(cache) ;
                        }
                    }))
        })
    )
}) 


//To show file when we are offline happens in the fetch event

self.addEventListener('fetch',(e) => {
    console.log("Service Worker : fetching")
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})