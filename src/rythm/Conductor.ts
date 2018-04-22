import { Levels } from './Levels';
import { TransformMidiJson } from './TransformMidiJson';

export class Conductor {

    private level : string;
    private seektime : number;
    private levelmetainfo : any;
    private music : any;
    private loopCount : number;
    private levelsetting : any;
    private leveljson : any;

    private levels = new Levels();
    private transformer = new TransformMidiJson();

    constructor(private scene: Phaser.Scene) {
           
    }

    public Load(levelChosen: string) {

        this.seektime = 0;
        this.level = levelChosen;
        this.loopCount = 0;

        var retrunvalue = "";

        // TODO Read from JSON-file
        /*this.loadJSON("assets/level1.json", (response) => {
      
            this.leveljson = JSON.parse(response);
            console.log('JSON Level load:' + response);
            console.log('JSON Level load:' + JSON.stringify(this.leveljson.musicmeta));

            this.LoadAudio();
        });*/

        //this.transformer.Transform(); // Uncomment to get output to log for transform

        this.levelmetainfo = this.levels.Level1();

        return this.levelmetainfo.musicmeta;
    }

    public Start() {
        this.music = this.scene.sound.add('rythmaudio', { loop: true });
        
        return this.levelmetainfo.notes;
    }

    public Play() {
        console.log('Conductor Play ' + this.level);

        this.music.play('', 0, 1, true);
        //this.music.onLoop.add(this.hasLooped, this);
    }

    public Stop() {
        this.music.stop();
    }

    public GetTime() {
        return this.music.seek;
    }

    public LoopCount() {
        return this.loopCount;
    }

    private LoadAudio() {
        console.log('JSON Level load outside:' + JSON.stringify(this.leveljson.musicmeta));

        return this.leveljson.musicmeta;

        //console.log('Conductor loading audio ' + this.levelmetainfo.musicmeta.path);

        //this.scene.load.audio('rythmaudio', this.levelmetainfo.musicmeta.path, null);
        //this.music = this.scene.sound.add('rythmaudio');
    }

    private hasLooped(sound) {

        this.loopCount++;
    }

    private loadJSON(file, callback) {   

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', file, true);
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == 200) {
                callback(xobj.responseText);
              }
        };
        xobj.send(null);  
     }
}