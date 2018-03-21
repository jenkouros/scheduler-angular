import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Filter, FilterValue } from '../../../models/filter.model';

@Component({
  selector: 'app-filter-checkbox',
  templateUrl: './filter-checkbox.component.html',
  styleUrls: ['./filter-checkbox.component.css']
})
export class FilterCheckboxComponent implements OnInit {
  @Input() filterValues: FilterValue[];
  @Output() add = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit() {
  }

  onCheckboxClick(value, btnRef: HTMLElement) {
    if(!btnRef.classList.contains("active")) {
      this.add.emit(value);
    } else {
      this.remove.emit(value);
    }
  }

}
