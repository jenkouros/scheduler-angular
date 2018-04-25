import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DxPopupComponent, DxDataGridComponent } from 'devextreme-angular';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import 'rxjs/add/operator/take';

import { PlanItemState } from '../../store/reducers/planitems.reducer';
import { PlanItemHierarchyViewModel } from '../../models/planitem.viewmodel';
import CustomStore from 'devextreme/data/custom_store';
import { PlanItem, PlanItemHierarchyAlternative } from '../../models/planitem.dto';
import { LoadPlanItems, LoadPreplanItems } from '../../store';

@Component({
  selector: 'app-planitem-list',
  templateUrl: './planitem-list.component.html',
  styleUrls: ['./planitem-list.component.css']
})
export class PlanitemListComponent implements OnInit {
  alternatives: PlanItemHierarchyAlternative[];
  planItemsStore: CustomStore;
  selectedPlanItemHierarchy$: Observable<PlanItemHierarchyViewModel>;
  selectedAlternativeId = null;
  popupVisible = false;

  constructor(private store: Store<fromStore.SchedulerState>) {
    this.logClick = this.logClick.bind(this);
    this.hidePlanInfo = this.hidePlanInfo.bind(this);
  }

  ngOnInit() {
    this.store.dispatch(new LoadPreplanItems());
    this.store.dispatch(new LoadPlanItems());
    this.store.select(fromStore.getPlanItemsStore)
      .take(1).subscribe(itemsStore => this.planItemsStore = itemsStore);
    this.selectedPlanItemHierarchy$ = this.store.select(fromStore.getSelectedPlanItemHierarchy);
    this.selectedPlanItemHierarchy$.subscribe(hierarchy => {
      this.alternatives = hierarchy.planItemHierarchy
        ? hierarchy.planItemHierarchy.alternatives
        : null;
      this.selectedAlternativeId = this.alternatives && this.alternatives.length > 0 ? this.alternatives[0].id : null;
    });
  }

  log(test) {
    console.log(test);
  }

  logClick() {
    console.log('Clicked button');
    this.hidePlanInfo();
  }

  hidePlanInfo() {
    this.popupVisible = false;
  }

  showPlanInfo(planItem: PlanItem) {
    this.store.dispatch(new fromStore.LoadPlanItemHierarchy({planItemId: planItem.idItem}));
    this.popupVisible = true;
  }

  selectAlternative(alternativeId: number) {
    this.selectedAlternativeId = alternativeId;
  }

  getSelectedAlternative() {
    return this.alternatives.find(i => i.id === this.selectedAlternativeId);
  }

}
