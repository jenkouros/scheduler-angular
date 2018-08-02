import { Injectable } from '@angular/core';
import * as fromServices from '../../services';

import * as fromActions from '../actions';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TimeTablesEffects {
  constructor(
    private actions$: Actions,
    private timetablesService: fromServices.TimeTablesService
  ) {}

  @Effect()
  loadTimeTables$ = this.actions$.ofType(fromActions.LOAD_TIMETABLES).pipe(
    switchMap((action: fromActions.LoadTimeTables) => {
      const id = action.payload;
      return this.timetablesService.getTimeTables(id).pipe(
        mergeMap(schedule => {
          return [
            new fromActions.LoadTimeTablesSuccess(schedule.timeTables),
            new fromActions.LoadContainersSuccess(schedule)
          ];
        }),
        catchError(error => of(new fromActions.LoadTimeTablesFail(error)))
      );
    })
  );
}
