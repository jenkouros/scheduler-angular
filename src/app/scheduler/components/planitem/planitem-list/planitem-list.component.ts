import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../../store';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import CustomStore from 'devextreme/data/custom_store';
import { PlanItem } from '../../../models/planitem.dto';

@Component({
  selector: 'app-planitem-list',
  templateUrl: './planitem-list.component.html',
  styleUrls: ['./planitem-list.component.css']
})
export class PlanitemListComponent implements OnInit {
  planItemsStore: CustomStore | null;

  constructor(private store: Store<fromStore.SchedulerState>) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadPlanItems());
    this.store.select(fromStore.getPlanItemsStore)
      .take(1)
      .subscribe(itemsStore => this.planItemsStore = itemsStore);
  }

  showPlanInfo(planItem: PlanItem) {
    this.store.dispatch(new fromStore.LoadPlanItemHierarchy({planItemId: planItem.idItem}));
    this.store.dispatch(new fromStore.ShowPlanItemPopup());
  }

}
