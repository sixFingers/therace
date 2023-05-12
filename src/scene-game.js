import Phaser from 'phaser';

const lerp = (a, b, t) => a * (1 - t) + b * t;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('player', 'img/player.png');
    }

    create() {
        this.players = new Map();
        this.ghosts = new Map();
        this.state = new Map();
        this.previousFrameTime = this.game.getTime();
        this.frameTime = this.game.getTime();

        this.physics.world.setBounds(0, 0, 800, 600);

        for (let p = 0; p < 10; p ++) {
            const id = `player-${p}`;

            const player = this.physics.add.sprite(50, 50, 'player');
            // const ghost = this.add.image(50, 50, 'player').setTint(0xFF0000);
            
            // player.setBounce(1);
            player.setCollideWorldBounds(true);

            this.players.set(id, player);
            // this.ghosts.set(id, ghost);
            this.state.set(id, {
                x: 50,
                y: 50,
                px: 50,
                py: 50,
            });
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
        this.previousFrameTime = this.frameTime;
        this.frameTime = this.game.getTime();

        for (const playerId in state) {
            const player = this.players.get(playerId);
            const ghost = this.ghosts.get(playerId);
            const newPlayerState = state[playerId];
            const playerState = this.state.get(playerId);    

            if (! player) {
                continue;
            }

            playerState.px = playerState.x;
            playerState.py = playerState.y;
            playerState.x = newPlayerState.x;
            playerState.y = newPlayerState.y;
        }
    }

    update() {
        const elapsedTime = this.game.getTime() - this.frameTime;
        const frameTime = this.frameTime - this.previousFrameTime;
        const t = Math.min(1, Math.max(0, elapsedTime / frameTime));

        this.players.forEach((player, playerId) => {
            const playerState = this.state.get(playerId);

            player.setPosition(
                lerp(playerState.px, playerState.x, t),
                lerp(playerState.py, playerState.y, t)
            );
        });
    }
}