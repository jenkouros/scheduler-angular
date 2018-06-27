export interface Calendar {
    id: number;
    name: string;
    description: string;
    timeStart: Date;
    timeEnd: Date;
}

export interface Rule {
    id: number;
    name: string;
    description: string;
    timeStart: Date;
    timeEnd: Date;
}

export interface RuleRepeatOption {
    id: number;
}

export interface Schedule {
    id: number;
    timeStart: Date;
    timeEnd: Date;
}
