import * as Phaser from 'phaser';

function preload() {
    this.load.image('star', '/img/star.png');
};

function create() {
    this.add.image(400, 300, 'star');
};

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    },
};

var game = new Phaser.Game(config);