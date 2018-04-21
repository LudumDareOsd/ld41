import { NoteType } from './NoteType';
import { Conductor } from './Conductor';

export class Rythm {

    private notes: any;
    private timer = 0;

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
        //console.log('Conductor time ' + infoWhereWeAreNow);

        if(this.timer > 500) {
            this.createNote(Phaser.Math.Between(0, 3));
            this.timer = 0;
        }

        this.timer += delta;
        this.checkWorldBound(this.notes.children.entries, this.scene.physics.world);
    }

    private createNote(type: NoteType) {
        this.notes.create(50 + (type * 80), 20, this.getTexture(type)).setVelocity(0, 100);
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
            if (item.y > world.bounds.height) {
                item.destroy();
            }
        }
    }

}