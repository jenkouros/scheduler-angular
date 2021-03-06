import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { GridStoreConfiguration } from '../../models/shared.dto';
import { AppComponentBase } from '../../../shared/app-component-base';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent extends AppComponentBase implements OnInit {
  @Input() searchItemStoreConfiguration: GridStoreConfiguration | null;
  @Input() searchPlanItemStoreConfiguration: GridStoreConfiguration | null;
  @Output() search = new EventEmitter<string>();
  @Output() openPlanItemInScheduler = new EventEmitter<{ dateStart: Date, idContainer: number }>();

  searchValue = '';

  constructor() {
    super();
   }

  ngOnInit() {
  }

  onSearch() {
    this.search.emit(this.searchValue);
  }

  onOpenInScheduler(data: { dateStart: Date, idContainer: number }) {
    this.openPlanItemInScheduler.emit(data);
  }

}
