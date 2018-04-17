export interface Filter {
    sequence: number;
    name: string;
    id: number;
    type: string;
    values?: FilterValue[];
}

export interface FilterValue {
    id: number;
    name: string;
}

export class FilterSelect implements Filter {
    sequence: number;
    name: string;
    id: number;
    type: string;
    selectedValues: FilterSelectValue[];

    constructor(filter: Filter) {
        this.id = filter.id;
        this.name = filter.name;
        this.sequence = filter.sequence;
        this.type = filter.type;
        this.selectedValues = filter.values.map(v =>
            new FilterSelectValue(v.id, v.name, false));
    }

    selectValues(values: number[]) {
        this.selectedValues.forEach(x => {
            if (values.indexOf(x.id) > -1) {
                x.selected = true;
            }
        });
    }
}

export class FilterSelectValue {
    constructor(
        public id: number,
        public name: string,
        public selected: boolean) {}
}

export enum FilterTypeEnum {
    checkbox = 'checkbox',
    autocomplete = 'autocomplete'
}
