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

    private conductor = new Conductor(this.scene);

    constructor(private scene: Phaser.Scene) {
    }

    public preload() {
        //this.scene.load.audio('rythmaudio', "assets/audio/enter_darkness/track.mp3", null);
        var infoMetaAboutLevel = this.conductor.Load("level1");
        console.log('Got info: ' + infoMetaAboutLevel.title);
        // bpm: int 120 ex
        // title: Music Title
        // background: img background.jpg
        // offset: int ms (?kanske inte behövs)

        this.scene.load.audio('rythmaudio', infoMetaAboutLevel.path, null);
    }

    public create() {
        this.notes = this.scene.physics.add.group();
        this.blueKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.greenKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.redKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.yellowKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        var infoAtWhatTimesToDoStuff = this.conductor.Start(); //"level1"
        console.log('Got notes: ' + JSON.stringify(infoAtWhatTimesToDoStuff));
        // [{"1.34": [0,1,1,0]}, {"4.3": [0,0,1,0]}, {"9.0": [1,0,0,0]}]
        // 1.34 ms => [0,1,1,0] ==>
        //           tangent 1: gör inget   (0)
        //           tangent 2: ska tryckas (1)
        //           tangent 3: ska tryckas (1)
        //           tangent 3: gör inget   (0)

        //var music = this.scene.sound.add('rythmaudio');
        //music.play();
        this.conductor.Play();
    }

    public update(time: number, delta: number) {
        var infoWhereWeAreNow = this.conductor.GetTime();
        console.log('Conductor time ' + infoWhereWeAreNow);
        console.log('Conductor loop #' + this.conductor.LoopCount());

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
        this.notes.create(this.xValue(type), 20, this.getTexture(type)).setVelocity(0, 100);
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
                item.destroy();
            }
        }
    }

}