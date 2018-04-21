import { GameMap } from './GameMap';
import { Obstacle } from './Obstacle';
import { Player } from './Player';

export class Shmup {

  gamemap: GameMap;
  scene: Phaser.Scene;
  player: Player;
  velocity: number = 1.2;

  // keys: Phaser.;
  
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }
  
  public preload() {
    this.scene.load.image('player', 'assets/sprites/mushroom.png');
  }
  
  public create() {
    this.gamemap = new GameMap(this.velocity);
    this.player = new Player({ scene: this.scene, x: 300, y: 300 } );
    this.scene.physics.world.setBounds(0, 0, 800 * 4, 600 * 4);

    var group = this.scene.physics.add.group({
      key: 'asd',
      frameQuantity: 30
    });
  }

  public update(time: number, delta: number) {
    this.player.update();
    // this.gamemap();
  }

}