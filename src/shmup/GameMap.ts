import { Shmup } from './Shmup'

export class GameMap {
  shmup: Shmup;

  obstacles: Phaser.Physics.Arcade.Group;
  velocity: number;
  baseinterval: number = 10;

  constructor(shmup: Shmup, velocity: number) {
    
    this.shmup = shmup;
    this.velocity = velocity;
    this.obstacles = this.shmup.scene.physics.add.group();

    this.createObstacle(100,100);
    this.createObstacle(200,200);

  }

  public setVelocity(velocity: number) {
    this.velocity = velocity;
  }

  public createObstacle(x: number, y: number) {
    this.obstacles.create(x, y, 'obstacle');
  }
  
}

