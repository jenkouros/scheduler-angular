export interface Filter {
    sequence: number;
    name: string;
    id: number;
    type: string;
    values: { id: number, name: string }[];
}

export enum FilterTypeEnum {
    checkbox = "checkbox",
    autocomplete = "autocomplete"
}
