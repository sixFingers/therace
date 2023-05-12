import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    players = null;

    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('player', 'img/player.png');
    }

    create() {
        this.players = new Map();
        this.ghosts = new Map();

        for (let p = 0; p < 10; p ++) {
            const id = `player-${p}`;

            const player = this.physics.add.sprite(0, 0, 'player');
            const ghost = this.add.image(0, 0, 'player').setTint(0xFF0000);

            this.players.set(id, player);
            this.ghosts.set(id, ghost);
        }

        this.game.server.on('connect', this.onServerConnect.bind(this));
        this.game.server.on("disconnect", this.onServerDisconnect.bind(this));
        
        this.game.server.connect();
    }

    onServerConnect() {
        this.game.server.on('tick', this.onServerTick.bind(this));
    }

    onServerDisconnect() {
        
    }

    onServerTick(state) {
        for (const playerId in state) {
            const player = this.players.get(playerId);
            const ghost = this.ghosts.get(playerId);
            const playerState = state[playerId];

            if (! player) {
                continue;
            }

            ghost.setPosition(playerState.x, playerState.y);
        }

        console.log(state);
    }

    update() {
        this.players.forEach((player, id) => {
            const ghost = this.ghosts.get(id);

            player.body.setVelocityX((ghost.x - player.x));
            player.body.setVelocityY((ghost.y - player.y));
        });
    }
}