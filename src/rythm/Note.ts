import { NoteType } from './NoteType';

export class Note extends Phaser.Physics.Arcade.Sprite {
    constructor(private scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
    }
}