import { NoteType } from './NoteType';

export class Rythm {

    private notes: any;
    private timer = 0;

    constructor(private scene: Phaser.Scene) {
    }

    public preload() {
    }

    public create() {
        this.notes = this.scene.physics.add.group();
    }

    public update(time: number, delta: number) {
        if(this.timer > 500) {
            this.createNote(Phaser.Math.Between(0, 3));
            this.timer = 0;
        }

        this.timer += delta;
        this.checkWorldBound(this.notes.children.entries, this.scene.physics.world);
    }

    private createNote(type: NoteType) {
        this.notes.create(50 + (type * 80), 20, this.getTexture(type)).setVelocity(0, 100);
    }

    private getTexture(type: NoteType) {
        if (type == NoteType.left) {
            return 'bluenote';
        } else if (type == NoteType.midleft) {
            return 'greennote';
        } else if (type == NoteType.midright) {
            return 'rednote';
        } else if (type == NoteType.right) {
            return 'yellownote';
        }
    }

    private checkWorldBound(children, world) {
        for (let item of children) {
            if (item.y > world.bounds.height) {
                item.destroy();
            }
        }
    }

}