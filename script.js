if(navigator.serviceWorker){
    console.log("Service worker supported")
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register("service_cachedsite.js")
        .then((reg) => {
            console.log("Service Worker Registered")
        })
        .catch((err) => console.log("Service Worker Error : " + err.message))
    })
}