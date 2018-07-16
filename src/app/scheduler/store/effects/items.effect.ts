import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SchedulerState } from '../reducers';
import { ItemsService } from '../../services/items.service';
import * as fromActions from '../actions';
import { ItemServer } from '../../models/server/item.servermodel';
import { Item } from '../../models/item.dto';



@Injectable()
export class ItemsEffects {
    constructor(
        private actions$: Actions,
        private itemService: ItemsService,
        private store: Store<SchedulerState>
    ) {}

    @Effect()
    loadItemsStore$ = this.actions$.ofType(fromActions.LOAD_ITEMS)
    .pipe(
       map(action => {
            const store = this.itemService.getItemsStore();
            store.on('loaded', (data: ItemServer[]) =>
                this.store.dispatch(new fromActions.LoadItemsSuccess( data.map(i => Item.fromServer(i)) ))
            );
            return new fromActions.RegisterItemStore(store);
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
