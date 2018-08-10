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

  @Effect()
  createTimeTable$ = this.actions$.ofType(fromActions.CREATE_TIMETABLE).pipe(
    map((action: fromActions.CreateTimeTable) => action.payload),
    switchMap(timetable => {
      return this.timetablesService.createTimeTable(timetable).pipe(
        map(
          newTimeTable => new fromActions.CreateTimeTableSuccess(newTimeTable)
        ),
        catchError(error => of(new fromActions.CreateTimeTableFail(error)))
      );
    })
  );

  @Effect()
  updateTimeTable$ = this.actions$.ofType(fromActions.UPDATE_TIMETABLE).pipe(
    map((action: fromActions.UpdateTimeTable) => action.payload),
    switchMap(timetable => {
      return this.timetablesService.updateTimeTable(timetable).pipe(
        map(
          newTimeTable => new fromActions.UpdateTimeTableSuccess(newTimeTable)
        ),
        catchError(error => of(new fromActions.UpdateTimeTableFail(error)))
      );
    })
  );

  @Effect()
  removeTimeTable$ = this.actions$.ofType(fromActions.REMOVE_TIMETABLE).pipe(
    map((action: fromActions.RemoveTimeTable) => action.payload),
    switchMap(timetable => {
      return this.timetablesService.removeTimeTable(timetable).pipe(
        map(() => new fromActions.RemoveTimeTableSuccess(timetable)),
        catchError(error => of(new fromActions.RemoveTimeTableFail(error)))
      );
    })
  );

  @Effect()
  timetableSuccess$ = this.actions$
    .ofType(
      fromActions.UPDATE_TIMETABLE_SUCCESS,
      fromActions.CREATE_TIMETABLE_SUCCESS
    )
    .pipe(
      map(() => {
        return new fromActions.TimeTablePopupVisible(false);
      })
    );

  @Effect()
  removeTimeTableSuccess$ = this.actions$
    .ofType(fromActions.REMOVE_TIMETABLE_SUCCESS)
    .pipe(
      map(() => {
        return new fromActions.TimeTableDeletePopupVisible(false);
      })
    );
}
