const express = require('express');
const path = require('path');
const fs = require('fs');
const jsmpeg = require('./jsmpeg');
const app = express();
const port = 8081;
const streamFolders = ['hls', 'dash'];

// Set up folder structure
for (let name of streamFolders) {
    let dir = path.join(__dirname, 'streams', name)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

// Serve static files
app.use(express.static(__dirname + '/public'));

// Serve npm scripts
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));

// Serve stream data
app.use('/stream', express.static(path.join(__dirname, 'streams')));

// Serve main page
app.get('/', function(req, res) {
    res.sendFile('./index.html', {root: path.resolve('views')});
});

// Serve DASH page
app.get('/dash', function(req, res) {
    res.sendFile('./dash.html', {root: path.resolve('views')});
});

// Serve HLS page
app.get('/hls', function(req, res) {
    res.sendFile('./hls.html', {root: path.resolve('views')});
});

// Serve JSMPEG page
app.get('/jsmpeg', function(req, res) {
    res.sendFile('./jsmpeg.html', {root: path.resolve('views')});
});

// Start server
app.listen(port, function() {
    console.log('Listening on port ' + port + '...')
});