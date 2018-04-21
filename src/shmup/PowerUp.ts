export class PowerUp extends Phaser.Physics.Arcade.Sprite {

    public power: Power;

    constructor(private scene: Phaser.Scene, public x: number, public y: number, texture: string) {
        super(scene, x, y, texture);
    }
    
    // public setPower(power: Power) {
    //     this.power = power;
    // }
}

export enum Power {
    Funk
}