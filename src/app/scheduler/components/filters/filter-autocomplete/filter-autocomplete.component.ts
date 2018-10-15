import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FilterValueSelect } from '../../../models/filter.viewModel';
import { Select } from '../../../models/select.model';
import { DxTreeViewComponent, DxListComponent } from 'devextreme-angular';


@Component({
  selector: 'app-filter-autocomplete',
  templateUrl: './filter-autocomplete.component.html',
  styleUrls: ['./filter-autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterAutocompleteComponent implements OnInit {
  @Input() filterValues: Select[];
  @Input() placeholder: string;
  @Output() changeSelection = new EventEmitter<number[]>();
  @ViewChild(DxListComponent) listView: DxListComponent;

  private _selectedValues: number[] = [];

  get selectedValues(): number[] {
    return this._selectedValues;
}

set selectedValues(value: number[]) {
    this._selectedValues = value || [];
}


  ngOnInit() {
    this.selectedValues = this.filterValues.filter(i => i.selected).map(i => i.id);
  }

  onChange(ev) {
    this.selectedValues = this.listView.selectedItemKeys;
  }

  syncListSelection() {
    const component = (this.listView && this.listView.instance);

    if (!component) { return; }

    if (!component) { return; }

    if (!this.selectedValues.length) {
        component.unselectAll();
    }

    if (this.selectedValues) {
        this.selectedValues.forEach(value => {
            component.selectItem(this.filterValues.filter(f => f.id === value));
        });
    }
  }

  onClose(ev) {
    this.changeSelection.emit([...this.selectedValues]);
  }

}
