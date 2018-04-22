import { Shmup } from './Shmup'
import { Rythm } from '../rythm/Rythm'
import { NoteType } from '../rythm/NoteType';

export class Communicator {

    public shmup: Shmup;
    public rythm: Rythm;

    constructor() {

    }

    public getScore(): number {
        return this.rythm.getScore();
    }

    public nuke() {
        this.shmup.nuke();
    }

    public adjustShmupWorldVelocity(multiplier: number) {
        this.shmup.adjustVelocity(multiplier);
    }

    public setShmupWorldVelocity(velocity: number) {
        this.shmup.adjustVelocity(velocity);
    }
    
    public adjustAsteroidInterval(multiplier: number) {
        this.shmup.adjustAsteroidInterval(multiplier);
    }

    public setAsteroidInterval(interval: number) {
        this.shmup.setAsteroidInterval(interval);
    }

    public adjustPowerUpInterval(multiplier: number) {
        this.shmup.adjustPowerUpInterval(multiplier);
    }

    public setPowerUpInterval(interval: number) {
        this.shmup.setPowerUpInterval(interval);
    }

    public getFunkAmount() {
        return this.rythm.funkOMeter.getFunkAmount();
    }

    public addFunk(type: NoteType) {
        this.rythm.funkOMeter.addFunk(type);
    }

    public removeFunk(amount: number) {
        this.rythm.funkOMeter.removeFunk(amount);
    }
}