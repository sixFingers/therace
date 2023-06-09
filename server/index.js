const Game = require('./game');

const defaults = {
    framerate: 1000 / 60,
    tickrate: 1000 / 10,
}

module.exports = class GameServer {
    server = null;
    games = null;
    interval = null;

    constructor(server, config) {
        this.server = server;
        this.games = new Map();
        
        config = {...defaults, ...config};

        this.framerate = config.framerate;
        this.tickrate = config.tickrate;
    }

    start() {
        this.server.on('connect', this.onSocketConnect.bind(this));
        
        setInterval(this.update.bind(this), this.framerate);
        setInterval(this.tick.bind(this), this.tickrate);
    }

    stop() {
        this.server.disconnectSockets();
    }

    onSocketConnect(socket) {
        const [gameId] = socket.rooms;
        
        this.games.set(gameId, new Game(gameId));
    
        console.log(`[server] Game ${gameId} created.`);
        
        socket.on('disconnecting', this.onSocketDisconnecting.bind(this, socket));
    }

    onSocketDisconnecting(socket) {
        const [gameId] = socket.rooms;
    
        this.games.delete(gameId);
    
        console.log(`[server] Game ${gameId} destroyed.`);
    }

    update() {
        this.games.forEach((game) => {
            game.update(this.framerate);
        });
    }

    tick() {
        this.games.forEach((game) => {
            this.server.to(game.id).emit('tick', game.getState());
        });
    }
}