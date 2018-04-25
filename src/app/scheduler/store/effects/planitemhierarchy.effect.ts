import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as fromServices from '../../services';
import * as fromActions from '../actions/planitems.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { PlanItemHierarchy } from '../../models/planitem.dto';

@Injectable()
export class PlanItemHierarchyEffects {
    constructor(
        private actions$: Actions,
        private planItemHierarchyService: fromServices.PlanItemHierarchyService) {}

    // @Effect()
    // loadPlanItems$ = this.actions$
    //     .ofType(fromActions.LOAD_PLANITEMS)
    //     .pipe(
    //         switchMap((action: fromActions.LoadPlanItems) => {
    //             return this.planItemsService.getPlanItems(action.payload.page, action.payload.pageSize)
    //                 .pipe(
    //                     map(planItems => new fromActions.LoadPlanItemsSuccess(planItems)),
    //                     catchError(error => of(new fromActions.LoadPlanItemsFail(error)))
    //                 );
    //         })
    //     );

    @Effect()
    loadPlanItemHierarchy$ = this.actions$
        .ofType(fromActions.LOAD_PLANITEMHIERARCHY)
        .pipe(
            switchMap((action: fromActions.LoadPlanItemHierarchy) => {
                return this.planItemHierarchyService.getPlanItemHierarchy(action.payload.planItemId)
                    .pipe(
                        map(planItemHierarchy =>
                            new fromActions.LoadPlanItemHierarchySuccess(planItemHierarchy)
                        ),
                        catchError(error => of(new fromActions.LoadPlanItemHierarchyFail()))
                    );
            })
        );
}
