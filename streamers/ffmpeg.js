const ffmpeg = require('fluent-ffmpeg')

// Host, port and path to the RTMP stream
const host = ''
const port = ''
const path = ''

function callback() {
    console.log("Stream ended");
}

ffmpeg(host + ':' + port + path, {timeout: 432000}).addOptions([
    '-c:v libx264',
    '-c:a aac',
    '-ac 1',
    '-strict -2',
    '-crf 18',
    '-profile:v baseline',
    '-maxrate 400k',
    '-bufsize 1835k',
    '-pix_fmt yuv420p',
    '-hls_time 2',
    '-hls_list_size 6',
    '-hls_wrap 10',
    '-start_number 1'
  ]).output('streams/hls/stream.m3u8').on('end', callback).run()
