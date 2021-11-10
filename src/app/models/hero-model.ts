import { Trainable } from './trainable-interface';

export class Hero implements Trainable {
    constructor (
        public name: string,
        public attacker: boolean,
        public guid: string,
        public trainStart: Date,
        public suitColors: string[],
        public startingPower: number,
        public currentPower: number,
        public canTrain: boolean,
        public trainerUuid: string
    ) { }

    train() {
        this.currentPower += Math.floor(Math.random() * 10);
    }

    static build(hero: Hero) {
        return new Hero(
            hero.name,
            hero.attacker,
            hero.guid,
            hero.trainStart,
            hero.suitColors,
            hero.startingPower,
            hero.currentPower,
            hero.canTrain,
            hero.trainerUuid
        );
    }
}