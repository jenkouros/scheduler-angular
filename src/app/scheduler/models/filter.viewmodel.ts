import { Filter, FilterValue } from './filter.dto';

export class FilterSelect extends Filter {
    valuesSelect: FilterValueSelect[];
    constructor(filter: Filter) {
        super();
        this.id = filter.id;
        this.name = filter.name;
        this.sequence = filter.sequence;
        this.type = filter.type;
        this.values = filter.values;
        this.valuesSelect = filter.values.map(f => new FilterValueSelect(f, false));
    }

    selectValues(values: number[]) {
        this.valuesSelect.forEach(x => {
            if (values.indexOf(x.id) > -1) {
                x.selected = true;
            }
        });
    }
}

export class FilterValueSelect extends FilterValue {
    selected: boolean;
    constructor(filterValue: FilterValue, selected: boolean) {
        super(filterValue.id, filterValue.name);
        this.selected = selected;
    }
}
