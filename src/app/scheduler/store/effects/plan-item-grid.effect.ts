import { switchMap, map, catchError } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromActions from '../actions/plan-item-grid.action';
import { of } from 'rxjs';
import { PlanItemGridService } from '../../services/plan-item-grid.service';

@Injectable()
export class PlanItemGridEffect {
  constructor(
    private actions$: Actions,
    private planItemGridService: PlanItemGridService
  ) {}

  @Effect()
  loadPlanItemGrid$ = this.actions$.ofType(fromActions.LOAD_PLAN_ITEM_GRID).pipe(
    map((action: fromActions.LoadPlanItemGrid ) => action),
    switchMap(() =>
      this.planItemGridService.loadPlanItemGrid().pipe(
        map(event => new fromActions.LoadPlanItemGridSuccess(event)),
        catchError(error => of(new fromActions.LoadPlanItemGridFail()))
      )
    )
  );


  @Effect()
  autoplanItem$ = this.actions$.ofType(fromActions.AUTOPLAN_ITEM).pipe(
    switchMap((action: fromActions.AutoplanItem) =>
      this.planItemGridService.autoplan(action.payload).pipe(
        map(items => new fromActions.UpdateItemGridSuccess(items)),
        catchError(error => of(new fromActions.AutoplanItemFail()))
      )
    ));

  @Effect()
  updateplanItem$ = this.actions$.ofType(fromActions.PLAN_ITEM_GRID_UPDATE).pipe(
    switchMap((action: fromActions.PlanItemGridUpdate) =>
      this.planItemGridService.updatePlanItem(action.payload).pipe(
        map(items => new fromActions.UpdateItemGridSuccess(items)),
        catchError(error => of(new fromActions.AutoplanItemFail()))
      )
    ));
}
