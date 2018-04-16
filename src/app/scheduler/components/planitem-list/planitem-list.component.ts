import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PlanItemState } from '../../store/reducers/planitems.reducer';
import { Pagination } from '../../../shared/shared.model';

import { PlanItem } from '../../models/planitem.model';
import { ItemsList } from '@ng-select/ng-select/ng-select/items-list';
import {
  DxPopupComponent,
  DxDataGridComponent
} from 'devextreme-angular';
@Component({
  selector: 'app-planitem-list',
  templateUrl: './planitem-list.component.html',
  styleUrls: ['./planitem-list.component.css']
})
export class PlanitemListComponent implements OnInit {
  planItemState$: Observable<PlanItemState>;
  numberOfItemsOnPage = 0;

    currentPlanItemStateId: number;
    cuurentPlanItemState;
    popupVisible = false;

  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    this.loadPlanItemsOnPage();
    this.planItemState$ = this.store.select(fromStore.getPlanItemsState);
    this.planItemState$.subscribe(store =>console.log(store));
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

  showInfo(id) {
    // this.planItemState$.subscribe(item => this.cuurentPlanItemState = item); 
    
    this.currentPlanItemStateId = id;
    this.popupVisible = true;
    this.planItemState$[id]


    console.log("=====>" + this);
}

}
