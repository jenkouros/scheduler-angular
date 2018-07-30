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
          console.log(schedule);
          return [new fromActions.LoadTimeTablesSuccess(schedule.timeTables)];
        }),
        catchError(error => of(new fromActions.LoadTimeTablesFail(error)))
      );
      /*map(
          schedule => new fromActions.LoadTimeTablesSuccess(schedule.timeTables)
        ),
        catchError(error => of(new fromActions.LoadTimeTablesFail(error)))
      );*/
    })
  );
}

/*
@Effect()
  loadTimeTables$ = this.actions$.ofType(fromActions.SELECT_CALENDAR).pipe(
    switchMap((action: fromActions.SelectCalendar) => {
      const calendarId = action.payload;
      console.log('calendarId', calendarId);
      return this.timetablesService.getTimeTables(calendarId).pipe(
        map(timetables => new fromActions.LoadTimeTablesSuccess(timetables)),
        catchError(error => of(new fromActions.LoadTimeTablesFail(error)))
      );
    })
  );

  @Effect()
  loadCalendars$ = this.actions$.ofType(calendarActions.LOAD_CALENDARS).pipe(
    switchMap(() => {
      return this.calendarsService.getCalendars().pipe(
        map(calendars => new calendarActions.LoadCalendarsSuccess(calendars)),
        catchError(error => of(new calendarActions.LoadCalendarsFail(error)))
      );
    })
  );
*/
