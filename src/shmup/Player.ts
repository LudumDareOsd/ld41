import PlayScene from "../scenes/PlayScene";

export class Player {
  scene: PlayScene;
  sprite: any;

  leftKey: Phaser.Input.Keyboard.Key;
  rightKey: Phaser.Input.Keyboard.Key;
  upKey: Phaser.Input.Keyboard.Key;
  downKey: Phaser.Input.Keyboard.Key;
  fireKey: Phaser.Input.Keyboard.Key;

  particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
  emitter: Phaser.GameObjects.Particles.ParticleEmitter;

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
    // this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDrag(500, 500);
    this.sprite.setMaxVelocity(600, 600);

    this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.fireKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.particles = this.scene.add.particles('particle3')
    this.emitter = this.particles.createEmitter({
      x: 0,
      y: 0,
      tint: 0xffffffff,
      angle: 0,
      speed: 100,
      quantity: 2,
      alpha: 0.8,
      // speed: { min: -1100, max: 100 },
      gravityY: 0,
      gravityX: 0,
      scale: { start: 0.3, end: 0.0 },
      lifespan: 100,
      blendMode: 'ADD'
    });
    this.emitter.startFollow(this.sprite, 0, -30, true);
  }

  update() {
    this.sprite.anims.play('idle');
    this.emitter.setAngle(Phaser.Math.Between(0, 360));
    
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