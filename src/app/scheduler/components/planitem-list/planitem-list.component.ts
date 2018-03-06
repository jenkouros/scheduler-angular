import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PlanItemState } from '../../store/reducers/planitems.reducer';

@Component({
  selector: 'app-planitem-list',
  templateUrl: './planitem-list.component.html',
  styleUrls: ['./planitem-list.component.css']
})
export class PlanitemListComponent implements OnInit {
  planItemState$: Observable<PlanItemState>;

  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadPlanItems()); // izvedi akcijo
    this.planItemState$ = this.store.select(fromStore.getPlanItemsState); // pridobi podatke
  }

}
