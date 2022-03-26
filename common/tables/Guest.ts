export enum Gender {
    M = 'M',
    F = 'F',
    O = 'O'
}

export interface Guest {
    guestnb: string;
    nas: string;
    name: string;
    gender: Gender;
    city: string;
}