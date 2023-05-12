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
            
            const player = this.physics.add.body(40 * p, 50);
            player.setCircle(8);

            player.setCollideWorldBounds(true);
            player.setBounce(1);
            player.setVelocityX(Math.random() * 100);
            player.setVelocityY(Math.random() * 100);

            this.players.set(id, player);
            this.state[id] = {x: 50, y: 50};
        }

        const values = Array.from(this.players.values());

        this.physics.add.collider(values);
    }

    update(framerate) {
        this.frame ++;
        this.physics.world.update(this.frame * 1000, framerate);
        this.physics.world.postUpdate(this.frame * 1000, framerate);
        this.physics.collide(this.players.values());
    }

    getState() {
        this.players.forEach((player, id) => {
            this.state[id].x = player.position.x;
            this.state[id].y = player.position.y;
        });

        return this.state;
    }
}