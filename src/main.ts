import 'phaser';

import PlayScene from './scenes/PlayScene';

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
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: [
    PlayScene
  ]
};

new Phaser.Game(config);
