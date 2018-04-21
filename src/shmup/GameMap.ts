import { Shmup } from './Shmup'

export class GameMap {

  private obstacles: Phaser.Physics.Arcade.Group
  baseinterval: number = 10;
  timer: number = 0;
  xPos: number[] = new Array();
  columns: number = 7;
  obstacleSize:number = 128;

  constructor(private shmup: Shmup, private scene: Phaser.Scene, private velocity: number) {
  }

  public preload() {
  }

  public create(obstacles: Phaser.Physics.Arcade.Group) {
    this.obstacles = obstacles;
    
    for (let i = 0; i < this.columns; i++) {
      this.xPos[i] = this.scene.physics.world.bounds.width - this.obstacleSize*(i+1)+this.obstacleSize/2;
    }

  }

  public update(time: number, delta: number) {
    
    this.timer += delta;
    if (this.timer*this.velocity/400 > this.obstacleSize*this.baseinterval) {
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
    
    for (let i = 1; i < (this.columns - 1); i++) {
      this.createObstacle(this.xPos[i], -200);
    }
  }

  private createObstacle(x: number, y: number) {
    let obstacle = this.obstacles.create(x, y, 'obstacle');
    
  }
  
  private cleanUp() {
    for (let obstacle of this.obstacles.children.entries) {
      if (obstacle.y > this.scene.physics.world.bounds.height + 100) {
        obstacle.destroy();
      }
    }
  }
  
}

