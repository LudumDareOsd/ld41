import { Note } from './Note';
import { Util } from '../utils/Util';
import { Conductor } from './Conductor';

export class Rythm {

    private notes: Note[] = [];
    cursors: any;
    private conductor = new Conductor(this.scene);

    constructor(private scene: Phaser.Scene) {
           
    }

    public preload() {
    }

    public create() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        var infoMetaAboutLevel = this.conductor.Load("level1");
        console.log('Got info: ' + infoMetaAboutLevel.title);
        // bpm: int 120 ex
        // title: Music Title
        // background: img background.jpg
        // offset: int ms (?kanske inte behövs)
        var infoAtWhatTimesToDoStuff = this.conductor.Start(); //"level1"
        console.log('Got notes: ' + JSON.stringify(infoAtWhatTimesToDoStuff));
        // [{"1.34": [0,1,1,0]}, {"4.3": [0,0,1,0]}, {"9.0": [1,0,0,0]}]
        // 1.34 ms => [0,1,1,0] ==>
        //           tangent 1: gör inget   (0)
        //           tangent 2: ska tryckas (1)
        //           tangent 3: ska tryckas (1)
        //           tangent 3: gör inget   (0)

        //this.scene.load.audio('rythmaudio', "./../../assets/audio/enter_darkness/helix.mp3");
        this.scene.load.audio('rythmaudio', "../../../assets/audio/enter_darkness/helix.mp3", null);
        var music = this.scene.sound.add('rythmaudio');
        music.play();
    }

    public update(time: number, delta: number) {
        if (this.cursors.left.isDown) {
			console.log('left');
        }
		if (this.cursors.right.isDown) {
			console.log('right');
		}
		if (this.cursors.down.isDown) {
			console.log('down');
		}
		if (this.cursors.up.isDown) {
			console.log('up');
		}
        
       //this.scene.physics.add.sprite(100, 100, 'note').setVelocity(Util.getRandomInt(10, 100), Util.getRandomInt(10, 100));
       
       var infoWhereWeAreNow = this.conductor.GetTime();
       //console.log('Conductor time ' + infoWhereWeAreNow);
       // seek in ms, 4566 int
       /*
       conductor.Pause();
       conductor.Resume(); // från pause
       conductor.Start(); // börja från 0
       conductor.Stop(); //  börja från 0*/
    }
    
    private click(button) {
    
        console.log('Button click ' + button.name);
    
    }

}