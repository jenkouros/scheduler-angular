export interface GroupFilterServer {
    id: number;
    name: string;
    type: string;
    filters: {id: number, values: number[]}[];
    containers: number[];
}
