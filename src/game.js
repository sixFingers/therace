import Phaser from 'phaser';
import { io } from 'socket.io-client';

export default class Game extends Phaser.Game {
    constructor(config) {
        super(config);

        this.socket = io({
            transports: ['websocket'],
            autoConnect: false,
            reconnection: false,
        });
        
        this.socket.on("disconnect", (reason) => {
            console.log('Disconnected', reason);
            
        });
    }
}