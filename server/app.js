const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const port = process.env.PORT || 4001;
const index = require('./routes/index');

const app = express();
app.use(index);

const server = http.createServer(app);

const io = new Server(server);