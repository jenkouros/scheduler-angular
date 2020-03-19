import { Filter, FilterValue } from './filter.dto';
import { Select } from './select.model';

export class FilterSelect extends Filter {
    valuesSelect: FilterValueSelect[];
    get selectedValues() {
        return this.valuesSelect.filter(i => i.selected);
    }
    static create(filter: Filter) {
        const result = new FilterSelect();
        result.id = filter.id;
        result.name = filter.name;
        result.sequence = filter.sequence;
        result.type = filter.type;
        result.values = filter.values;
        result.valuesSelect = filter.values.map(f => FilterValueSelect.createSelect(f, false));
        result.recreateOnToggle = filter.recreateOnToggle;
        return result;
    }

    selectValues(values: number[]) {
        this.valuesSelect.forEach(x => {
            if (values.indexOf(x.id) > -1) {
                x.selected = true;
            }
        });
    }
}

export class FilterValueSelect extends FilterValue implements Select {
    selected: boolean;
    displayName;
    static createSelect (filterValue: FilterValue, selected: boolean) {
        const result = new FilterValueSelect();
        result.id = filterValue.id;
        result.name = filterValue.name;
        result.displayName = filterValue.name;
        result.selected = selected;
        return result;
    }
}
