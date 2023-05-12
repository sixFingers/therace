import Phaser from 'phaser';

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene');
    }

    preload() {
        
    }

    create() {
        this.startButton = this.add.text(100, 100, "Start game");
        
        this.startButton.setInteractive();
        this.startButton.on('pointerdown', this.onStartButtonClick, this);
    }

    onStartButtonClick() {
        this.scene.stop();
        this.scene.run("GameScene");
    }

    update() {

    }
}