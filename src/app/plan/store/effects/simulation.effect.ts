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
export class SimulationEffects {
  constructor(
    private actions$: Actions,
    private plansService: fromServices.PlansService,
    private store: Store<AppState>
  ) {}

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
