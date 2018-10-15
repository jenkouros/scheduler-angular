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
    loadItemsStore$ = this.actions$.ofType(fromActions.LOAD_ITEMS)
    .pipe(
        withLatestFrom(this.store.select(state => state.scheduler.filters.selectedEntities)),
        map(([action, state]) => {
                const storeConfiguration = this.itemService.getItemsStoreConfiguration(state);
                return new fromActions.RegisterItemStore(storeConfiguration);
        })
    );

    @Effect()
    loadItemHierarchy$ = this.actions$
        .ofType(fromActions.LOAD_ITEMHIERARCHY)
        .pipe(
            switchMap((action: fromActions.LoadItemHierarchy) => {
                return this.itemService.getItemHierarchy(action.payload.itemId)
                    .pipe(
                        map(itemHierarchy =>
                            new fromActions.LoadItemHierarchySuccess(itemHierarchy)
                        ),
                        catchError(error => of(new fromActions.LoadItemHierarchyFail()))
                    );
            })
        );

    @Effect()
    hideItem$ = this.actions$
        .ofType(fromActions.HIDE_ITEM)
        .pipe(
            switchMap((action: fromActions.HideItem) => {
                return this.itemService.hideItem(action.payload)
                    .pipe(
                        map(_ => new fromActions.LoadItems()),
                        catchError(error => of(new fromActions.LoadItemHierarchyFail()))
                    );
            })
        );
}
