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

    create(data: any) {

        if (!data.dontStartMusic) {
          this.music.play('', 0, 1, true);
        }

        this.add.image(0, 0, 'background_title').setOrigin(0, 0);
        let start = this.add.sprite(448, 583, 'startguld').setOrigin(0, 0); start.alpha = 0;
        let instructions = this.add.sprite(386, 448, 'instructionguld').setOrigin(0, 0); instructions.alpha = 0;

        this.add.zone(444, 555, 435, 153).setName('StartGame').setInteractive();
        this.add.zone(380, 445, 550, 103).setName('Instructions').setInteractive();

        this.input.on('gameobjectover', (pointer, gameObject) => {
          if(gameObject.name == 'StartGame') {
            start.alpha = 1;
          } else if(gameObject.name == 'Instructions') {
            instructions.alpha = 1;
          }
          document.getElementsByTagName('canvas')[0].style.cursor = "crosshair";
        });
        this.input.on('gameobjectout', (pointer, gameObject) => {
          if(gameObject.name == 'StartGame') {
            start.alpha = 0;
          } else if(gameObject.name == 'Instructions') {
            instructions.alpha = 0;
          }
          document.getElementsByTagName('canvas')[0].style.cursor = "default";
        });

        this.input.on('gameobjectdown', (pointer, gameObject) => {
            if(gameObject.name == 'StartGame') {
                document.getElementsByTagName('canvas')[0].style.cursor = "default";
                this.music.stop();
                if (data.musicRef) {
                  data.musicRef.stop();
                }
                this.scene.start('PlayScene');
            }

            if(gameObject.name == 'Instructions') {
                this.scene.start('InstructionScene', { musicRef: this.music });
            }
        });

    }

}

export default TitleScene;