const cacheName = 'v1';



//"self" here refers to this service worker file itself

//Call install event
self.addEventListener('install',(e)=>{
    console.log("Service Worker : installed");
 
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
        fetch(e.request)
        .then(res => { 
            //MAke a copy/clone of response from the server

            const resClone = res.clone();
            //Open Cache
            caches
            .open(cacheName)
            .then((cache) => {
                //Add response to cache
                cache.put(e.request,resClone)
            })
            return res;
        }).catch(err => caches.match(e.request)
        .then(res => res))
    )
})