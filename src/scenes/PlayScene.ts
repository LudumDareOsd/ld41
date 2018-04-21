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

    this.load.image('background', 'assets/sprites/background.png');
    this.load.image('bluenote', 'assets/sprites/blue_note.png');
    this.load.image('greennote', 'assets/sprites/green_note.png'); 
    this.load.image('rednote', 'assets/sprites/red_note.png');
    this.load.image('yellownote', 'assets/sprites/yellow_note.png');
    this.load.image('obstacle', 'assets/sprites/mushroom.png');

    this.load.image('particle1', 'assets/sprites/particle_1.png');
    this.load.image('particle2', 'assets/sprites/particle_2.png');
    this.load.image('particle3', 'assets/sprites/particle_3.png');
  }

  create() {
    this.add.image(640, 480, 'background');
    
    this.shmup.create();
    this.rythm.create();
  }

  update(time: number, delta: number) {
    this.shmup.update(time, delta);
    this.rythm.update(time, delta);
  }
}

export default PlayScene;