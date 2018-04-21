import { Shmup } from './Shmup'
import { Player } from './Player'
import { PowerUp } from './PowerUp'
import { Power } from './PowerUp'

export class GameMap {

  private asteroids: Phaser.Physics.Arcade.Sprite[];
  private powerUps: PowerUp[];
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

  public create(asteroids: Phaser.Physics.Arcade.Sprite[], powerUps: PowerUp[]) {
    this.asteroids = asteroids;
    this.powerUps = powerUps;
  }

  public update(time: number, delta: number) {
    
    this.timer += delta;
    this.timeSinceLastRequiredShot += delta;
    if (this.timer*this.velocity/8000 > this.obstacleSize*this.baseinterval) {
      this.timer = 0;
      
      this.newAsteroids();
      this.newPowerUps();
      this.cleanUp();
    }

  }

  public setVelocity(velocity: number) {
    this.velocity = velocity;
  }

  private newPowerUps() {
    if (Math.random() > 0.5) {
      this.createPowerUp(Phaser.Math.Between(500, 1100), -100, Power.Funk);
    }
  }

  private createPowerUp(x: number, y: number, power: Power) {
    let texture: string = '';
    switch (power) {
      case Power.Funk:
        texture = 'greenfunk';
        break;
    
      default:
      return;
    }

    let powerUp: PowerUp = this.scene.physics.add.sprite(x, y, texture, power).setVelocity(Math.floor(Math.random()*20-10), this.velocity+Math.floor(Math.random()*20-10));
    powerUp.power = power;

    powerUp.setRotation(Math.random()*6.28);
    powerUp.setAngularVelocity(this.rnd2()*100);
    powerUp.setDepth(1);

    this.powerUps.push(powerUp);

  }

  private newAsteroids() {

    let rectangles: Phaser.Geom.Rectangle[] = this.generateAsteroidBelt();

    for (let rectangle of rectangles) {
      this.createAsteroid(rectangle.x, rectangle.y, rectangle.width/this.obstacleSize);
    }
  }

  private createAsteroid(x: number, y: number, scale: number) {

    let asteroid: Phaser.Physics.Arcade.Sprite = this.scene.physics.add.sprite(x, y, 'asteroid').setVelocity(Math.floor(Math.random()*10-5), this.velocity+Math.floor(Math.random()*10-5));
    asteroid.scaleY = scale;
    asteroid.scaleX = scale;

    asteroid.setRotation(Math.random()*6.28);
    asteroid.setAngularVelocity(this.rnd2()*100);
    asteroid.setDepth(1);
    
    this.asteroids.push(asteroid);
  }
  
  private cleanUp(): void {
    for (let i: number = 0; i < this.asteroids.length; i++) {
      let asteroid = this.asteroids[i];
      if (asteroid.y > this.scene.physics.world.bounds.height + 100) {
        this.asteroids.splice(i,1);
        asteroid.destroy();
      }
    }

    for (let i: number = 0; i < this.powerUps.length; i++) {
      let powerUp = this.powerUps[i];
      if (powerUp.y > this.scene.physics.world.bounds.height + 100) {
        this.powerUps.splice(i,1);
        powerUp.destroy();
      }
    }

  }

  private generateAsteroidBelt(): Phaser.Geom.Rectangle[] {
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

