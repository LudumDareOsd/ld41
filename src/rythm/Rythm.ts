import { Note } from './Note';
import { Util } from '../utils/Util';
import { NoteType } from './NoteType';

export class Rythm {

    private notes: any;

    constructor(private scene: Phaser.Scene) {
    }

    public preload() {
    }

    public create() {
        this.notes = this.scene.physics.add.group();
    }

    public update(time: number, delta: number) {
        this.createNote(Util.getRandomInt(0, 3));
        this.checkWorldBound(this.notes.children.entries, this.scene.physics.world);
    }

    private createNote(type: NoteType) {
        this.notes.create(50 + (type * 100), 20, 'note').setVelocity(0, 100);
    }

    private checkWorldBound(children, world) {
        for(let item of children) {
            if(item.y > world.bounds.height) {
                item.destroy();
            }
        }
    }

}