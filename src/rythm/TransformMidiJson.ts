export class TransformMidiJson {

    public Transform() {
        // Change to midi-file that should be transformed... :-)
        this.loadJSON("assets/audio/enter_darkness/midi.json", (response) => {
        
            var midijson = JSON.parse(response);
            //console.log('JSON Level load:' + response);
            //console.log('JSON Level load:' + JSON.stringify(midijson));

            this.TransformToGameJson(midijson);
        });
    }

    private TransformToGameJson(midijson) {
        console.log('Transform, Midi json is ' + JSON.stringify(midijson));

        var jsonDataGame = { 
            "musicmeta": {
            "title": "TODO-TITLE",
            "path": "TODO-PATH",
            "background": "TODO-BKG",
            "offset": "0",
            "bpm": "0",
            "duration": "0"
            },
            "notes": [
            ]
        };

        jsonDataGame.musicmeta.bpm = midijson.header.bpm;
        jsonDataGame.musicmeta.duration = midijson.duration;

        for(var i = 0; i < midijson.tracks[0].notes.length; i++) {
            var midiobjnote = midijson.tracks[0].notes[i];
            var gameNote = this.GameNote(midiobjnote.name);
            var gameTime = midiobjnote.time;

            var currnote = {[gameTime]: gameNote};

            jsonDataGame.notes.push(currnote);
        }

        console.log("Transformed to GameJson:"+JSON.stringify(jsonDataGame));

        return jsonDataGame;
    }

    private GameNote(midiNote) {
        if(midiNote == "D3") {
            return 0;
        }
        if(midiNote == "A#2") {
            return 1;
        }
        if(midiNote == "G#2") {
            return 2;
        }
        if(midiNote == "F2") {
            return 3;
        }
        return 0;
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