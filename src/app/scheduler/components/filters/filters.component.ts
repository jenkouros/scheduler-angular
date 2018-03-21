import { Component, OnInit, ElementRef } from '@angular/core';
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
    this.store.dispatch(new fromStore.LoadFilters());
    this.filtersState$ = this.store.select(fromStore.getFiltersState);
  }

  onFilterChange(id: number, value: number, remove: boolean) {
    if(!remove) {
      this.store.dispatch(new fromStore.SelectValueOnFilter({ id: id, value: value }));
    } else {
      this.store.dispatch(new fromStore.RemoveValueOnFilter({ id: id, value: value }));
    }
  }

}
