import Phaser from 'phaser';

import LoadingScene from './scene-loading';
import GameScene from './scene-game';
import Game from './game';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [LoadingScene, GameScene],
};

const game = new Game(config);