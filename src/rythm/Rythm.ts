import { Note } from './Note';
import { Util } from '../utils/Util';

export class Rythm {

    private notes: Note[] = [];

    constructor(private scene: Phaser.Scene) {
           
    }

    public preload() {
    }

    public create() {
    }

    public update(time: number, delta: number) {
    //    this.scene.physics.add.sprite(100, 100, 'note').setVelocity(Util.getRandomInt(10, 100), Util.getRandomInt(10, 100));
    }



}