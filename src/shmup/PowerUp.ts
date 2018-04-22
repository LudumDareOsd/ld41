export class PowerUp extends Phaser.Physics.Arcade.Sprite {

    public power: Power;

    constructor(private scene: Phaser.Scene, public x: number, public y: number, texture: string) {
        super(scene, x, y, texture);
    }
    
}

export enum Power {
    Funk
}