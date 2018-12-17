import { Injectable } from '@angular/core';
import * as fromServices from '../../services';
import * as fromActions from '../actions';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { SchedulerPlansState } from '../reducers';
import * as fromStore from '../../store';
import { AppState } from '../../../store/app.reducers';

@Injectable()
export class PlansEffects {
  constructor(
    private actions$: Actions,
    private plansService: fromServices.PlansService,
    private store: Store<AppState>
  ) {}

  @Effect()
  loadPlans$ = this.actions$.ofType(fromActions.LOAD_PLANS).pipe(
    switchMap(() => {
      return this.plansService.getPlans().pipe(
        map(plans => new fromActions.LoadPlansSuccess(plans)),
        catchError(error => of(new fromActions.LoadPlansFail(error)))
      );
    })
  );

  @Effect()
  createPlan$ = this.actions$.ofType(fromActions.CREATE_PLAN).pipe(
    map((action: fromActions.CreatePlan) => action.payload),
    switchMap(plan => {
      return this.plansService.createPlan(plan).pipe(
        map(newPlan => new fromActions.CreatePlanSuccess(newPlan)),
        catchError(error => of(new fromActions.CreatePlanFail(error)))
      );
    })
  );

  @Effect()
  updatePlanSuccess$ = this.actions$.ofType(fromActions.CREATE_PLAN_SUCCESS).pipe(
    map(() => {
      return new fromActions.PlanPopupVisible(false);
    })
  );

  @Effect()
  removePlan$ = this.actions$.ofType(fromActions.REMOVE_PLAN).pipe(
    map((action: fromActions.RemovePlan) => action.payload),
    switchMap(plan => {
      return this.plansService.removePlan(plan).pipe(
        map(() => new fromActions.RemovePlanSuccess(plan)),
        catchError(error => of(new fromActions.RemovePlanFail(error)))
      );
    })
  );

  @Effect()
  removePlanSuccess$ = this.actions$.ofType(fromActions.REMOVE_PLAN_SUCCESS).pipe(
    map(() => {
      return new fromActions.PlanDeletePopupVisible(false);
    })
  );

  @Effect()
  chnageSelectedPlan$ = this.actions$.ofType(fromActions.REMOVE_PLAN_SUCCESS).pipe(
    map((action: fromActions.RemovePlanSuccess) => action.payload),
    withLatestFrom(this.store.select(state => state.plan.items.selectedId)),

    map(([plan, selectedId]) => {
      if (selectedId === plan.idPlan) {
        // select default planId
        return new fromActions.SelectPlan(1);
      }
    })
  );

  @Effect()
  loadPlanSimulation$ = this.actions$.ofType(fromActions.LOAD_PLANS_SIMULATION).pipe(
    map((action: fromActions.LoadPlansSimulation) => action.payload),
    switchMap(planId => {
      return this.plansService.getPlanSiumulation(planId).pipe(
        map(changes => new fromActions.LoadPlansSimulationSuccess(changes)),
        catchError(error => of(new fromActions.LoadPlansSimulationFail(error)))
      );
    })
  );
}
