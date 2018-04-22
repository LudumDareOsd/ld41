import { MouseControl } from "./MouseControl";

export class Player {
  scene: any;
  shmup: any;
  sprite: any;

  // maybe move out keyboard control to a class like mouse? PHASE #3
  leftKey: Phaser.Input.Keyboard.Key;
  rightKey: Phaser.Input.Keyboard.Key;
  upKey: Phaser.Input.Keyboard.Key;
  downKey: Phaser.Input.Keyboard.Key;
  fireKey: Phaser.Input.Keyboard.Key;
  mousecontrol: MouseControl;

  particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
  emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor(config) {
    this.scene = config.scene;
    this.shmup = config.shmup;
    this.sprite = new Phaser.Physics.Arcade.Sprite(config.scene, config.x, config.y, 'player');
    this.mousecontrol = new MouseControl({ input: this.scene.input, onLeft: this.fire.bind(this) });

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
    this.sprite.body.setSize(50, 70, true);
    this.sprite.body.setOffset(7.5, 5);
    
    this.sprite.setDepth(3);

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
      // tint: 0xffffffff,
      tint: { start: 0xffffffff, end: 0x00000000 },
      // tint: { start: 0xff000000, end: 0xff00ff00 },
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

  public fire() {
    // todo wait for this.fireKey.isDown == false, to fire again
    this.shmup.createBullet();
  }

  update(delta: number) {
    this.emitter.setAngle(Phaser.Math.Between(0, 360));
    this.mousecontrol.update(this.sprite, delta);

    if (this.sprite.body.velocity.x < -30) {
      this.sprite.anims.play('left');
    } else if (this.sprite.body.velocity.x > 30) {
      this.sprite.anims.play('right');
    } else {
      this.sprite.anims.play('idle');
    }

    if (this.mousecontrol.mouseEnabled) {
      this.sprite.body.velocity.x = this.mousecontrol.vel.x;
      this.sprite.body.velocity.y = this.mousecontrol.vel.y;
    }

    if (this.fireKey.isDown) {
      this.fire();
    }
    
    if (this.leftKey.isDown) {
      this.sprite.body.velocity.x -= 40;
    }
    if (this.rightKey.isDown) {
      this.sprite.body.velocity.x += 40;
    }
    if (this.upKey.isDown) {
      this.sprite.body.velocity.y -= 40;
		}
    if (this.downKey.isDown) {
      this.sprite.body.velocity.y += 40;
    }
  }
}