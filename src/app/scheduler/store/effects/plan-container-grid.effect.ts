import { AppState } from './../../../store/app.reducers';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromActions from '../actions/plan-container-grid.action';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { PlanContainerGridService } from '../../services/plan-container-grid.service';

@Injectable()
export class PlanContainerGridEffect {
  constructor(
    private actions$: Actions,
    private planContainerGridService: PlanContainerGridService,
    private store: Store<AppState>
  ) {}

  // @Effect()
  // loadPlanItemGrid$ = this.actions$.ofType(fromActions.LOAD_PLAN_ITEM_GRID).pipe(
  //   map((action: fromActions.LoadPlanItemGrid ) => action),
  //   switchMap(() =>
  //     this.planItemGridService.loadPlanItemGrid().pipe(
  //       map(event => new fromActions.LoadPlanItemGridSuccess(event)),
  //       catchError(error => of(new fromActions.LoadPlanItemGridFail()))
  //     )
  //   )
  // );

  @Effect()
  loadPlanItemGridWithFilter$ = this.actions$.ofType(fromActions.LOAD_PLAN_CONTAINER_GRID).pipe(
    withLatestFrom(
      this.store.pipe(select(state => state.scheduler.filters)),
      this.store.pipe(select(state => state.plan.items.selectedId)),
      this.store.pipe(select(state => state.scheduler.planContainerGrid.containerGridLimitDate))
    ),
    switchMap(([action, filters, idPlan, limitDate]) =>

      this.planContainerGridService.loadPlanContainerGrid(idPlan, limitDate, filters.selectedEntities, filters.selectedContainers).pipe(
        map(event => new fromActions.LoadPlanContainerGridSuccess(event)),
        catchError(error => of(new fromActions.LoadPlanContainerGridFail()))
      )
    )
  );


  // @Effect()
  // autoplanItem$ = this.actions$.ofType(fromActions.AUTOPLAN_ITEM).pipe(
  //   switchMap((action: fromActions.AutoplanItem) =>
  //     this.planContainerGridService.autoplan(action.payload).pipe(
  //       map(items => new fromActions.UpdateItemGridSuccess(items)),
  //       catchError(error => of(new fromActions.AutoplanItemFail()))
  //     )
  //   ));

  @Effect()
  updateplanItem$ = this.actions$.ofType(fromActions.PLAN_CONTAINER_GRID_UPDATE).pipe(
    switchMap((action: fromActions.PlanContainerGridUpdate) =>
      this.planContainerGridService.updatePlanItem(action.payload).pipe(
        map(items => new fromActions.UpdateContainerGridSuccess(items)),
        catchError(error => of(new fromActions.UpdateContainerGridFail()))
      )
    ));
}
