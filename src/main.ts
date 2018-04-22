import 'phaser';

import PlayScene from './scenes/PlayScene';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';

const config: GameConfig = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 1280,
  height: 960,
  resolution: 1,
  backgroundColor: "#000",
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  },
  scene: [
    BootScene,
    TitleScene,
    PlayScene
  ]
};

new Phaser.Game(config);