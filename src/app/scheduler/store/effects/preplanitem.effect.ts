import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as fromActions from '../actions';
import { PreplanitemsService } from '../../services/preplanitems.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PreplanitemEffects {
    constructor(
        private preplanitemService: PreplanitemsService,
        private actions$: Actions
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
}
