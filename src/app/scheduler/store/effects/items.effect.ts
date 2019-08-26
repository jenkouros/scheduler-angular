import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SchedulerState } from '../reducers';
import { ItemsService } from '../../services/items.service';
import * as fromActions from '../actions';
import { ItemServer } from '../../models/server/item.servermodel';
import { Item } from '../../models/item.dto';
import { AppState } from '../../../store/app.reducers';

@Injectable()
export class ItemsEffects {
  constructor(
    private actions$: Actions,
    private itemService: ItemsService,
    private store: Store<AppState>
  ) {}

  @Effect()
  loadItemsStore$ = this.actions$.ofType(fromActions.LOAD_ITEMS).pipe(
    withLatestFrom(
      this.store.select(state => state.scheduler.filters.selectedEntities),
      this.store.select(state => state.plan.items.selectedId)
    ),
    map(([action, filters, idPlan]) => {
      const storeConfiguration = this.itemService.getItemsStoreConfiguration(idPlan, filters);
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
}
