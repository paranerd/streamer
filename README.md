# Streamer Demos

## Prerequisites
- Install ffmpeg

`$ npm install`

## Get device names
`$ ffmpeg -list_devices true -f dshow -i dummy`

## Start stream
Run any of the following commands to start streaming in the respective format.

- MPEG-DASH:
  `$ ffmpeg -f dshow -i video="<camera-name>":audio="<microphone-name>" -c:v libx264 -s 480x320 -crf 22 -map 0:0 -c:a aac -map 0:1 -flags +global_header -remove_at_exit 1 -f dash -window_size 5 -extra_window_size 5 streams/dash/manifest.mpd`

- HLS:
  `$ ffmpeg -f dshow -i video="<camera-name>":audio="<microphone-name>" -preset ultrafast -tune zerolatency -c:a aac -b:a 128k -ac 2 -y -s 480x320 -c:v libx264 -b:v 2014k -strict experimental -force_key_frames "expr:gte(t,n_forced*2)" -hls_time 2 -hls_list_size 10 -start_number 1 streams/hls/stream.m3u8`

- JSMPEG:
  `$ ffmpeg -f dshow -i video="<camera-name>":audio="<microphone-name>" -f mpegts -codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 -codec:a mp2 -b:a 128k -muxdelay 0.001 http://localhost:8082/12345`

## Start server
Run

`$ npm start`

and navigate to: [http://localhost:8081](http://localhost:8081).

To stream JSMPEG you also need to run `node streamers/jsmpeg.js`

Select a format and enjoy the stream!

## Experimental
`node streamers/ffmpeg.js`