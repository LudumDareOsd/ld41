import { Shmup } from './Shmup'
import { Rythm } from '../rythm/Rythm'

export class Communicator {

    constructor(public shmup: Shmup, public rythm: Rythm) {

    }

    public adjustObstacleVelocity(multiplier: number) {
        this.shmup.adjustObstacleVelocity(multiplier);
    }

    public adjustFunk(amount: number) {

    }


}