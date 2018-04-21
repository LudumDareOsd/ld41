import { Shmup } from '../shmup/Shmup';
import { Rythm } from '../rythm/Rythm';

class PlayScene extends Phaser.Scene {
  private shmup = new Shmup(this);
  private rythm = new Rythm(this);
  input: Phaser.Input.InputPlugin;

  constructor() {
    super({
      key: "PlayScene"
    });
  }

  preload() {
    this.rythm.preload();
    this.shmup.preload();

    this.load.image('background', 'assets/sprites/funk_background_bottom.png');
    this.load.image('foreground', 'assets/sprites/funk_background_top.png');
    this.load.image('bluenote', 'assets/sprites/blue_note.png');
    this.load.image('greennote', 'assets/sprites/green_note.png'); 
    this.load.image('rednote', 'assets/sprites/red_note.png');
    this.load.image('yellownote', 'assets/sprites/yellow_note.png');
    this.load.image('asteroid', 'assets/sprites/mushroom.png');

    this.load.image('bluefunk', 'assets/sprites/blue_funk.png');
    this.load.image('greenfunk', 'assets/sprites/green_funk.png');
    this.load.image('redfunk', 'assets/sprites/red_funk.png');
    this.load.image('yellowfunk', 'assets/sprites/yellow_funk.png');

    this.load.image('particle1', 'assets/sprites/particle_1.png');
    this.load.image('particle2', 'assets/sprites/particle_2.png');
    this.load.image('particle3', 'assets/sprites/particle_3.png');
  }

  create() {
    let background = this.add.image(0, 0, 'background');
    background.setOrigin(0, 0);
    background.setDepth(2);
    let foreGround = this.add.image(0, 0, 'foreground');
    foreGround.setOrigin(0, 0);
    foreGround.setDepth(4)
    

    this.shmup.create();
    this.rythm.create();
  }

  update(time: number, delta: number) {
    this.shmup.update(time, delta);
    this.rythm.update(time, delta);
  }
}

export default PlayScene;