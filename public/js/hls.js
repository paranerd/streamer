if (Hls.isSupported()) {
    let video = document.getElementById('video');
    let hls = new Hls();
    
    // Bind them together
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        console.log("Video and hls.js are now bound together!");

        hls.loadSource("http://localhost:8081/stream/hls/stream.m3u8");

        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            console.log("Manifest loaded, found " + data.levels.length + " quality level");
        });
    });
}