//function start() {
    const ws = require('ws');
    const http = require('http');
    
    const stream_secret = 12345;
    const stream_port = 8082;
    const websocket_port = 8083;
    const stream_magic_bytes = 'jsmp'; // Must be 4 bytes

    const socketServer = new ws.Server({port: websocket_port});

    let width = 320;
    let height = 240;

    // Send magic bytes and video size to the newly connected socket
    // struct {char magic[4]; unsigned short width; unsigned short height;}
    socketServer.on('connection', function(socket) {
        let streamHeader = new Buffer(8);
        streamHeader.write(stream_magic_bytes);
        streamHeader.writeUInt16BE(width, 4);
        streamHeader.writeUInt16BE(height, 6);
        socket.send(streamHeader, {binary:true});
    
        console.log('New WebSocket Connection (' + socketServer.clients.length + ' total)');
        
        socket.on('close', function(code, message){
            console.log('Disconnected WebSocket (' + socketServer.clients.length + ' total)');
        });
    });
    
    // Stream data to all connected clients
    socketServer.broadcast = function(data, opts) {
        for (let i in this.clients) {
            if (this.clients[i].readyState == 1) {
                this.clients[i].send(data, opts);
            }
            else {
                console.log('Error: Client (' + i + ') not connected.');
            }
        }
    };

    
    // HTTP Server to accept incomming MPEG Stream from ffmpeg
    http.createServer(function(request, response) {
        let params = request.url.substr(1).split('/');
    
        if (params[0] == stream_secret) {
            response.connection.setTimeout(0);
            
            width = (params[1] || width) | 0;
            height = (params[2] || height) | 0;
            
            console.log(
                'Stream Connected: ' + request.socket.remoteAddress + 
                ':' + request.socket.remotePort + ' size: ' + width + 'x' + height
            );
    
            request.on('data', function(data) {
                socketServer.broadcast(data, {binary: true});
            });
        }
        else {
            console.log(
                'Failed Stream Connection: '+ request.socket.remoteAddress + 
                request.socket.remotePort + ' - wrong secret.'
            );
    
            response.end();
        }
    }).listen(stream_port);
    
    console.log('Listening for MPEG Stream on http://127.0.0.1:' + stream_port + '/<secret>/<width>/<height>');
    console.log('Awaiting WebSocket connections on ws://127.0.0.1:' + websocket_port + '/');
//}

//module.exports.start = start;