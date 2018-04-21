import { GameMap } from './GameMap';
import { Player } from './Player';

export class Shmup {

  gamemap: GameMap;
  player: Player;
  velocity: number = 100;
  obstacles: Phaser.Physics.Arcade.Group;
  
  constructor(private scene: Phaser.Scene) {
    this.gamemap = new GameMap(this, this.scene, this.velocity);
  }


  public preload() {
    this.scene.load.image('player', 'assets/sprites/mushroom.png');
  }
  
  public create() {
    this.obstacles = this.scene.physics.add.group();
    this.gamemap.create(this.obstacles);
    this.player = new Player({ scene: this.scene, x: 300, y: 300 } );
    this.scene.physics.add.existing(this.player as any);
    this.scene.physics.world.setBounds(300, 0, 1280, 960);
    this.player.body.setCollideWorldBounds(true);

    this.scene.physics.add.collider(this.player, this.obstacles, this.collide, null, this.scene);

    // var group = this.scene.physics.add.group({
    //   // key: 'asd',
    //   // frameQuantity: 30
    // });
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