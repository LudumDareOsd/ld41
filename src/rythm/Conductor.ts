export class Conductor {

    private level : string;
    private seektime : number;
    private levelmetainfo : any;
    private music : any;

    constructor(private scene: Phaser.Scene) {
           
    }

    public Load(levelChosen: string) {
        console.log('Conductor loading ' + this.level);

        this.seektime = 0;
        this.level = levelChosen;

        // TODO Read from JSON-file

        var jsonFromLevelFileFake = {
            "musicmeta": {
                "title": "Enter darkness",
                "path": "assets/audio/enter_darkness/track.mp3",
                "background": "imgbackground.jpg",
                "offset": "6200",
                "bpm": "120",
                "duration": "8.5"
            },
            "notes": [
                {"1.45":[1,0,0,0]},
                {"5.67":[0,1,0,0]}
            ]
        }

        this.levelmetainfo = jsonFromLevelFileFake;

        //this.LoadAudio();

        return this.levelmetainfo.musicmeta;
    }

    public Start() {
        console.log('Conductor starting ' + this.level);

        this.music = this.scene.sound.add('rythmaudio', { loop: true });
        
        return this.levelmetainfo.notes;
    }

    public Play() {
        console.log('Conductor Play ' + this.level);

        this.music.play('', 0, 1, true);
    }

    public GetTime() {
        return this.music.seek;
    }

    private LoadAudio() {
        console.log('Conductor loading audio ' + this.levelmetainfo.musicmeta.path);

        //this.scene.load.audio('rythmaudio', this.levelmetainfo.musicmeta.path, null);
        //this.music = this.scene.sound.add('rythmaudio');
    }

}