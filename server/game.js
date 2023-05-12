const { ArcadePhysics } = require('arcade-physics');

module.exports = class Game {
    constructor(id) {
        this.id = id;
        this.frame = 0;
        this.players = new Map();
        this.state = {};
        this.physics = new ArcadePhysics({
            width: 800,
            height: 600,
        });

        for (let p = 0; p < 10; p ++) {
            const id = `player-${p}`;
            const player = this.physics.add.body(50, 50, 16, 16);

            player.setCollideWorldBounds(true);
            // player.setBounce(1);
            player.setVelocityX(Math.floor(Math.random() * 100));
            player.setVelocityY(Math.floor(Math.random() * 100));

            this.players.set(id, player);
            this.state[id] = {x: 50, y: 50};
        }
    }

    update(framerate) {
        this.frame ++;
        this.physics.world.update(this.frame * 1000, framerate);
    }

    getState() {
        this.players.forEach((player, id) => {
            this.state[id].x = player.position.x;
            this.state[id].y = player.position.y;
            this.state[id].vx = player.velocity.x;
            this.state[id].vy = player.velocity.y;
        });

        return this.state;
    }
}