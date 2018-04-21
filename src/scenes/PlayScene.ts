import { Shmup } from '../shmup/Shmup';

class PlayScene extends Phaser.Scene {
  shmup = new Shmup(this);

  constructor() {
    super({
      key: "PlayScene"
    });
  }

  preload() {
    this.shmup.preload();
    this.load.image('obstacle', 'assets/sprites/mushroom.png');
  }

  create() {
    this.shmup.create();
  }

  update(time: number, delta: number) {
    this.shmup.update(time, delta);
  }
}

export default PlayScene;