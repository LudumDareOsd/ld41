import { GameMap } from './GameMap';
import { Player } from './Player';
import { Communicator } from './Communicator';
import { PowerUp, Power } from './PowerUp';

export class Shmup {

  gamemap: GameMap;
  player: any;
  asteroids: Phaser.Physics.Arcade.Sprite[];
  powerUps: PowerUp[];
  bulletgroup: any;
  starfield: Phaser.Physics.Arcade.Sprite[];
  private shieldCost: number = 10;
  public gameOver: boolean = false;
  private shmup: Shmup;

  constructor(private scene: any, private communicator: Communicator) {
    this.gamemap = new GameMap(this, this.scene);
    this.shmup = this;
  }

  public preload() {
  }
  
  public create() {
    this.asteroids = [];
    this.starfield = [];
    this.powerUps = [];
    this.bulletgroup = this.scene.physics.add.group();
    this.gamemap.create(this.asteroids, this.powerUps);
    this.player = new Player({ scene: this.scene, x: 820, y: 960-50, shmup: this });

    this.scene.physics.world.setBounds(340, 0, 1280-340, 960);
    this.scene.physics.add.collider(this.player.sprite, this.asteroids, this.crash, null, this.scene);
    this.scene.physics.add.collider(this.bulletgroup, this.asteroids, this.explode, null, this.scene);
    this.scene.physics.add.collider(this.player.sprite, this.powerUps, this.powerCollect, null, this.scene);

    for (let i = 0; i < 75; i++) {
      this.createStar(Phaser.Math.Between(-30, 960));
    }
  }

  public createStar(y:number = -50) {
    this.starfield.push(this.scene.add.sprite(Phaser.Math.Between(340, 1280), y, 'sparkles'));
    let scale = 0.15 + (Math.random() * 0.4);
    let star = this.starfield[this.starfield.length-1];
    star.setScale(scale);
    star.setDepth(0);
    star.setRotation(Phaser.Math.Between(0, 360));
    star.tint = Math.random() * 0xffffff;
  }

  public createBullet() {
    // check funkmeter
    let bullet = this.bulletgroup.create(this.player.sprite.x, this.player.sprite.y, 'particle2');
    bullet.setVelocity(0, -500);
    bullet.setScale(0.6);
    bullet.setTint(Phaser.Math.Between(0, 16777215));
  }

  public crash(player, asteroid) {

    if (this.communicator.getFunk() >= this.shmup.shieldCost) {
      this.communicator.adjustFunk(-this.shmup.shieldCost);
      asteroid.destroy();
    } else {
      this.scene.gameOver = true;
    }

  }

  public explode(shot, target) {
    shot.destroy();
    target.destroy();
  }

  public powerCollect(player, powerUp: PowerUp) {
    switch (powerUp.power) {
      case Power.Funk:
        this.communicator.adjustFunk(5);
        break;
        
        default:
        break;
      }
      powerUp.destroy();
    }
    
    public nuke() {
      for (let asteroid of this.asteroids) {
        asteroid.destroy();
      }
      this.asteroids = [];
    }
    
  public update(time: number, delta: number) {
    this.gamemap.update(time, delta);
    this.player.update(delta);
    if (Math.random() < 0.05) {
      this.createStar();
    }
    
    for (let index = 0; index < this.starfield.length; index++) {
      const star = this.starfield[index];
      star.y += star.scaleX + star.scaleY;
      if (star.y > 1000) {
        star.destroy();
        this.starfield.splice(index--, 1);
        // console.log(this.starfield.length);
      }
    }
    
  }

  public adjustVelocity(multiplier: number) {
    this.gamemap.adjustVelocity(multiplier);
  }

  public setVelocity(velocity: number) {
    this.gamemap.setVelocity(velocity);
  }

  public adjustAsteroidInterval(multiplier: number) {
    this.gamemap.adjustAsteroidInterval(multiplier);
  }

  public setAsteroidInterval(interval: number) {
    this.gamemap.setAsteroidInterval(interval);
  }

  public adjustPowerUpInterval(multiplier: number) {
    this.gamemap.adjustPowerUpInterval(multiplier);
  }

  public setPowerUpInterval(interval: number) {
    this.gamemap.setPowerUpInterval(interval);
  }
    
}