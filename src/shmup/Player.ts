import PlayScene from "../scenes/PlayScene";

export class Player extends Phaser.GameObjects.Sprite {
  scene: PlayScene;

  leftKey: Phaser.Input.Keyboard.Key;
  rightKey: Phaser.Input.Keyboard.Key;
  upKey: Phaser.Input.Keyboard.Key;
  downKey: Phaser.Input.Keyboard.Key;
  fireKey: Phaser.Input.Keyboard.Key;

  constructor(config) {
      super(config.scene, config.x, config.y, 'player');
      this.scene.add.existing(this as any);

      this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      this.fireKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    this.body.velocity.x *= 0.93;
    this.body.velocity.y *= 0.93;
		this.angle += 1;

    if (this.leftKey.isDown) {
      this.body.velocity.x = -288;
    }
    if (this.rightKey.isDown) {
      this.body.velocity.x = 288;
		}
    if (this.upKey.isDown) {
      this.body.velocity.y = -288;
		}
    if (this.downKey.isDown) {
      this.body.velocity.y = 288;
		}
  }
}