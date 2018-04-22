class TitleScene extends Phaser.Scene {

    private music : any;

    constructor() {
      super({
        key: 'TitleScene'
      });
    }

    preload() {
        this.music = this.sound.add('titleaudio', { loop: true });
    }

    create() {

        this.add.image(0, 0, 'background_title').setOrigin(0, 0);
        this.music.play('', 0, 1, true);

        this.add.zone(444, 523, 516, 173).setName('StartGame').setInteractive();
        this.add.zone(380, 445, 392, 103).setName('Instructions').setInteractive();

        this.input.on('gameobjectdown', (pointer, gameObject) => {

            if(gameObject.name == 'StartGame') {
                document.getElementsByTagName('canvas')[0].style.cursor = "default";
                this.music.stop();
                this.scene.start('PlayScene');
            }

            if(gameObject.name == 'Instructions') {
                this.music.stop();
                this.scene.start('InstructionScene');
            }
    
        });

        // pointerdown
        this.input.on('pointerover', (event) => {

            document.getElementsByTagName('canvas')[0].style.cursor = "crosshair";
    
        });

        this.input.on('pointerout', (event) => {

            document.getElementsByTagName('canvas')[0].style.cursor = "default";
    
        });

    }

}

export default TitleScene;