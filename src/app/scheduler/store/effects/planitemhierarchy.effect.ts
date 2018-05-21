import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
// import { PlanItemHierarchyService } from '../../services';
import * as fromActions from '../actions/planitems.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of ,  Observable } from 'rxjs';
import { PlanItemHierarchy } from '../../models/planitem.dto';
import { PlanItemHierarchyService } from '../../services/planitemhierarchy.service';

@Injectable()
export class PlanItemHierarchyEffects {
    constructor(
        private actions$: Actions,
        private planItemHierarchyService: PlanItemHierarchyService
    ) {}

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
