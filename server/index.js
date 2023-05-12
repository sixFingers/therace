const games = new Map();

const onSocketConnect = (socket) => {
    const [gameId] = socket.rooms;
    
    games.set(gameId, {
        players: {},
    });

    console.log(`[server] Game ${gameId} created.`);
    
    socket.on('disconnecting', onSocketDisconnecting.bind(null, socket));
}

const onSocketDisconnecting = (socket) => {
    const [gameId] = socket.rooms;

    games.delete(gameId);

    console.log(`[server] Game ${gameId} destroyed.`);
}

const bind = (io) => {
    io.on('connect', onSocketConnect);
};

module.exports = { bind };