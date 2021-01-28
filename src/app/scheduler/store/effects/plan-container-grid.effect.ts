import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { PlanContainerGridService } from '../../services/plan-container-grid.service';
import * as fromEventActions from '../actions/events.action';
import * as fromActions from '../actions/plan-container-grid.action';
import * as preplanActions from '../actions/preplanitems.action';
import { AppState } from './../../../store/app.reducers';

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
  loadPlanItemGridWithFilter$ = this.actions$.pipe(
    ofType(fromActions.LOAD_PLAN_CONTAINER_GRID),
    map((action: fromActions.LoadPlanContainerGrid) => action),
    withLatestFrom(
      this.store.pipe(select(state => state.scheduler.filters)),
      this.store.pipe(select(state => state.plan.items.selectedId)),
      this.store.pipe(select(state => state.scheduler.planContainerGrid.containerGridLimitDate)),
      this.store.pipe(select(state => state.scheduler.planContainerGrid.showArchiveSwitch)),
      this.store.pipe(select(state => state.scheduler.planContainerGrid.filter.showNotPlannable))
    ),
    switchMap(([action, filters, idPlan, limitDate, showArchive, showNotPlannable]) =>

      this.planContainerGridService.loadPlanContainerGrid(
        idPlan, limitDate, filters.selectedEntities, filters.selectedContainers, showArchive, action.payload, showNotPlannable).pipe(
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
    map((action: fromActions.PlanContainerGridUpdate) => action.payload),
    switchMap(payload =>
      this.planContainerGridService.updatePlanItem(payload.operation).pipe(
        mergeMap(items => {
          const actions: any[] = [
            new fromActions.UpdateContainerGridSuccess({data: items, allowAdd: payload.allowAdd, order: false })
          ];
          if (payload.allowAdd) {
            actions.push(new preplanActions.LoadPreplanItems());
          }
          return actions;
        }),
        catchError(error => of(new fromActions.UpdateContainerGridFail()))
      )
    ));

  @Effect()
  updateDialogPlanItem$ = this.actions$.ofType(fromActions.PLAN_CONTAINER_DIALOG_GRID_UPDATE).pipe(
    switchMap((action: fromActions.PlanContainerDialogGridUpdate) =>
      this.planContainerGridService.updatePlanItemSimple(action.payload.operation).pipe(
        mergeMap(items => [
          new fromActions.UpdateContainerGridSuccess({data: items, allowAdd: false, order: false}),
          new fromEventActions.LoadEvent({ id: action.payload.idPlanItem }),
          new fromActions.HideUpdatePlanGridOperationDialog()
        ]),
        catchError(error => of(new fromActions.UpdateContainerGridFail()))
      )
    ));

  @Effect()
  changeSequence$ = this.actions$.pipe(
    ofType(fromActions.PLAN_CONTAINER_GRID_CHANGE_SEQUENCE),
    switchMap((action: fromActions.ChangeSequence) =>
      this.planContainerGridService.changeSequence(action.payload.isUp, action.payload.idPlanItem).pipe(
        map(x => new fromActions.UpdateContainerGridSuccess({data: x, allowAdd: false, order: true }))
      ))
  );

}
