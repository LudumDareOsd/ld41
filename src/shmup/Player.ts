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

    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('player', { frames: [0] }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('player', { frames: [1] }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('player', { frames: [2] }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.add.existing(this.sprite as any);
    this.scene.physics.add.existing(this.sprite as any);

    this.sprite.setCollideWorldBounds(true);
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDrag(500, 500);
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

    // this.sprite.anims.play('idle');
  }

  update() {
    this.sprite.anims.play('idle');
    
    if (this.leftKey.isDown) {
      this.sprite.body.velocity.x += -40;
      this.sprite.anims.play('left');
    }
    if (this.rightKey.isDown) {
      this.sprite.body.velocity.x += 40;
      this.sprite.anims.play('right');
		}
    if (this.upKey.isDown) {
      this.sprite.body.velocity.y += -40;
		}
    if (this.downKey.isDown) {
      this.sprite.body.velocity.y += 40;
    }
  }
}