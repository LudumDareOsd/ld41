import { Shmup } from './Shmup'
import { Player } from './Player'

export class GameMap {

  private obstacles: Phaser.Physics.Arcade.Sprite[];
  private baseinterval: number = 1;
  private timer: number = 10000;
  private columns: number = 7;
  private obstacleSize:number = 64;
  private playerSize:number = 64;
  private timeSinceLastRequiredShot: number = 0;
  private scaling: number = 1.5;
  private lastGapRight: boolean = false;

  constructor(private shmup: Shmup, private scene: Phaser.Scene, private velocity: number) {
  }

  public preload() {
  }

  public create(obstacles: Phaser.Physics.Arcade.Sprite[]) {
    this.obstacles = obstacles;
  }

  public update(time: number, delta: number) {
    
    this.timer += delta;
    this.timeSinceLastRequiredShot += delta;
    if (this.timer*this.velocity/8000 > this.obstacleSize*this.baseinterval) {
      this.timer = 0;
      
      this.newObstacles();
    }

    this.cleanUp();
  }

  public setVelocity(velocity: number) {
    this.velocity = velocity;
  }

  private newObstacles() {

    let rectangles: Phaser.Geom.Rectangle[] = this.generate();

    for (let rectangle of rectangles) {
      this.createObstacle(rectangle.x, rectangle.y, rectangle.width/this.obstacleSize);
    }
  }

  private createObstacle(x: number, y: number, scale: number) {

    let obstacle: Phaser.Physics.Arcade.Sprite = this.scene.physics.add.sprite(x, y, 'obstacle').setVelocity(Math.floor(Math.random()*10-5), this.velocity+Math.floor(Math.random()*10-5));
    obstacle.scaleY = scale;
    obstacle.scaleX = scale;

    obstacle.setRotation(Math.random()*3.14);
    obstacle.setAngularVelocity(this.rnd2()*100);
    
    this.obstacles.push(obstacle);
  }
  
  private cleanUp(): void {
    for (let obstacle of this.obstacles) {
      if (obstacle.y > this.scene.physics.world.bounds.height + 100) {
        obstacle.destroy();
      }
    }
  }

  private generate(): Phaser.Geom.Rectangle[] {

    let rectangles: Phaser.Geom.Rectangle[] = [];

    let rightBoundary: number = 1280;
    let leftBoundary: number = 360;

    let topBoundary: number = -600;
    let bottomBoundary: number = -200;

    let index: number = 0;

    while (true) {
      
      let scale: number = Phaser.Math.Between(50, 100)/100*this.scaling;
      let size: number = this.obstacleSize*scale;
      if (index === 0) {
        let xMax = rightBoundary - size/2;
        let xMin = xMax - this.playerSize;

        let yMax = bottomBoundary - size;
        let yMin = topBoundary + size;

        let xPos = Phaser.Math.Between(xMin, xMax);
        let yPos = Phaser.Math.Between(yMin, yMax);

        rectangles.push(new Phaser.Geom.Rectangle(xPos, yPos, size, size));

        index++;

        continue;
      } else {

        let oldX = rectangles[index-1].x;
        let oldY = rectangles[index-1].y;
        let oldHeight = rectangles[index-1].height;
        let oldWidth = rectangles[index-1].width;

        let yMin = Math.max(oldY - size - this.playerSize, topBoundary);
        let yMax = Math.min(oldY + oldHeight + this.playerSize, bottomBoundary - size);

        let yPos = Phaser.Math.Between(yMin, yMax);

        let xMax: number = 0;
        let xMin: number = Math.max(oldX - size - this.playerSize, leftBoundary + size/2);

        if (yPos < oldY + oldHeight && yPos + size > oldY ) {
          //Colliding
          xMax = oldX - size;
        } else {
          //Non-colliding 
          xMax = oldX - size/1.2;
        }

        if(xMin >= xMax) {
          break;
        } else {
          let xPos = Phaser.Math.Between(xMin,xMax);
          rectangles.push(new Phaser.Geom.Rectangle(xPos, yPos, size, size));
          index++;
        }

      }

    }

    if (this.timeSinceLastRequiredShot < 12000) {
      // Need to provide escape route which doesn't require shooting.
      // let indx = Phaser.Math.Between(0, rectangles.length-1);

      if (this.lastGapRight) {
        rectangles.splice(Phaser.Math.Between(0,3), 2);
        this.lastGapRight = false;
      } else {
        rectangles.splice(Phaser.Math.Between(rectangles.length-3,rectangles.length), 2);
        this.lastGapRight = true;
      }

    } else {
      // Generate unsafe route
      this.timeSinceLastRequiredShot = 0;
    }

    return rectangles;

  }

  private rnd2(): number {
    return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
  }

  
}

