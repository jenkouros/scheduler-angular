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
import { PlanItemHierarchyDto } from '../../models/planItem.dto';
import { PlanItemsService } from '../../services';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-planitem-list',
  templateUrl: './planitem-list.component.html',
  styleUrls: ['./planitem-list.component.css'],
  providers: [PlanItemsService]
})
export class PlanitemListComponent implements OnInit {
  planItemState$: Observable<PlanItemState>;
  selectedPlanItemHierarchy$: Observable<PlanItemHierarchyDto>;
  planItemStore: CustomStore;

  numberOfItemsOnPage = 0;
  popupVisible = false;
  data: any;

  constructor(private store: Store<fromStore.SchedulerState>, private planItemService: PlanItemsService) { }

  ngOnInit() {
    // this.loadPlanItemsOnPage();
    this.planItemState$ = this.store.select(fromStore.getPlanItemsState);
    this.selectedPlanItemHierarchy$ = this.store.select(fromStore.getSelectedPlanItemHierarchy);
    this.selectedPlanItemHierarchy$.subscribe(store => console.log(store));
    this.planItemStore = this.planItemService.getPlanItemsStore();

  }

  // changePageLength(length: number) {
  //   this.numberOfItemsOnPage = length;
  //   this.loadPlanItemsOnPage();
  // }

  // loadPlanItemsOnPage(page: number = 1) {
  //   this.store.dispatch(new fromStore.LoadPlanItems({ page: page, pageSize: this.numberOfItemsOnPage })); // izvedi akcijo
  // }

  log(test) {
    console.log(test);
  }

  showInfo(planItem: PlanItem) {
    this.store.dispatch(new fromStore.LoadPlanItemHierarchy({planItemId: planItem.id}));
    this.popupVisible = true;
  }

}
