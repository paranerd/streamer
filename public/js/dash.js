(function() {
    const url = "http://localhost:8081/stream/dash/manifest.mpd";
    const player = dashjs.MediaPlayer().create();
    player.initialize(document.querySelector("#video-player"), url, true);
})();