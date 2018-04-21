import { GameMap } from './GameMap';
import { Player } from './Player';
import { PowerUp } from './PowerUp'

export class Shmup {

  gamemap: GameMap;
  player: any;
  velocity: number = 100;
  asteroids: Phaser.Physics.Arcade.Sprite[];
  powerUps: PowerUp[];

  constructor(private scene: any) {
    this.gamemap = new GameMap(this, this.scene, this.velocity);
  }


  public preload() {
    this.scene.load.spritesheet('player', 'assets/sprites/ship_spritemap.png', { frameWidth: 65, frameHeight: 75 });
  }
  
  public create() {
    this.asteroids = [];
    this.powerUps = [];
    this.gamemap.create(this.asteroids, this.powerUps);
    this.player = new Player({ scene: this.scene, x: 820, y: 960-50 });

    this.scene.physics.world.setBounds(360, 0, 1280-360, 960);
    this.scene.physics.add.collider(this.player.sprite, this.asteroids, this.crash, null, this.scene);
    this.scene.physics.add.collider(this.player.sprite, this.powerUps, this.powerCollect, null, this.scene);

  }

  public crash(player, asteroid) {
    asteroid.destroy();
    // console.log(p, o);
  }

  public powerCollect(player, powerUp) {
    switch (powerUp) {
      case value:
        
        break;
    
      default:
        break;
    }
    powerUp.destroy();
  }

  public update(time: number, delta: number) {
    this.gamemap.update(time, delta);
    this.player.update();

  }
    
}