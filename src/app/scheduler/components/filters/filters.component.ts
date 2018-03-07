import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';
import { FilterTypeEnum } from '../../models/filter.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  FilterTypeEnum: typeof FilterTypeEnum = FilterTypeEnum;

  filtersState$: Observable<fromStore.FilterState>;
  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    this.filtersState$ = this.store.select(fromStore.getFiltersState);
    this.store.dispatch(new fromStore.LoadFilters());
  }

}
