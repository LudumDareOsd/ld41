import { NoteType } from './NoteType';
import { Conductor } from './Conductor';

export class Rythm {

    private notes: any;
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
    }

    public update(time: number, delta: number) {
        if (this.timer > 500) {
            this.createNote(Phaser.Math.Between(0, 3));
            this.timer = 0;
        }

        this.timer += delta;
        this.checkKeys();
        this.checkWorldBound(this.notes.children.entries, this.scene.physics.world);
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

        if(this.blueKey.isUp) {
            this.bluePrimed = true;
        }
        if(this.greenKey.isUp) {
            this.greenPrimed = true;
        }
        if(this.redKey.isUp) {
            this.redPrimed = true;
        }
        if(this.yellowKey.isUp) {
            this.yellowPrimed = true;
        }
    }

    private createNote(type: NoteType) {
        let x = this.xValue(type);
        this.notes.create(x, -100, this.getTexture(type)).setVelocity(0, 100);
        // var particles = this.scene.add.particles('spark');

        // var emitter = particles.createEmitter({
        //     frame: 'yellow',
        //     radial: false,
        //     x: 100,
        //     y: { min: 0, max: 560, steps: 256 },
        //     lifespan: 2000,
        //     speedX: { min: 200, max: 400 },
        //     quantity: 4,
        //     gravityY: 50,
        //     scale: { start: 0.6, end: 0, ease: 'Power3' },
        //     blendMode: 'ADD'
        // });
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
            if (item.y > 846 && item.y < 876 && item.x == this.xValue(type)) {
                this.scene.tweens.add({
                    targets: item,
                    x: -1400,
                    ease: "elastic",
                    duration: 1500,
                    repeat: -1,
                    repeatDelay: 1000,
                    hold: 1000
                });

                //item.destroy();
            }
        }
    }
}