import { Shmup } from './Shmup'
import { Player } from './Player'

export class GameMap {

  private obstacles: Phaser.Physics.Arcade.Sprite[];
  baseinterval: number = 10;
  timer: number = 0;
  xPos: number[] = [];
  columns: number = 7;
  obstacleSize:number = 128;
  timeSinceLastRequiredShot: number = 0;

  constructor(private shmup: Shmup, private scene: Phaser.Scene, private velocity: number) {
  }

  public preload() {
  }

  public create(obstacles: Phaser.Physics.Arcade.Sprite[]) {
    this.obstacles = obstacles;
    
    for (let i = 0; i < this.columns; i++) {
      this.xPos[i] = this.scene.physics.world.bounds.width - this.obstacleSize*(i+1) + this.obstacleSize/2;
    }

  }

  public update(time: number, delta: number) {
    
    this.timer += delta;
    if (this.timer*this.velocity/400 > this.obstacleSize*this.baseinterval) {
      this.timer = 0;
      
      this.newObstacles();
      // this.obstacles.setVelocity(0, this.velocity, 0);
    }

    this.cleanUp();
  }

  public setVelocity(velocity: number) {
    this.velocity = velocity;
  }

  private newObstacles() {
    for (let i = 1; i < (this.columns - 1); i++) {
      this.createObstacle(this.xPos[i], -200, 1, 1);
    }
  }

  private createObstacle(x: number, y: number, xScale: number, yScale: number) {

    let obstacle: Phaser.Physics.Arcade.Sprite = this.scene.physics.add.sprite(x, y, 'obstacle').setVelocity(0, this.velocity);
    obstacle.scaleY = xScale;
    obstacle.scaleX = yScale;
    obstacle.setOrigin();
    
    this.obstacles.push(obstacle);
  }
  
  private cleanUp() {
    for (let obstacle of this.obstacles) {
      if (obstacle.y > this.scene.physics.world.bounds.height + 100) {
        obstacle.destroy();
      }
    }
  }

  private generate() {

    if (this.timeSinceLastRequiredShot < 10000) {
      // Need to provide escape route which doesn't require shooting.
      this.generateWave(true);
    } else {
      // Generate unsafe route
      this.generateWave(false);
      this.timeSinceLastRequiredShot = 0;
    }
  }

  private generateWave(safe: boolean) {



  }

  
}

