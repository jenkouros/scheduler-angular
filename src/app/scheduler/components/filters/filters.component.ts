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
  selectedFilters$: Observable<{ [id: string]: number[] }>;

  filtersState$: Observable<fromStore.FilterState>;
  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadFilters());
    this.filtersState$ = this.store.select(fromStore.getFiltersState);

    this.selectedFilters$ = this.store.select(fromStore.getSelectedFilters);
    
    //TEST - change filter: this.store.dispatch(new fromStore.ChangeFilter({ "1": [89, 43] }));
  }

}
