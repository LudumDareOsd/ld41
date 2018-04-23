import 'phaser';

import PlayScene from './scenes/PlayScene';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import GameOverScene from './scenes/GameOverScene';
import WinScene from './scenes/WinScene';
import InstructionScene from './scenes/InstructionScene';

class PrePreload extends Phaser.Scene { // haHAA
  constructor() {
    super({
      key: 'PrePreload'
    });
  }
  preload() {
    this.load.image('loading_screen', 'assets/sprites/loading_screen.png');
  }
  create() {
    this.scene.start('BootScene');
  }
}

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
    PrePreload,
    BootScene,
    TitleScene,
    PlayScene,
    GameOverScene,
    WinScene,
    InstructionScene
  ]
};

new Phaser.Game(config);