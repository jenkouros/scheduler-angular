import { Injectable } from '@angular/core';
import * as fromServices from '../../services';
import * as calendarActions from '../actions/calendars.actions';

import { Actions, Effect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromRoot from '../../../store';

@Injectable()
export class CalendarsEffects {
  constructor(
    private actions$: Actions,
    private calendarsService: fromServices.CalendarsService
  ) { }

  @Effect()
  loadCalendars$ = this.actions$.ofType(calendarActions.LOAD_CALENDARS).pipe(
    switchMap(() => {
      return this.calendarsService.getCalendars().pipe(
        map(calendars => new calendarActions.LoadCalendarsSuccess(calendars)),
        catchError(error => of(new calendarActions.LoadCalendarsFail(error)))
      );
    })
  );

  @Effect()
  createCalendar$ = this.actions$
    .ofType(calendarActions.CREATE_CALENDAR)
    .pipe(
      map((action: calendarActions.CreateCalendar) => action.payload),
      switchMap(calendar => {
        return this.calendarsService.createCalendar(calendar).pipe(
          map(newCalendar => new calendarActions.CreateCalendarSuccess(newCalendar)),
          catchError(error => of(new calendarActions.CreateCalendarFail(error)))
        );
      })
    );

  @Effect()
  createCalendarSuccess$ = this.actions$
    .ofType(calendarActions.CREATE_CALENDAR_SUCCESS)
    .pipe(
      map((action: calendarActions.CreateCalendarSuccess) => action.payload),
      map(calendar => {
        console.log(calendar);
        return new fromRoot.Go({
          path: ['/timetables', calendar.id],
        });
      }
      ));

  @Effect()
  updateCalendar$ = this.actions$
    .ofType(calendarActions.UPDATE_CALENDAR)
    .pipe(
      map((action: calendarActions.UpdateCalendar) => action.payload),
      switchMap(calendar => {
        return this.calendarsService.updateCalendar(calendar).pipe(
          map(newCalendar => new calendarActions.UpdateCalendarSuccess(newCalendar)),
          catchError(error => of(new calendarActions.UpdateCalendarFail(error)))
        );
      })
    );

  @Effect()
  calendarSuccess$ = this.actions$
    .ofType(
      calendarActions.UPDATE_CALENDAR_SUCCESS,
    // calendarActions.REMOVE_CALENDAR_SUCCESS
  )
    .pipe(
      map(() => {
        return new fromRoot.Go({
          path: ['/timetables'],
        });
      }
      ));


  @Effect()
  removeCalendar$ = this.actions$
    .ofType(calendarActions.REMOVE_CALENDAR)
    .pipe(
      map((action: calendarActions.RemoveCalendar) => action.payload),
      switchMap(calendar => {
        return this.calendarsService.removeCalendar(calendar).pipe(
          map(newCalendar => new calendarActions.UpdateCalendarSuccess(newCalendar)),
          catchError(error => of(new calendarActions.UpdateCalendarFail(error)))
        );
      })
    );
}
