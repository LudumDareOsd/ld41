import { Shmup } from '../shmup/Shmup';
import { Rythm } from '../rythm/Rythm';

class PlayScene extends Phaser.Scene {
  private shmup = new Shmup(this);
  private rythm = new Rythm(this);
  input: Phaser.Input.InputPlugin;
  particles: any;

  constructor() {
    super({
      key: "PlayScene"
    });
  }

  preload() {
    this.shmup.preload();
    this.rythm.preload();
    
    this.load.image('bluenote', 'assets/sprites/blue_note.png');
    this.load.image('greennote', 'assets/sprites/green_note.png'); 
    this.load.image('rednote', 'assets/sprites/red_note.png');
    this.load.image('yellownote', 'assets/sprites/yellow_note.png');
    this.load.image('obstacle', 'assets/sprites/mushroom.png');
  }

  create() {
    this.particles = this.add.particles('space')
    this.shmup.create();
    this.rythm.create();
  }

  update(time: number, delta: number) {
    this.shmup.update(time, delta);
    this.rythm.update(time, delta);
  }
}

export default PlayScene;