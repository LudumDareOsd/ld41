class WinScene extends Phaser.Scene {

    private music : any;

    constructor() {
      super({
        key: 'WinScene'
      });
    }

    preload() {
        //this.music = this.sound.add('titleaudio', { loop: true });
    }

    create() {
        console.log("WIN");

        /*this.add.image(0, 0, 'background_title').setOrigin(0, 0);
        this.music.play('', 0, 1, true);

        this.add.zone(65, 612, 225, 60).setName('StartGame').setInteractive();

        this.input.on('gameobjectdown', (pointer, gameObject) => {

            if(gameObject.name == 'StartGame') {
                this.music.stop();
                this.scene.start('PlayScene');
            }
    
        });*/

    }
}

export default WinScene;