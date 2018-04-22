import { NoteType } from './NoteType';
import { Conductor } from './Conductor';
import { FunkOMeter } from './FunkOMeter';
import { Communicator } from '../shmup/Communicator';

export class Rythm {

    private notes: any;
    private scoreText: any;
    private score = 0;

    private multiplier = 1;
    private multiplierText: any;

    private streak = 0;

    private blueKey: Phaser.Input.Keyboard.Key;
    private greenKey: Phaser.Input.Keyboard.Key;
    private redKey: Phaser.Input.Keyboard.Key;
    private yellowKey: Phaser.Input.Keyboard.Key;

    private bluePrimed = true;
    private greenPrimed = true;
    private redPrimed = true;
    private yellowPrimed = true;

    private infoAtWhatTimesToDoStuff;
    private createdNotes = 0;

    private musicTimer = 0;
    private blockTimer = 0;
    private offset = 4600;
    private musicDuration = 107750;
    private playing = false;

    private particleManager;

    private successleft;
    private successmidleft;
    private successmidright;
    private successright;

    private failLeft;
    private failmidleft;
    private failmidright;
    private failright;

    public funkOMeter: FunkOMeter;

    private conductor = new Conductor(this.scene);

    constructor(private scene: Phaser.Scene, private communicator: Communicator) {
    }

    public preload() {
        //this.scene.load.audio('rythmaudio', "assets/audio/enter_darkness/track.mp3", null);
        var infoMetaAboutLevel = this.conductor.Load("level2", 2); // skip ever 2nd

        this.scene.load.audio('rythmaudio', infoMetaAboutLevel.path, null);
    }

    public create() {
        this.notes = this.scene.physics.add.group();
        this.blueKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.greenKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.redKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.yellowKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.scoreText = this.scene.add.text(1090, 8, 'Score: 0', { fontSize: '24px', fill: '#fff' }).setDepth(3);
        this.multiplierText = this.scene.add.text(300, 845, 'x1', { fontSize: '24px', fill: '#fff' }).setDepth(6);
        this.infoAtWhatTimesToDoStuff = this.conductor.Start();

        this.particleManager = this.scene.add.particles('particle1') as any;
        this.particleManager.setDepth(4);

        this.successleft = this.scene.add.sprite(13, 836, 'success');
        this.successleft.setDepth(4);
        this.successleft.setOrigin(0, 0);
        this.successleft.setVisible(false);

        this.successmidleft = this.scene.add.sprite(82, 836, 'success');
        this.successmidleft.setDepth(4);
        this.successmidleft.setOrigin(0, 0);
        this.successmidleft.setVisible(false);

        this.successmidright = this.scene.add.sprite(151, 836, 'success');
        this.successmidright.setDepth(4);
        this.successmidright.setOrigin(0, 0);
        this.successmidright.setVisible(false);

        this.successright = this.scene.add.sprite(220, 836, 'success');
        this.successright.setDepth(4);
        this.successright.setOrigin(0, 0);
        this.successright.setVisible(false);

        this.failLeft = this.scene.add.sprite(13, 836, 'fail');
        this.failLeft.setDepth(4);
        this.failLeft.setOrigin(0, 0);
        this.failLeft.setVisible(false);

        this.failmidleft = this.scene.add.sprite(82, 836, 'fail');
        this.failmidleft.setDepth(4);
        this.failmidleft.setOrigin(0, 0);
        this.failmidleft.setVisible(false);

        this.failmidright = this.scene.add.sprite(151, 836, 'fail');
        this.failmidright.setDepth(4);
        this.failmidright.setOrigin(0, 0);
        this.failmidright.setVisible(false);

        this.failright = this.scene.add.sprite(220, 836, 'fail');
        this.failright.setDepth(4);
        this.failright.setOrigin(0, 0);
        this.failright.setVisible(false);

        this.funkOMeter = new FunkOMeter(this.scene);

    }

    public update(time: number, delta: number) {
        this.checkMusic(delta);
        this.addScore(1);
        this.checkKeys();
        this.checkWorldBound(this.notes.children.entries, this.scene.physics.world);
        this.updateScore();
    }

    private checkMusic(delta: number) {

        let length = this.infoAtWhatTimesToDoStuff.length;
        for (let i = this.createdNotes; i < length; i++) {
            let info = this.infoAtWhatTimesToDoStuff[i];
            let key = Object.keys(info)[0];
            let value = info[key];

            if (+key < this.blockTimer) {
                this.createNote(value);
                this.createdNotes++;
                break;
            }
        }

        if (this.blockTimer > this.offset && !this.playing) {
            this.conductor.Play();
            this.playing = true;
        }

        if (this.blockTimer > this.musicDuration + this.offset) {
            this.blockTimer = 0;
            this.createdNotes = 0;
            this.playing = false;
            this.conductor.Stop();
        }

        this.blockTimer += delta;
    }

    private updateScore() {
        this.scoreText.setText('Score: ' + this.score);
    }

    private checkKeys() {
        if (this.blueKey.isDown && this.bluePrimed) {
            this.bluePrimed = false;

            if(this.checkHit(this.notes.children.entries, NoteType.left)) {
                this.successleft.setVisible(true);
            } else {
                this.failLeft.setVisible(true);
                this.miss();
            };
        }
        if (this.greenKey.isDown && this.greenPrimed) {
            this.greenPrimed = false;

            if(this.checkHit(this.notes.children.entries, NoteType.midleft)) {
                this.successmidleft.setVisible(true);
            } else {
                this.failmidleft.setVisible(true);
                this.miss();
            };
        }
        if (this.redKey.isDown && this.redPrimed) {
            this.redPrimed = false;

            if(this.checkHit(this.notes.children.entries, NoteType.midright)) {
                this.successmidright.setVisible(true);
            } else {
                this.failmidright.setVisible(true);
                this.miss();
            };
        }
        if (this.yellowKey.isDown && this.yellowPrimed) {
            this.yellowPrimed = false;
            
            if(this.checkHit(this.notes.children.entries, NoteType.right)) {
                this.successright.setVisible(true);
            } else {
                this.failright.setVisible(true);
                this.miss()
            };
        }

        if (this.blueKey.isUp) {
            this.bluePrimed = true;
            this.successleft.setVisible(false);
            this.failLeft.setVisible(false);
        }
        if (this.greenKey.isUp) {
            this.greenPrimed = true;
            this.successmidleft.setVisible(false);
            this.failmidleft.setVisible(false);
        }
        if (this.redKey.isUp) {
            this.redPrimed = true;
            this.successmidright.setVisible(false);
            this.failmidright.setVisible(false);
        }
        if (this.yellowKey.isUp) {
            this.yellowPrimed = true;
            this.successright.setVisible(false);
            this.failright.setVisible(false);
        }
    }

    private miss() {
        this.streak = 0;
        this.calcMultiplier();
    }

    private calcMultiplier() {
        if(this.streak > 5 && this.streak <= 15) {
            this.multiplier = 2;
        } else if(this.streak > 15) {
            this.multiplier = 4;
        } else {
            this.multiplier = 1;
        }

        this.updateMultiplierText();
    }

    private updateMultiplierText() {
        this.multiplierText.setText('x' + this.multiplier);
    }

    private createNote(type: NoteType) {
        let x = this.xValue(type);
        let sprite = this.notes.create(x, -100, this.getTexture(type))
        sprite.setVelocity(0, 200);
        sprite.setDepth(3);

        let emitter = this.particleManager.createEmitter({
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
        return 46 + (type * 69);
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
                if(item.x > 0) {
                    this.miss();
                }
                
                item.destroy();
            }
        }
    }

    private checkHit(children: any, type: NoteType) {
        for (let item of children) {
            if (item.y > 826 && item.y < 876 && item.x == this.xValue(type)) {
                this.scene.tweens.add({
                    targets: item,
                    x: -1400,
                    ease: "elastic",
                    duration: 1500,
                    repeat: -1,
                    repeatDelay: 1000,
                    hold: 1000
                });
                
                this.funkOMeter.addFunk(type);
                this.addScore(1000);
                this.streak++;
                this.calcMultiplier()

                return true;
            }
        }

        return false;
    }

    private addScore(score: number) {
        this.score += (score * this.multiplier)
    }

    public getScore(): number {
        return this.score;
    }

    public KillMe() {
        this.playing = false;
        this.conductor.Stop();
    }

}