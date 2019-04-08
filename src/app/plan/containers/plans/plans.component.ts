import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Plan } from '../../models/plan.model';
import { Simulation } from '../../models/change.model';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  plan: Plan | null;
  plans$: Observable<Plan[]>;
  isDeletePopupVisible$: Observable<boolean>;
  isPopupVisible$: Observable<boolean>;

  simulations$: Observable<Simulation[]>;
  isSimulationPopupVisible$: Observable<boolean>;

  constructor(private store: Store<fromStore.SchedulerPlansState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadPlans());

    this.plans$ = this.store.select(fromStore.getPlans);
    this.isDeletePopupVisible$ = this.store.select(fromStore.getDeletePlanPopupVisibility);
    this.isPopupVisible$ = this.store.select(fromStore.getPlanPopupVisibility);

    // simulation
    this.simulations$ = this.store.select(fromStore.getSimulationsList);
    this.isSimulationPopupVisible$ = this.store.select(fromStore.getSimulationPopupVisibility);
  }

  onSelect(id: number) {
    console.log(id);
    this.store.dispatch(new fromStore.SelectPlan(id));
  }

  onAdd(adding: boolean) {
    this.store.dispatch(new fromStore.PlanPopupVisible(adding));
  }

  onUpdate(plan: Plan) {
    this.store.dispatch(new fromStore.CreatePlan(plan));
  }

  onCancel() {
    this.store.dispatch(new fromStore.PlanPopupVisible(false));
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

  showSimulation(id) {
    this.store.dispatch(new fromStore.LoadPlansSimulation(id));
    this.store.select(fromStore.getSimulationLoaded).subscribe(loaded => {
      if (loaded) {
        this.store.dispatch(new fromStore.PlanSimulationPopupVisible(true));
      }
    });
  }

  onCancelSimulation() {
    this.store.dispatch(new fromStore.PlanSimulationPopupVisible(false));
  }
}
