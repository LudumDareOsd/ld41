import { Shmup } from './Shmup'

export class GameMap {

  obstacles: Phaser.Physics.Arcade.Group
  baseinterval: number = 10;

  constructor(private shmup: Shmup, private scene: Phaser.Scene, private velocity: number) {
  }

  public preload() {
  }

  public create(obstacles: Phaser.Physics.Arcade.Group) {
    this.obstacles = obstacles;
    this.createObstacle(100,100);
    this.createObstacle(200,200);

  }

  public update(time: number, delta: number) {
    this.obstacles.setVelocity(0, this.velocity, 0);
  }

  public setVelocity(velocity: number) {
    this.velocity = velocity;
  }

  public createObstacle(x: number, y: number) {
    this.obstacles.create(x, y, 'obstacle');
  }
  
}

