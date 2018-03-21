export interface Filter {
    sequence: number;
    name: string;
    id: number;
    type: string;
    values: FilterValue[];
}

export interface FilterValue {
    id: number; 
    name: string; 
    selected: boolean;
}

export enum FilterTypeEnum {
    checkbox = "checkbox",
    autocomplete = "autocomplete"
}
