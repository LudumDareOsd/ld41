import PlayScene from "../scenes/PlayScene";

export class Player {
  scene: PlayScene;
  sprite: any;

  leftKey: Phaser.Input.Keyboard.Key;
  rightKey: Phaser.Input.Keyboard.Key;
  upKey: Phaser.Input.Keyboard.Key;
  downKey: Phaser.Input.Keyboard.Key;
  fireKey: Phaser.Input.Keyboard.Key;

  emitter: any;

  constructor(config) {
    this.scene = config.scene;
    this.sprite = new Phaser.Physics.Arcade.Sprite(config.scene, config.x, config.y, 'player');
    
    this.scene.physics.add.existing(this.sprite as any);
    this.scene.add.existing(this.sprite as any);
    // this.sprite
    // console.log(this.sprite);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setOrigin(0.5, 0.5);

    this.sprite.setDrag(300, 300);
    this.sprite.setMaxVelocity(600, 600);

    this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.fireKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // this.emitter = this.scene.particles.createEmitter({
    //   frame: 'player',
    //   speed: 100,
    //   lifespan: {
    //       onEmit(particle, key, t, value)
    //       {
    //           return Phaser.Math.Percent(this.sprite.body.speed, 0, 300) * 2000;
    //       }
    //   },
    //   alpha: {
    //       onEmit(particle, key, t, value)
    //       {
    //           return Phaser.Math.Percent(this.sprite.body.speed, 0, 300);
    //       }
    //   },
    //   angle: {
    //       onEmit(particle, key, t, value)
    //       {
    //           var v = Phaser.Math.Between(-10, 10);
    //           return (this.angle - 180) + v;
    //       }
    //   },
    //   scale: { start: 0.6, end: 0 },
    //   blendMode: 'ADD'
    // });
  
  }

  update() {

    if (this.leftKey.isDown) {
      this.sprite.body.velocity.x += -20;
    }
    if (this.rightKey.isDown) {
      this.sprite.body.velocity.x += 20;
		}
    if (this.upKey.isDown) {
      this.sprite.body.velocity.y += -20;
		}
    if (this.downKey.isDown) {
      this.sprite.body.velocity.y += 20;
    }
  }
}