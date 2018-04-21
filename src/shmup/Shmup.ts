import { GameMap } from './GameMap';
import { Obstacle } from './Obstacle';

export class Shmup {

  gamemap: GameMap;
  player: Phaser.GameObjects.Sprite;
  scene: Phaser.Scene;
  velocity: number = 1.2;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.gamemap = new GameMap(this.velocity);
  }


  public preload() {

  }

  public create() {
    // this.player // set player here
    // [] sprite = this.scene.add.sprite();
  }

  public update(time: number, delta: number) {
    // this.gamemap();
    // this.Map.update(time, delta);
    // map.get
  }
    
}