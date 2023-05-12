const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const compression = require('compression');
const gameServer = require('./server');

const path = require('path');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {serveClient: false});
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.static('public', {index: false}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

gameServer.bind(io);

app.use((err, req, res, next) => {
    res.status(500).send('Ooops! Something went wrong.');
});

httpServer.listen(PORT, () => {
    console.log(`[server] Running at http://localhost:${PORT}`);
});
