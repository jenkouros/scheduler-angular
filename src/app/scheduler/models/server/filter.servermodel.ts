export interface FilterServer {
    sequence: number;
    name: string;
    id: number;
    type: string;
    values?: FilterValueServer[];
}

export interface FilterValueServer {
    id: number;
    name: string;
}
