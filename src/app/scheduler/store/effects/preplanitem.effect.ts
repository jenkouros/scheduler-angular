import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as fromActions from '../actions';
import { PreplanitemsService } from '../../services/preplanitems.service';
import { map, catchError, switchMap ,  mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PreplanitemEffects {
    constructor(
        private actions$: Actions,
        private preplanitemService: PreplanitemsService
    ) {}

    @Effect()
    loadPreplanitems$ = this.actions$
        .ofType(fromActions.LOAD_PREPLANITEMS)
        .pipe(
            switchMap(action => {
                return this.preplanitemService.getPreplanitems()
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
                    map(filters => new fromActions.LoadPreplanItems()), // MAYBE JUST ADD? TODO
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
                    map(result => new fromActions.LoadPreplanItems()),
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
}
