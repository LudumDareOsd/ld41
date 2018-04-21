import { GameMap } from './GameMap';

export class Shmup {

  gamemap: GameMap;
  player: Phaser.GameObjects.Sprite;
  velocity: number = 100;
  obstacles: Phaser.Physics.Arcade.Group;
  
  constructor(private scene: Phaser.Scene) {
    this.gamemap = new GameMap(this, this.scene, this.velocity);
  }
  
  public preload() {
    
  }
  
  public create() {
    this.obstacles = this.scene.physics.add.group();
    this.gamemap.create(this.obstacles);

  }

  public update(time: number, delta: number) {
    this.gamemap.update(time, delta);
  }
    
}