import { PlannerService } from '../../services';
import { Actions, Effect } from '@ngrx/effects';
import * as fromActions from '../actions/planner.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';

@Injectable()
export class PlannerEffects {
    constructor(
        private plannerService: PlannerService,
        private actions$: Actions
    ) {}

    @Effect()
    loadContainers$ = this.actions$
        .ofType(fromActions.LOAD_CONTAINERS)
        .pipe(
            switchMap(action => {
                return this.plannerService.getContainers()
                    .pipe(
                        map(containers => new fromActions.LoadContainersSuccess(containers)),
                        catchError(error => of(new fromActions.LoadContainersFail()))
                    );
            })
        );
}
