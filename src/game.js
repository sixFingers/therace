import Phaser from 'phaser';
import { io } from 'socket.io-client';

export default class Game extends Phaser.Game {
    constructor(config) {
        super(config);

        this.server = io({
            transports: ['websocket'],
            autoConnect: false,
            reconnection: false,
        });
    }
}