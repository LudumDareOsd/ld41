import { Shmup } from './Shmup'
import { Rythm } from '../rythm/Rythm'

export class Communicator {

    public shmup: Shmup;
    public rythm: Rythm;

    constructor() {

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

    public adjustFunk(amount: number) {

    }


}