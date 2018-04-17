import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as fromServices from '../../services';
import * as fromActions from '../actions/planitems.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PlanItemsEffects {
    constructor(
        private actions$: Actions,
        private planItemsService: fromServices.PlanItemsService) {}

    @Effect()
    loadPlanItems$ = this.actions$
        .ofType(fromActions.LOAD_PLANITEMS)
        .pipe(
            switchMap((action: fromActions.LoadPlanItems) => {
                return this.planItemsService.getPlanItems(action.payload.page, action.payload.pageSize)
                    .pipe(
                        map(planItems => new fromActions.LoadPlanItemsSuccess(planItems)),
                        catchError(error => of(new fromActions.LoadPlanItemsFail(error)))
                    );
            })
        );
}
