import { Injectable } from '@angular/core';
import { FiltersService } from '../../services';
import { Actions, Effect } from '@ngrx/effects';
import * as fromActions from '../actions/filters.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class FiltersEffects {
    constructor(
        private filterService: FiltersService,
        private actions$: Actions
    ) {}

    @Effect()
    loadFilters$ = this.actions$
        .ofType(fromActions.LOAD_FILTERS)
        .pipe(
            switchMap(action => {
                return this.filterService.getFilters()
                    .pipe(
                        map(filters => new fromActions.LoadFiltersSuccess(filters)),
                        catchError((error) => {
                            console.log(error);
                            return of(new fromActions.LoadFiltersFail());
                        })
                    );
            })
        );
}
