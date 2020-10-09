import { ApplicationFacadeService } from './../../../store/application/application-facade.service';
import { AppState } from './../../../store/app.reducers';
import { switchMap, map, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromActions from '../actions/plan-item-grid.action';
import * as fromPlanContainerGridActions from '../actions/plan-container-grid.action';
import * as containerGridActions from '../actions/plan-container-grid.action';
import { of } from 'rxjs';
import { PlanItemGridService } from '../../services/plan-item-grid.service';
import { Store, select } from '@ngrx/store';

@Injectable()
export class PlanItemGridEffect {
  constructor(
    private actions$: Actions,
    private planItemGridService: PlanItemGridService,
    private store: Store<AppState>,
    private applicationFacade: ApplicationFacadeService
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
  loadPlanItemGridWithFilter$ = this.actions$.ofType(fromActions.LOAD_PLAN_ITEM_GRID).pipe(
    withLatestFrom(
      this.store.pipe(select(state => state.scheduler.filters)),
      this.store.pipe(select(state => state.plan.items.selectedId)),
      this.store.pipe(select(state => state.scheduler.planItemGrid.itemLimitDate))
    ),
    switchMap(([action, filters, idPlan, limitDate]) => {
      this.applicationFacade.setLoader(true);
      return this.planItemGridService.loadPlanItemGrid(idPlan, limitDate, filters.selectedEntities).pipe(
        map(event => {
          this.applicationFacade.setLoader(false);
          return new fromActions.LoadPlanItemGridSuccess(event);
        }),
        catchError(error => {
          this.applicationFacade.setLoader(true);
          return of(new fromActions.LoadPlanItemGridFail());
        })
      );
    })
  );


  @Effect()
  autoplanItem$ = this.actions$.ofType(fromActions.AUTOPLAN_ITEM).pipe(
    map((action: fromActions.AutoplanItem) => action),
    withLatestFrom(
      this.store.pipe(select(state => state.scheduler.filters)),
      this.store.pipe(select(state => state.plan.items.selectedId))
    ),
    switchMap(([action, filters]) =>
      this.planItemGridService.autoplan(action.payload, filters.selectedEntities, filters.selectedContainers).pipe(
        mergeMap(items => {
          const actions = [
            new containerGridActions.HideUpdatePlanGridOperationDialog(),
            new fromActions.UpdateItemGridSuccess(items.planItemGridModel)
          ] as any[];

          if (action.payload.returnOperationGridModel) {
            actions.push(new fromPlanContainerGridActions.UpdateContainerGridSuccess(items.planContainerGridModel));
          }

          return actions;
        }

          // [
          // new containerGridActions.HideUpdatePlanGridOperationDialog(),
          // action.payload.returnOperationGridModel
          //   ? new fromPlanContainerGridActions.UpdateContainerGridSuccess(items.planContainerGridModel)
          //   : new fromActions.UpdateItemGridSuccess(items.planItemGridModel)]
        ),
        catchError(error => of(new fromActions.AutoplanItemFail()))
      )
    ));

  @Effect()
  updateplanItem$ = this.actions$.ofType(fromActions.PLAN_ITEM_GRID_UPDATE).pipe(
    map((action: fromActions.PlanItemGridUpdate) => action),
    withLatestFrom(
      this.store.pipe(select(state => state.scheduler.filters))
    ),
    switchMap(([action, filters]) =>
      this.planItemGridService.updatePlanItem(action.payload, filters.selectedEntities, filters.selectedContainers).pipe(
        mergeMap(items => [
          new containerGridActions.UpdateContainerGridSuccess(items.planContainerGridModel),
          new containerGridActions.HideUpdatePlanGridOperationDialog(),
          new fromActions.UpdateItemGridSuccess(items.planItemGridModel)
        ]),
        catchError(error => of(new fromActions.AutoplanItemFail()))
      )
    ));

  @Effect()
  loadPlanItemGridWithId$ = this.actions$.pipe(
    ofType(fromActions.LOAD_PLAN_ITEM_GRID_WITHID),
    switchMap((action: fromActions.LoadPlanItemGridWithId ) =>
      this.planItemGridService.loadPlanItemGridWithId(action.payload).pipe(
        map(event => new fromActions.LoadPlanItemGridWithIdSuccess(event)),
        catchError(error => of(new fromActions.LoadPlanItemGridWithIdFail()))
      ))
  );
}
