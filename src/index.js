// importing the express package to serve the express application
const express = require('express');
// importing a websocket to initiate real time server-client interaction
const socketio = require('socket.io');

// import the dotenv package to hide some important links
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const http = require('http');

// declaring variable PORT to store
// the port number to serve in the browser
const PORT = process.env.PORT || 2020;

// setting up an instance of express and
// stored in the variable name app
const app = express();
// create an basic server using the http
const server = http.createServer(app);

// setting up instance of socketio with server.
const io = socketio(server);

// using the express in order for it to be able to
// recieve request in JSON format from the server
app.use(express.json());

// serving up public directory using the express
app.use(express.static(path.join(__dirname, '../public')));

// intialize count
let count = 0;

// server emit (countUpdated) -> client recieve
// client emit (increment) -> server recieve

// websocket io serving on the connection route
io.on('connection', socket => {
  console.log('New WebSocket connection');

  socket.emit('countUpdated', count);

  socket.on('increment', () => {
    count++;

    io.emit('countUpdated', count);
    // socket.emit('countUpdated', count);
  });
});

// the instance app listen to the PORT to serve in the browser
server.listen(PORT, () => {
  console.log(`The express is running on PORT ${PORT}`);
});
