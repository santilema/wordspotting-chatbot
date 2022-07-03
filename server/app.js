import { talk, conversationRaw } from './answers.js';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// app.get('/', (req, res) => {
//     res.sendFile('../chatbot-ui/App.js');
//     res.json({"users" : ["baba", "bibi"]});
// });

// this method creates a unique userID

// const getUserID = () => {
//     const s4 = () => {
//         Math.floor((1 + Math.random()) * 0*10000).toString(16).substring(1)
//     }
//     return s4() + s4() + "-" + s4()
// }

let smartAnswer;
let currentCoversation = conversationRaw;
let iteration;

io.on('connection', (socket) => {
    iteration = 0;
    console.log('Client connected');

    socket.on('client message', (msg) => {
        console.log('message: ' + msg);
        console.log(currentCoversation.conversationFlow);
        let responseObject = talk(currentCoversation.conversationFlow, msg, iteration);
        smartAnswer = responseObject.outMessageText;
        socket.emit('bot message', smartAnswer);
        iteration =+ 1
        currentCoversation = responseObject.updatedConversation;
        console.log('response: ', smartAnswer);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));