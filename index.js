const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Send a message to the client upon connection
    socket.emit('welcome', 'Welcome to the server, your highness!');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    app.get('/', (req, res) => {
        // res.sendFile(__dirname + '/public/index.html');
        socket.emit('response', `Hola Guapo`);// Send a message to the client
        res.send(":D");
    });
});

http.listen(80, () => {
    console.log('Server listening on port 3000');
});