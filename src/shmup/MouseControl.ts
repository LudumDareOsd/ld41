export class MouseControl {
  input: Phaser.Input.InputPlugin;
  lastpos: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
  delta: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
  vel: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
  dist: number;
  mouseEnabled: boolean = true;
  mouseTimer: number = 0;

  constructor(config) {
    this.input = config.input;

    this.input.on('pointerdown', function (pointer) {
      if (pointer.buttons == 1) {
        config.onLeft();
      }
    }, this);
    // this.input.on('pointerup', function (pointer) {
    // }, this);

    this.input.on('pointermove', function (pointer) {
      this.lastpos.x = pointer.x;
      this.lastpos.y = pointer.y;
      this.mouseEnabled = true;
      this.mouseTimer = 0;
    }, this);
  }

  setInput(input) {
    this.input = input;
  }

  update(player, delta: number) {
    if (this.mouseTimer > 1000) {
      this.mouseEnabled = false;
    } else {
      this.mouseTimer += delta;
    }
    let pos = new Phaser.Math.Vector2(player.x, player.y);
    this.delta.x = this.lastpos.x - pos.x;
    this.delta.y = this.lastpos.y - pos.y;
    this.delta.normalize()
    this.dist = this.lastpos.distance(pos);
    let scale = Math.min(200, Math.max(this.dist - 20, 0)) * 3;
    this.vel = new Phaser.Math.Vector2(this.delta.x * scale, this.delta.y * scale);
  }

}