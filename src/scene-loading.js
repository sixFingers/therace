import Phaser from 'phaser';

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene');
    }

    preload() {
        this.load.image('star', '/img/star.png');
    }

    create() {
        this.startButton = this.add.text(100, 100, "Start game").setInteractive();
        
        this.startButton.on('pointerdown', this.onStartButtonClick, this);
        this.game.socket.on('connect', this.onSocketConnect.bind(this));
    }

    onStartButtonClick() {
        this.game.socket.connect();
    }

    onSocketConnect() {
        this.game.socket.off('connect');
        this.game.scene.switch(this, "GameScene")
    }

    update() {

    }
}