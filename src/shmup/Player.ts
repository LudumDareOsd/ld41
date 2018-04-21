import PlayScene from "../scenes/PlayScene";

export class Player extends Phaser.GameObjects.Sprite {
  scene: PlayScene;

  constructor(config) {
      super(config.scene, config.x, config.y, 'player');
      this.scene.add.existing(this as any);
  }


  update() {
		this.angle += 1;
		if (this.scene.cursors.left.isDown) {
			this.x -= 5;
		}
		if (this.scene.cursors.right.isDown) {
			this.x += 5;
		}
		if (this.scene.cursors.down.isDown) {
			this.y += 5;
		}
		if (this.scene.cursors.up.isDown) {
			this.y -= 5;
		}    
  }
}