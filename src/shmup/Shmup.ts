import { GameMap } from './GameMap';
import { Player } from './Player';
import { PowerUp, Power } from './PowerUp'

export class Shmup {

  gamemap: GameMap;
  player: any;
  asteroids: Phaser.Physics.Arcade.Sprite[];
  powerUps: PowerUp[];
  bulletgroup: any;
  starfield: Phaser.Physics.Arcade.Sprite[];

  constructor(private scene: any) {
    this.gamemap = new GameMap(this, this.scene, 100);
  }

  public preload() {
    this.scene.load.spritesheet('player', 'assets/sprites/ship_spritemap.png', { frameWidth: 65, frameHeight: 75 });
  }
  
  public create() {
    this.asteroids = [];
    this.starfield = [];
    this.powerUps = [];
    this.bulletgroup = this.scene.physics.add.group();
    this.gamemap.create(this.asteroids, this.powerUps);
    this.player = new Player({ scene: this.scene, x: 820, y: 960-50 });

    this.scene.physics.world.setBounds(340, 0, 1280-340, 960);
    this.scene.physics.add.collider(this.player.sprite, this.asteroids, this.crash, null, this.scene);
    this.scene.physics.add.collider(this.bulletgroup, this.asteroids, this.crash, null, this.scene);
    this.scene.physics.add.collider(this.player.sprite, this.powerUps, this.powerCollect, null, this.scene);

    for (let i = 0; i < 75; i++) {
      this.createStar(Phaser.Math.Between(-30, 960));
    }
  }

  public createStar(y:number = -50) {
    this.starfield.push(this.scene.add.sprite(Phaser.Math.Between(340, 1280), y, 'particle1'));
    let scale = 0.05 + (Math.random() * 0.2);
    let star = this.starfield[this.starfield.length-1];
    star.setScale(scale);
    star.setDepth(0);
    
  }

  public createBullet() {
    this.scene.add.sprite(this.player.x, this.player.y, 'particle2');
  }

  public crash(player, asteroid) {
    asteroid.destroy();
    // console.log(p, o);
  }

  public powerCollect(player, powerUp: PowerUp) {
    switch (powerUp.power) {
      case Power.Funk:
        
        break;
    
      default:
        break;
    }
    powerUp.destroy();
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
    
}