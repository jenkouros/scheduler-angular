import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as fromActions from '../actions';
import { PreplanitemsService } from '../../services/preplanitems.service';
import { map, catchError, switchMap ,  mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppState } from '../../../store/app.reducers';
import { Store, select } from '@ngrx/store';

@Injectable()
export class PreplanitemEffects {
    constructor(
        private actions$: Actions,
        private preplanitemService: PreplanitemsService,
        private store: Store<AppState>
    ) {}

    @Effect()
    loadPreplanitems$ = this.actions$
        .ofType(fromActions.LOAD_PREPLANITEMS)
        .pipe(
            withLatestFrom(this.store.select(state => state.scheduler.filters)),
            switchMap(([action, filters]) => {
                return this.preplanitemService.getPreplanitems(filters.selectedEntities)
                    .pipe(
                        map(preplanitems => new fromActions.LoadPreplanItemsSuccess(preplanitems)),
                        catchError((error) => {
                            console.log(error);
                            return of(new fromActions.LoadPreplanItemsFail());
                        })
                    );
            })
        );

    @Effect()
    createPreplanitems$ = this.actions$
        .ofType(fromActions.CREATE_PREPLANITEMS)
        .pipe(
            switchMap((action: fromActions.CreatePreplanItems) => {
                return this.preplanitemService.createPreplanitems(action.payload)
                .pipe(
                    mergeMap(filters => [new fromActions.LoadPreplanItems(), new fromActions.LoadItems()]), // MAYBE JUST ADD? TODO
                    catchError((error) => {
                        console.log(error);
                        return of(new fromActions.LoadPreplanItemsFail()); // CREATE NEW FAIL ACTION TODO
                    })
                );
            })
        );

    @Effect()
    deleteItemBatch$ = this.actions$
        .ofType(fromActions.DELETE_ITEMBATCH)
        .pipe(
            switchMap((action: fromActions.DeleteItemBatch) => {
                return this.preplanitemService.deleteItemBatch(action.payload)
                .pipe(
                    mergeMap(result => [new fromActions.LoadPreplanItems(), new fromActions.LoadItems()]),
                    // mergeMap(result => [
                    //     new fromActions.LoadPreplanItems(),
                    //     new fromActions.ReloadAllSelectedContainersEvents()
                    // ]),
                    catchError((error) => {
                        console.log(error);
                        return of(new fromActions.DeleteItemBatchFail()); // CREATE NEW FAIL ACTION TODO
                    })
                );
            })
        );

        @Effect()
        prePlanItemsSuggestions$ = this.actions$
        .ofType(fromActions.LOAD_PREPLANITEMS_SUGGESTIONS)
        .pipe(
            switchMap((action: fromActions.LoadPreplanItemsSuggestions) => {
                return this.preplanitemService.getPrePlanItemSuggestion(action.payload)
                .pipe(
                    map(result => new fromActions.LoadPreplanItemsSuggestionsSuccess(result)),
                    catchError((error) => {
                        console.log(error);
                        return of(new fromActions.LoadPreplanItemsSuggestionsFail()); // CREATE NEW FAIL ACTION TODO
                    })
                );
            })
        );
}
