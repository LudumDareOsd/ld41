class GameOverScene extends Phaser.Scene {

    private music : any;

    constructor() {
      super({
        key: 'GameOverScene'
      });
    }

    preload() {
        this.music = this.sound.add('gameoveraudio', { loop: true });
    }

    create() {

        this.add.image(0, 0, 'background_gameover').setOrigin(0, 0);
        this.music.play('', 0, 1, true);

        this.add.zone(0, 0, 1280, 960).setName('StartGame').setInteractive();

        this.input.on('gameobjectdown', (pointer, gameObject) => {

            if(gameObject.name == 'StartGame') {
                this.music.stop();
                this.scene.start('PlayScene');
            }
    
        });

    }
}

export default GameOverScene;