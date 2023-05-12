import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        
    }

    create() {
        this.game.socket.on('tick', this.onServerTick.bind(this));
    }

    onServerTick() {
        console.log(arguments);
    }

    update() {

    }
}