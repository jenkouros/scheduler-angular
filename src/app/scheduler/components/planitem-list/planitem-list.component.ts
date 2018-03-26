import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PlanItemState } from '../../store/reducers/planitems.reducer';
import { Pagination } from '../../../shared/shared.model';

@Component({
  selector: 'app-planitem-list',
  templateUrl: './planitem-list.component.html',
  styleUrls: ['./planitem-list.component.css']
})
export class PlanitemListComponent implements OnInit {
  planItemState$: Observable<PlanItemState>;
  numberOfItemsOnPage = 0;

  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    this.loadPlanItemsOnPage();
    this.planItemState$ = this.store.select(fromStore.getPlanItemsState);
  }

  changePageLength(length: number) {
    this.numberOfItemsOnPage = length;
    this.loadPlanItemsOnPage();
  }

  loadPlanItemsOnPage(page: number = 1) {
    this.store.dispatch(new fromStore.LoadPlanItems({ page: page, pageSize: this.numberOfItemsOnPage })); // izvedi akcijo 
  }

  log(test) {
    console.log(test);
  }

}
