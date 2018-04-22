class WinScene extends Phaser.Scene {

    private music : any;

    constructor() {
      super({
        key: 'WinScene'
      });
    }

    preload() {
        this.music = this.sound.add('titleaudio', { loop: true });
    }

    create() {

        this.add.image(0, 0, 'background_win').setOrigin(0, 0);
        this.music.stop();
        this.music.play('', 0, 1, true);

        //----------------------------------------------------------------------
        var source = this.textures.get('unicorn').source[0].image;
        var canvas = this.textures.createCanvas('pad', 38, 49).source[0].image as any;

        var ctx = canvas.getContext('2d');
    
        ctx.drawImage(source, 0, 0);
    
        var imageData = ctx.getImageData(0, 0, 38, 49);
    
        var x = 0;
        var y = 0;
        var color = new Phaser.Display.Color() as any;
    
        for (var i = 0; i < imageData.data.length; i += 4)
        {
            var r = imageData.data[i];
            var g = imageData.data[i + 1];
            var b = imageData.data[i + 2];
            var a = imageData.data[i + 3];
    
            if (a > 0)
            {
                // var startX = 1024/2;
                // var startY = 800;
    
                var startX = Phaser.Math.Between(0, 1024);
                var startY = Phaser.Math.Between(0, 768);
    
                var dx = 200 + x * 16;
                var dy = 64 + y * 16;
    
                var image = this.add.image(startX, startY, 'pixel').setScale(0) as any;
    
                color.setTo(r, g, b, a);
    
                image.setTint(color.color);
    
                this.tweens.add({
    
                    targets: image,
                    duration: 2000,
                    x: dx,
                    y: dy,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 360,
                    delay: i / 1.5,
                    yoyo: true,
                    repeat: -1,
                    repeatDelay: 6000,
                    hold: 6000
    
                });
            }
    
            x++;
    
            if (x === 38)
            {
                x = 0;
                y++;
            }
        }
        //----------------------------------------------------------------------

        this.add.text(350, 700, 'Your highscore:' + localStorage.getItem('FunkEscapeScore'), { fontFamily: 'Arial', fontSize: 64, color: '#ff0000' });
        this.add.text(350, 770, 'Your current score:' + localStorage.getItem('FunkEscapeCurrentScore'), { fontFamily: 'Arial', fontSize: 64, color: '#ff0000' });

        this.add.zone(0, 0, 1280, 960).setName('StartGame').setInteractive();

        this.input.on('gameobjectdown', (pointer, gameObject) => {

            if(gameObject.name == 'StartGame') {
                this.music.stop();
                this.scene.start('PlayScene');
            }
    
        });

    }
}

export default WinScene;