module.exports = class Game {
    constructor(id) {
        this.id = id;
        this.players = {};

        for (let p = 0; p < 10; p ++) {
            const id = `player-${p}`;

            this.players[id] = {
                x: 0,
                y: 0,
            };
        }
    }

    update() {
        for (const id in this.players) {
            this.players[id].x += 5;
            this.players[id].y += 5;
        }
    }

    getState() {
        return this.players;
    }
}