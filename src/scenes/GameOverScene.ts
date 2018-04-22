class GameOverScene extends Phaser.Scene {

    private music : any;
    private sprites = [];

    constructor() {
      super({
        key: 'GameOverScene'
      });
    }

    preload() {
        this.music = this.sound.add('gameoveraudio', { loop: true });
    }

    create() {

        this.add.image(0, 0, 'background_gameover').setOrigin(0, 0).depth = 1;
        this.music.play('', 0, 1, true);

        //-----------------------------------------------------------------------
        //  Create the particles
        for (var i = 0; i < 300; i++)
        {
            var x = Phaser.Math.Between(-64, 1300);
            var y = Phaser.Math.Between(-64, 1000);

            var image = this.add.image(x, y, 'particleyellow');

            image.setBlendMode(Phaser.BlendModes.ADD);
            image.setAlpha(0.5);
            image.depth = 0;

            this.sprites.push({ s: image, r: 2 + Math.random() * 6 });
        }

        //this.add.image(400, 300, 'unicorn').setBlendMode(Phaser.BlendModes.SCREEN);
        //-----------------------------------------------------------------------

        this.add.text(350, 200, 'Your highscore:' + localStorage.getItem('FunkEscapeScore'), { fontFamily: 'Arial', fontSize: 64, color: '#ff0000' });
        this.add.text(350, 270, 'Your current score:' + localStorage.getItem('FunkEscapeCurrentScore'), { fontFamily: 'Arial', fontSize: 64, color: '#ff0000' });

        this.add.zone(0, 0, 1280, 960).setName('StartGame').setInteractive();

        this.input.on('gameobjectdown', (pointer, gameObject) => {

            if(gameObject.name == 'StartGame') {
                this.music.stop();
                this.scene.start('PlayScene');
            }

        });

    }

    public update(time: number, delta: number) {
        for (var i = 0; i < this.sprites.length; i++)
        {
            var sprite = this.sprites[i].s;
            sprite.y -= this.sprites[i].r;

            if (sprite.y < -256)
            {
                sprite.y = 960;
            }
        }
    }
}

export default GameOverScene;