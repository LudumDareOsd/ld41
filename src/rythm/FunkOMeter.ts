import { NoteType } from './NoteType';

export class FunkOMeter {

  private sprites = [];

  constructor(private scene: Phaser.Scene) {
  }

  public addFunk(type: NoteType) {
    let sprite = this.scene.add.sprite(312, 830 - (this.sprites.length * 13), this.getFunkName(type));
    sprite.setDepth(2);
    this.sprites.push(sprite);
  }

  public removeFunk(amount: number) {
    let removed = this.sprites.splice(this.sprites.length - amount, amount);
    for(let item of removed) {
      item.destroy();
    }
  }

  public getFunkAmount() {
    return this.sprites.length;
  }

  private getFunkName(type: NoteType) {
      if(type == NoteType.left) {
        return 'bluefunk';
      } else if(type == NoteType.midleft) {
        return 'greenfunk';
      } else if(type == NoteType.midright) {
        return 'redfunk';
      } else if(type == NoteType.right) {
        return 'yellowfunk';
      }
  }
}