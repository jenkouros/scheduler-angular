import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DxPopupComponent, DxDataGridComponent } from 'devextreme-angular';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import 'rxjs/add/operator/take';

import { PlanItemState } from '../../store/reducers/planitems.reducer';
import { PlanItemHierarchyDto } from '../../models/planItem.dto';
import CustomStore from 'devextreme/data/custom_store';
import { PlanItem, PlanItemHierarchyAlternative } from '../../models/planitem.model';
import { LoadPlanItems } from '../../store';

@Component({
  selector: 'app-planitem-list',
  templateUrl: './planitem-list.component.html',
  styleUrls: ['./planitem-list.component.css']
})
export class PlanitemListComponent implements OnInit {
  alternatives: PlanItemHierarchyAlternative[];
  planItemsStore: CustomStore;
  selectedPlanItemHierarchy$: Observable<PlanItemHierarchyDto>;

  selectedAlternative: number = null;
  numberOfItemsOnPage = 0;
  popupVisible = false;
  data: any;

  constructor(
    private store: Store<fromStore.SchedulerState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadPlanItems());
    this.store.select(fromStore.getPlanItemsStore)
      .take(1).subscribe(itemsStore => this.planItemsStore = itemsStore);
    this.selectedPlanItemHierarchy$ = this.store.select(fromStore.getSelectedPlanItemHierarchy);
    this.selectedPlanItemHierarchy$.subscribe(hierarchy => {
      if (!hierarchy.planItemHierarchy) {
        return;
      }
      this.alternatives = hierarchy.planItemHierarchy.alternatives;
    });
  }

  log(test) {
    console.log(test);
  }

  showInfo(planItem: PlanItem) {
    this.store.dispatch(new fromStore.LoadPlanItemHierarchy({planItemId: planItem.idPlanItem}));
    this.popupVisible = true;
  }

  selectAlternative(alternativeId: number) {
    this.selectedAlternative = alternativeId;
  }

}
