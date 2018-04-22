class TitleScene extends Phaser.Scene {

    constructor() {
      super({
        key: 'TitleScene'
      });
    }

    preload() {
        //this.load.audio('bootaudio', '', null);
    }

    create() {
        this.add.image(0, 0, 'background_title').setOrigin(0, 0);

        console.log("TITLED");
        this.scene.start('PlayScene');
    }
}

export default TitleScene;