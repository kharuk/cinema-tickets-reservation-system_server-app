const express = require('express');
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server); 
module.exports = {io, app, server};