class InstructionScene extends Phaser.Scene {

    private music : any;

    constructor() {
      super({
        key: 'InstructionScene'
      });
    }

    preload() {

    }

    create() {

        this.add.image(0, 0, 'background_title').setOrigin(0, 0);
        this.add.image(0, 0, 'background_instruction').setOrigin(0, 0);
        this.add.zone(0, 0, 1280, 960).setName('ToTitle').setInteractive();

        this.input.on('gameobjectdown', (pointer, gameObject) => {

            if(gameObject.name == 'ToTitle') {
                this.scene.start('TitleScene');
            }

        });

    }

}

export default InstructionScene;