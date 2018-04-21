import { Shmup } from '../shmup/Shmup';

class PlayScene extends Phaser.Scene {
  shmup = new Shmup(this);
  input: Phaser.Input.InputPlugin;
  cursors: any;

  constructor() {
    super({
      key: "PlayScene"
    });
  }

  preload() {
    this.shmup.preload();
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.shmup.create();
  }

  update(time: number, delta: number) {
    this.shmup.update(time, delta);
  }
}

export default PlayScene;