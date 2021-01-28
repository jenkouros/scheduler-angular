import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../../store/app.reducers';
import { ItemsService } from '../../services/items.service';
import * as fromActions from '../actions';

@Injectable()
export class ItemsEffects {
  constructor(
    private actions$: Actions,
    private itemService: ItemsService,
    private store: Store<AppState>
  ) {}

  @Effect()
  loadItemsStore$ = this.actions$.ofType(fromActions.LOAD_ITEMS).pipe(
    map((action: fromActions.LoadItems) => action.payload),
    withLatestFrom(
      this.store.select(state => state.scheduler.filters.selectedEntities),
      this.store.select(state => state.plan.items.selectedId)
    ),
    map(([action, filters, idPlan]) => {
      const storeConfiguration = this.itemService.getItemsStoreConfiguration(idPlan, filters, !!action && action.showPlanned);
      return new fromActions.RegisterItemStore(storeConfiguration);
    })
  );

    @Effect()
    loadItemHierarchy$ = this.actions$
        .ofType(fromActions.LOAD_ITEMHIERARCHY)
        .pipe(
            switchMap((action: fromActions.LoadItemHierarchy) => {
                return this.itemService.getItemHierarchy(action.payload.item.idItem)
                    .pipe(
                        map(itemHierarchy =>
                            new fromActions.LoadItemHierarchySuccess(itemHierarchy)
                        ),
                        catchError(error => of(new fromActions.LoadItemHierarchyFail()))
                    );
            })
        );

  @Effect()
  hideItem$ = this.actions$.ofType(fromActions.HIDE_ITEM).pipe(
    map((action: fromActions.HideItem) => action.payload),
    withLatestFrom(this.store.select(state => state.plan.items.selectedId)),
    switchMap(([itemId, idPlan]) => {
      return this.itemService.hideItem(idPlan, itemId).pipe(
        map(_ => new fromActions.LoadItems()),
        catchError(error => of(new fromActions.LoadItemHierarchyFail()))
      );
    })
  );

  @Effect()
  createItem$ = this.actions$.ofType(fromActions.CREATE_ITEM).pipe(
    map((action: fromActions.CreateItem) => action.payload),
    withLatestFrom(
      this.store.pipe(select(state => state.scheduler.filters.selectedEntities)),
      this.store.pipe(select(state => state.plan.items.selectedId))
    ),
    switchMap(([createItemInput, filters, plan]) => {
      return this.itemService.createItem(createItemInput, filters).pipe(
        map(item => item
          ? new fromActions.CreateItemSuccess({ itemId: item.id })
          : new fromActions.CreateItemFail()
          )
      );
    })
  );

}
