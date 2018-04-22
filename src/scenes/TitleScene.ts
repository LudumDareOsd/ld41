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
        let start = this.add.sprite(448, 583, 'startguld').setOrigin(0, 0); start.alpha = 0;
        let instructions = this.add.sprite(386, 448, 'instructionguld').setOrigin(0, 0); instructions.alpha = 0;
        this.music.play('', 0, 1, true);

        this.add.zone(444, 523, 516, 173).setName('StartGame').setInteractive();
        this.add.zone(380, 445, 392, 103).setName('Instructions').setInteractive();

        this.input.on('gameobjectover', (pointer, gameObject) => {
          if(gameObject.name == 'StartGame') {
            start.alpha = 1;
          } else if(gameObject.name == 'Instructions') {
            instructions.alpha = 1;
          }
        });
        this.input.on('gameobjectout', (pointer, gameObject) => {
          if(gameObject.name == 'StartGame') {
            start.alpha = 0;
          } else if(gameObject.name == 'Instructions') {
            instructions.alpha = 0;
          }
        });

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

        this.input.on('pointerover', (event) => {
            document.getElementsByTagName('canvas')[0].style.cursor = "crosshair";
        });

        this.input.on('pointerout', (event) => {
            document.getElementsByTagName('canvas')[0].style.cursor = "default";
        });

    }

}

export default TitleScene;