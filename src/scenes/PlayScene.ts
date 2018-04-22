import { Shmup } from '../shmup/Shmup';
import { Rythm } from '../rythm/Rythm';
import { Communicator } from '../shmup/Communicator';

class PlayScene extends Phaser.Scene {
  private communicator = new Communicator();
  private shmup = new Shmup(this, this.communicator, this.scene);
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
    foreGround.setDepth(5);
    
    this.shmup.create();
    this.rythm.create();

    this.shmup.gameOver = false;
    let scene = this.scene as any;
    scene.gameOver = false;
  }

  update(time: number, delta: number) {
    let scene = this.scene as any;
    this.shmup.update(time, delta);
    this.rythm.update(time, delta, this.scene);
    if (this.shmup.gameOver || scene.gameOver) {

      this.SaveScore(this.communicator.getScore());

      this.rythm.KillMe();
      this.scene.start('GameOverScene');
    }
  }

  private SaveScore(score) {
    var savedScore = localStorage.getItem('FunkEscapeScore');

    window.localStorage.setItem('FunkEscapeCurrentScore', score);

    if(savedScore === null) {
      window.localStorage.setItem('FunkEscapeScore', score);
    } else {
      if(savedScore < score) {
        window.localStorage.setItem('FunkEscapeScore', score);
      }
    }
    
  }
}

export default PlayScene;