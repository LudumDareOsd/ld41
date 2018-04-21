export class MouseControl {
  input: Phaser.Input.InputPlugin;
  lastpos: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
  delta: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);

  constructor(config) {
    this.input = config.input
    // console.log(this);
    this.input.on('pointerdown', function (pointer) {
      this.lastpos.x = pointer.x;
      this.lastpos.y = pointer.y;
    }, this);

    this.input.on('pointermove', function (pointer) {
      this.delta.x = this.lastpos.x - pointer.x
      this.delta.y = this.lastpos.y - pointer.y
      this.lastpos.x = pointer.x;
      this.lastpos.y = pointer.y;
    }, this);
  }

  setInput(input) {
      this.input = input;
  }

  update(delta) {
      // console.log('update '+ delta);
  }

}

export default MouseControl;