const path = require('path');
const express = require('express');
const { createServer } = require("http");
const compression = require('compression');
const { Server } = require("socket.io");
const GameServer = require('./server');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { serveClient: false });
const gameServer = new GameServer(io, {
    framerate: 1000,
});
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.static('public', {index: false}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use((err, req, res, next) => {
    res.status(500).send('Ooops! Something went wrong.');
});

gameServer.start();

httpServer.listen(PORT, () => {
    console.log(`[server] Running at http://localhost:${PORT}`);
});
