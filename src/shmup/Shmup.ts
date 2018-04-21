import { GameMap } from './GameMap';
import { Player } from './Player';

export class Shmup {

  gamemap: GameMap;
  player: Player;
  playergroup: Phaser.Physics.Arcade.Group;
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
    this.player = new Player({ scene: this.scene, x: 820, y: 960-50 } );

    // this.playergroup = Phaser.Physics.Arcade.Group;

    this.scene.physics.add.existing(this.player as any);
    this.scene.physics.world.setBounds(360, 0, 1280-360, 960);
    this.player.body.setCollideWorldBounds(true);
    // this.player.

    this.scene.physics.add.collider(this.player, this.obstacles, this.collide, null, this.scene);

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