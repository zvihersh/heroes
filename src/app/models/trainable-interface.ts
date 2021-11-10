export interface Trainable {
    trainerUuid: string;
    train(): void;
}