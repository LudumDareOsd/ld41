class BootScene extends Phaser.Scene {

    constructor() {
      super({
        key: 'BootScene'
      });
    }

    preload() {
        this.load.image('background_title', 'assets/sprites/title_screen.png');
        
        this.load.image('background', 'assets/sprites/funk_background_bottom.png');
        this.load.image('foreground', 'assets/sprites/funk_background_top.png');
        this.load.image('bluenote', 'assets/sprites/blue_note.png');
        this.load.image('greennote', 'assets/sprites/green_note.png'); 
        this.load.image('rednote', 'assets/sprites/red_note.png');
        this.load.image('yellownote', 'assets/sprites/yellow_note.png');
        this.load.image('bluefunk', 'assets/sprites/blue_funk.png');
        this.load.image('greenfunk', 'assets/sprites/green_funk.png');
        this.load.image('redfunk', 'assets/sprites/red_funk.png');
        this.load.image('yellowfunk', 'assets/sprites/yellow_funk.png');
        this.load.image('asteroid', 'assets/sprites/mushroom.png');

        this.load.image('particle1', 'assets/sprites/particle_1.png');
        this.load.image('particle2', 'assets/sprites/particle_2.png');
        this.load.image('particle3', 'assets/sprites/particle_3.png');
    }

    create() {
        //this.add.image(400, 300, 'background_boot');
        //this.add.image(0, 0, 'background').setOrigin(0, 0);
        console.log("BOOTED");
        this.scene.start('TitleScene');
    }
}

export default BootScene;