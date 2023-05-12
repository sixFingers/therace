import * as Phaser from 'phaser';
import { io } from 'socket.io-client';

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

const game = new Phaser.Game(config);
const socket = io({
    transports: ['websocket'],
    reconnection: false,
});

socket.on("disconnect", (reason) => {
    console.log('Disconnected', reason);

  });