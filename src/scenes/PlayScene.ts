import { Shmup } from '../shmup/Shmup';
import { Rythm } from '../rythm/Rythm';
import { Communicator } from '../shmup/Communicator';

class PlayScene extends Phaser.Scene {
  private communicator = new Communicator();
  private shmup = new Shmup(this, this.communicator);
  private rythm = new Rythm(this, this.communicator);
  input: Phaser.Input.InputPlugin;

  constructor() {
    super({
      key: "PlayScene"
    });
  }

  preload() {
    this.rythm.preload();
    this.shmup.preload();
  }

  create() {

    this.communicator.rythm = this.rythm;
    this.communicator.shmup = this.shmup;

    let background = this.add.image(0, 0, 'background');
    background.setOrigin(0, 0);
    background.setDepth(2);
    let foreGround = this.add.image(0, 0, 'foreground');
    foreGround.setOrigin(0, 0);
    foreGround.setDepth(5)
    
    this.shmup.create();
    this.rythm.create();
  }

  update(time: number, delta: number) {
    this.shmup.update(time, delta);
    this.rythm.update(time, delta);
  }
}

export default PlayScene;