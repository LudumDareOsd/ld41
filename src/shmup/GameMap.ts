import { Shmup } from './Shmup'

export class GameMap {

  obstacles: Phaser.Physics.Arcade.Group
  baseinterval: number = 100;
  timer: number = 0;

  constructor(private shmup: Shmup, private scene: Phaser.Scene, private velocity: number) {
  }

  public preload() {
  }

  public create(obstacles: Phaser.Physics.Arcade.Group) {
    this.obstacles = obstacles;
    // this.createObstacle(100,100);
    // this.createObstacle(200,200);

  }

  public update(time: number, delta: number) {
    
    this.timer += delta;
    if (this.timer > 3000) {
      this.timer = 0;
      
      this.newObstacles();
      this.obstacles.setVelocity(0, this.velocity, 0);
    }

    this.cleanUp();
  }

  public setVelocity(velocity: number) {
    this.velocity = velocity;
  }

  private newObstacles() {
    this.createObstacle(600, -200);
    this.createObstacle(700, -200);
    this.createObstacle(800, -200);
    this.createObstacle(900, -200);
    this.createObstacle(700, -200);
  }

  private createObstacle(x: number, y: number) {
    this.obstacles.create(x, y, 'obstacle');
    
  }
  
  private cleanUp() {
    for (let obstacle of this.obstacles.children.entries) {
      if (obstacle.y > this.scene.physics.world.bounds.height + 100) {
        obstacle.destroy();
      }
    }
  }
  
}

