import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Plan } from '../../models/plan.model';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  plan: Plan | null;
  plans$: Observable<Plan[]>;
  isDeletePopupVisible$: Observable<boolean>;
  constructor(private store: Store<fromStore.SchedulerPlansState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadPlans());

    this.plans$ = this.store.select(fromStore.getPlans);
    this.isDeletePopupVisible$ = this.store.select(fromStore.getDeletePlanPopupVisibility);
  }

  onSelect(id: number) {
    console.log(id);
    this.store.dispatch(new fromStore.SelectPlan(id));
  }

  confirmDelete(plan: Plan) {
    this.plan = plan;
    this.store.dispatch(new fromStore.PlanDeletePopupVisible(true));
  }

  onConfirmRemove(plan: Plan) {
    if (plan) {
      this.store.dispatch(new fromStore.RemovePlan(plan));
      this.plan = null;
    }
  }

  onCancelRemove() {
    this.store.dispatch(new fromStore.PlanDeletePopupVisible(false));
  }
}
