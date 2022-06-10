const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('client message', (msg) => {
        console.log('message: ' + msg);
        //smartAnswer = someFancyLogic(msg)
        //socket.emit('bot message', smartAnswer);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));