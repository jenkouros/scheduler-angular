import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterSelectValue } from '../../../models/filter.model';


@Component({
  selector: 'app-filter-autocomplete',
  templateUrl: './filter-autocomplete.component.html',
  styleUrls: ['./filter-autocomplete.component.css']
})
export class FilterAutocompleteComponent implements OnInit {
  @Input() filterValues: FilterSelectValue[];
  @Input() placeholder: string;
  @Output() add = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  
  selectedValues: number[] = [];

  constructor() { }

  ngOnInit() {
    this.selectedValues = this.filterValues
      .filter(x => x.selected)
      .map(x => x.id);
  }
  
  onChange(value: number, remove: boolean) {
    if(!remove) {
      this.add.emit(value);
    } 
    else {
      this.remove.emit(value);
    }
  }

}
