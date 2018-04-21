import { GameMap } from './GameMap';
import { Player } from './Player';

export class Shmup {

  gamemap: GameMap;
  player: any;
  velocity: number = 100;
<<<<<<< HEAD
  obstacles: Phaser.Physics.Arcade.Sprite[];
=======
  obstacles: any;
  bulletgroup: any;
  // this.notes = this.scene.physics.add.group();
>>>>>>> 2f50f64def4a53d8df4cdd8d58f37bb38a774cd9

  constructor(private scene: any) {
    this.gamemap = new GameMap(this, this.scene, this.velocity);
  }

  public preload() {
    this.scene.load.spritesheet('player', 'assets/sprites/ship_spritemap.png', { frameWidth: 65, frameHeight: 75 });
  }
  
  public create() {
    this.obstacles = [];
    this.gamemap.create(this.obstacles);
    this.player = new Player({ scene: this.scene, x: 820, y: 960-50 });
    this.bulletgroup = this.scene.physics.add.group();

    this.scene.physics.world.setBounds(360, 0, 1280-360, 960);
    this.scene.physics.add.collider(this.player.sprite, this.obstacles, this.collide, null, this.scene);
  }

  public collide(p, o) {
    o.destroy();
    // console.log(p, o);
  }

  public update(time: number, delta: number) {
    this.gamemap.update(time, delta);
    this.player.update();
  }
    
}