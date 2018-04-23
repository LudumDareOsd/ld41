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

    create(data: any) {
        let background = this.add.image(0, 0, 'background_gameover')
        background.setOrigin(0, 0);
        background.setDepth(1);

        this.music.play('', 0, 1, true);

        //-----------------------------------------------------------------------
        //  Create the particles
        for (var i = 0; i < 300; i++)
        {
            var x = Phaser.Math.Between(-64, 1300);
            var y = Phaser.Math.Between(-64, 1000);

            var image = this.add.image(x, y, 'particleyellow');

            image.setBlendMode(Phaser.BlendModes.ADD);
            image.setAlpha(0.3);
            image.depth = 0;

            this.sprites.push({ s: image, r: 2 + Math.random() * 4 });
        }

        //this.add.image(400, 300, 'unicorn').setBlendMode(Phaser.BlendModes.SCREEN);
        //-----------------------------------------------------------------------

        let winScore = 0;
        let maxScore = 400000;
        let currScore = data.distance;
        let percDone = (( maxScore - parseInt(currScore)) / maxScore) * 100;
        var rounded = Math.round( percDone * 10 ) / 10;

        let hightscore = localStorage.getItem('FunkEscapeScore');
        if(!hightscore) {
          hightscore = currScore;
        }
        this.add.text(100, 600, 'Best: ' + hightscore + 'km from escaping!', { fontFamily: 'Arial', fontSize: 50, color: '#1177bb' });
        this.add.text(100, 660, 'Current: ' + currScore + 'km from escaping!', { fontFamily: 'Arial', fontSize: 40, color: '#1177bb' });
        this.add.text(100, 850, 'You reached ' + rounded + '% of the level!', { fontFamily: 'Arial', fontSize: 50, color: '#00aaaa' });

        this.add.zone(0, 0, 1280, 960).setName('StartGame').setInteractive();

        this.input.on('gameobjectdown', (pointer, gameObject) => {

            if(gameObject.name == 'StartGame') {
                this.music.stop();
                this.scene.start('TitleScene');
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