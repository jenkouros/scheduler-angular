import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FilterValueSelect } from '../../../models/filter.viewModel';

@Component({
  selector: 'app-filter-checkbox',
  templateUrl: './filter-checkbox.component.html',
  styleUrls: ['./filter-checkbox.component.css']
})
export class FilterCheckboxComponent {
  @Input() filterValues: FilterValueSelect[];
  @Output() changeSelection = new EventEmitter<number[]>();

  getSelectedValues(): number[] {
    return this.filterValues
      .filter(i => i.selected)
      .map(i => i.id) || [];
  }



  onClick(id: number) {
    let selection = this.getSelectedValues();

    if (selection.indexOf(id) < 0) {
      selection.push(id);
    } else {
      selection = selection.filter(i => i !== id);
    }
    this.changeSelection.emit(selection);

  }
}
