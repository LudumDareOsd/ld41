import { NoteType } from './NoteType';
import { Conductor } from './Conductor';

export class Rythm {

    private notes: any;
    private scoreText: any;
    private score = 0;
    private timer = 0;
    private blueKey: Phaser.Input.Keyboard.Key;
    private greenKey: Phaser.Input.Keyboard.Key;
    private redKey: Phaser.Input.Keyboard.Key;
    private yellowKey: Phaser.Input.Keyboard.Key;

    private bluePrimed = true;
    private greenPrimed = true;
    private redPrimed = true;
    private yellowPrimed = true;

    constructor(private scene: Phaser.Scene) {
    }

    public preload() {
    }

    public create() {
        this.notes = this.scene.physics.add.group();
        this.blueKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.greenKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.redKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.yellowKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        this.scoreText = this.scene.add.text(1090, 8, 'Score: 0', { fontSize: '24px', fill: '#fff' }).setDepth(2);
    }

    public update(time: number, delta: number) {
        //var infoWhereWeAreNow = this.conductor.GetTime();
        //console.log('Conductor time ' + infoWhereWeAreNow);
        //console.log('Conductor loop #' + this.conductor.LoopCount());
        this.score += 1;
        if (this.timer > 500) {
            this.createNote(Phaser.Math.Between(0, 3));
            this.timer = 0;
        }

        this.timer += delta;
        this.checkKeys();
        this.checkWorldBound(this.notes.children.entries, this.scene.physics.world);
        this.updateScore();
    }

    private updateScore() {
        this.scoreText.setText('Score: ' + this.score);
    }

    private checkKeys() {
        if (this.blueKey.isDown && this.bluePrimed) {
            this.bluePrimed = false;
            this.checkHit(this.notes.children.entries, NoteType.left);
        }
        if (this.greenKey.isDown && this.greenPrimed) {
            this.greenPrimed = false;
            this.checkHit(this.notes.children.entries, NoteType.midleft);
        }
        if (this.redKey.isDown && this.redPrimed) {
            this.redPrimed = false;
            this.checkHit(this.notes.children.entries, NoteType.midright);
        }
        if (this.yellowKey.isDown && this.yellowPrimed) {
            this.yellowPrimed = false;
            this.checkHit(this.notes.children.entries, NoteType.right);
        }

        if (this.blueKey.isUp) {
            this.bluePrimed = true;
        }
        if (this.greenKey.isUp) {
            this.greenPrimed = true;
        }
        if (this.redKey.isUp) {
            this.redPrimed = true;
        }
        if (this.yellowKey.isUp) {
            this.yellowPrimed = true;
        }
    }

    private createNote(type: NoteType) {
        let x = this.xValue(type);
        let sprite = this.notes.create(x, -100, this.getTexture(type)).setVelocity(0, 200);
        let particles = this.scene.add.particles('particle1');

        let emitter = particles.createEmitter({
            tint: this.getTint(type),
            x: { max: 22, min: -22 },
            y: { max: 22, min: -22 },
            speed: 100,
            quantity: 1,
            lifespan: 300,
            scale: { start: 0.2, end: 0 },
            blendMode: 'ADD'
        });

        emitter.startFollow(sprite, 0, 0, true);
    }

    private getTint(type: NoteType) {
        if (type == NoteType.left) {
            return 0xaa3333;
        }
        if (type == NoteType.midleft) {
            return 0x33aa33;
        }
        if (type == NoteType.midright) {
            return 0x3333aa;
        }
        if (type == NoteType.right) {
            return 0x33aaaa;
        }
    }

    private xValue(type: NoteType) {
        return 60 + (type * 69);
    }

    private getTexture(type: NoteType) {
        if (type == NoteType.left) {
            return 'bluenote';
        } else if (type == NoteType.midleft) {
            return 'greennote';
        } else if (type == NoteType.midright) {
            return 'rednote';
        } else if (type == NoteType.right) {
            return 'yellownote';
        }
    }

    private checkWorldBound(children, world) {
        for (let item of children) {
            if (item.y > world.bounds.height + 50) {
                item.destroy();
            }
        }
    }

    private checkHit(children: any, type: NoteType) {
        for (let item of children) {
            if (item.y > 836 && item.y < 886 && item.x == this.xValue(type)) {
                this.scene.tweens.add({
                    targets: item,
                    x: -1400,
                    ease: "elastic",
                    duration: 1500,
                    repeat: -1,
                    repeatDelay: 1000,
                    hold: 1000
                });

            }
        }
    }
}