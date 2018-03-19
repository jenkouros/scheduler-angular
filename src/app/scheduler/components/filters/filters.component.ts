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

  selectedPeople1 = [1,2];

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadFilters());
    this.filtersState$ = this.store.select(fromStore.getFiltersState);

    this.store.select(fromStore.getSelectedFilters).subscribe(f => {
      this.selectedPeople1 = f[2];
    });
  }

  onCheckBoxClick(id, value) {
    console.log(id + " " + value);
  }

  onChange($event: number[], id: string) {
    var dict: { [id:number]: number[] } = {};
    dict[id] = $event;

    console.log($event + ", with parent id: " + id);
    this.store.dispatch(new fromStore.ChangeFilter(dict));
  }

  clearModel1() {
    this.selectedPeople1 = [];
  }

}
