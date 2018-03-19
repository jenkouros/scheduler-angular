import { Filter } from "./filter.model";

export interface GroupFilter {
    id: number;
    name: string;
    type: string;
    filters: {id: number, values: number[]}[];
    containers: number[];
}