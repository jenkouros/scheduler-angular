import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  @Input() searchItemStore: CustomStore | null;
  @Input() searchPlanItemStore: CustomStore | null;
  @Output() search = new EventEmitter<string>();
  @Output() openPlanItemInScheduler = new EventEmitter<{ dateStart: Date, idContainer: number }>();

  searchValue = '';

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    this.search.emit(this.searchValue);
  }

  onOpenInScheduler(data: { dateStart: Date, idContainer: number }) {
    this.openPlanItemInScheduler.emit(data);
  }

}
