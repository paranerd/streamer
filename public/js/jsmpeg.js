const url = 'ws://127.0.0.1:8083/12345';
const canvas = document.getElementById('video-canvas');
const player = new JSMpeg.Player(url, {canvas: canvas, onPause: onPause});

const button = document.getElementById('toggle-playback');
button.addEventListener('click', function() {
    if (player.paused) {
        player.play();
    }
    else {
        player.pause();
    }
});

function onPause(player) {
    console.log(player);
}