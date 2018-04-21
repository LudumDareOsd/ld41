export class MouseControl {
  input: Phaser.Input.InputPlugin;
  lastpos: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
  delta: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
  vel: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
  dist: number; 

  constructor(config) {
    this.input = config.input

    this.input.on('pointerdown', function (pointer) {
      console.log(this.lastpos);
    }, this);

    this.input.on('pointermove', function (pointer) {
      this.lastpos.x = pointer.x;
      this.lastpos.y = pointer.y;
    }, this);
  }

  setInput(input) {
    this.input = input;
  }

  update(player) {
    let pos = new Phaser.Math.Vector2(player.x, player.y);
    
    this.delta.x = this.lastpos.x - pos.x;
    this.delta.y = this.lastpos.y - pos.y;

    this.delta.normalize()
    
    this.dist = this.lastpos.distance(pos);

    let scale = Math.min(200, Math.max(this.dist - 20, 0)) * 3;
    // let ang = this.delta.angle();
    // console.log(ang);

    this.vel = new Phaser.Math.Vector2(this.delta.x * scale, this.delta.y * scale);
  }

}