// pwa
// index.js
// sw.js
// manifest.json
// https://www.youtube.com/watch?v=WbbAPfDVqfY

if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/javascripts/sw.js").then(registration => {
        console.log("SW Registered");
        console.log(registration);
    }).catch(error =>{
        console.log("SW Registration Failed");
        console.log(error);
    });
}