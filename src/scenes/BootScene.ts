class BootScene extends Phaser.Scene {

    constructor() {
      super({
        key: 'BootScene'
      });
    }

    preload() {
        this.add.text(350, 200, 'Please stand by, loading...', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });

        var progress = this.add.graphics();
        this.load.on('fileprogress', function (file, value) {

            if (file.key === 'particle3') {
                progress.clear();
                progress.fillStyle(0xffffff, 0.4);
                let part = 13 / value;
                let width = 960 * part;
                progress.fillRect(0, 300, width, 200);
            }
    
        });
    
        this.load.on('complete', function () {
    
            progress.destroy();
    
        });

        this.load.image('background_title', 'assets/sprites/title_screen.png');
        this.load.audio('titleaudio', 'assets/audio/Rockit_Maxx_-_01_-_Be_Electric.mp3', null);
        this.load.image('unicorn', 'assets/sprites/unicorn.jpeg');
        this.load.image('background', 'assets/sprites/funk_background_bottom.png');
        this.load.image('foreground', 'assets/sprites/funk_background_top.png');
        this.load.image('bluenote', 'assets/sprites/blue_note.png');
        this.load.image('greennote', 'assets/sprites/green_note.png'); 
        this.load.image('rednote', 'assets/sprites/red_note.png');
        this.load.image('yellownote', 'assets/sprites/yellow_note.png');
        this.load.image('asteroid', 'assets/sprites/mushroom.png');
        this.load.image('particle1', 'assets/sprites/particle_1.png');
        this.load.image('particle2', 'assets/sprites/particle_2.png');
        this.load.image('particle3', 'assets/sprites/particle_3.png');
    }

    create() {
        this.add.text(350, 530, 'Loaded! Starting game...', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });

        console.log("BOOTED");
        this.scene.start('TitleScene');
    }
}

export default BootScene;