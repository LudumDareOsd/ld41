class TitleScene extends Phaser.Scene {

    constructor() {
      super({
        key: 'TitleScene'
      });
    }

    preload() {
        //this.load.image('background_boot', 'assets/sprites/funk_background_bottom.png');
        //this.load.audio('bootaudio', '', null);
    }

    create() {
        //this.add.image(400, 300, 'background_boot');
        //this.add.image(0, 0, 'background').setOrigin(0, 0);

        console.log("TITLED");
        this.scene.start('PlayScene');
    }
}

export default TitleScene;