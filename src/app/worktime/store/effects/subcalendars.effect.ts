import { Injectable } from '@angular/core';
import * as fromServices from '../../services';
import * as calendarActions from '../actions/calendars.actions';
import * as subcalendarActions from '../actions/subcalendars.actions';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromRoot from '../../../store';
import { Calendar, SubCalendar } from '../../models/calendar.model';

@Injectable()
export class SubCalendarsEffects {
  constructor(
    private actions$: Actions,
    private calendarsService: fromServices.CalendarsService
  ) {}

  @Effect()
  subCalendarSuccess$ = this.actions$
    .ofType(calendarActions.LOAD_CALENDARS_SUCCESS)
    .pipe(
      map((action: calendarActions.LoadCalendarsSuccess) => action.payload),
      map(calendars => {
        const subCalendars = calendars.reduce(
          (prev: SubCalendar[], curr: Calendar) => {
            return prev.concat(...curr.subCalendars);
          },
          []
        );
        return new subcalendarActions.LoadSubCalendarsSuccess(subCalendars);
      }),
      catchError(error =>
        of(new subcalendarActions.LoadSubCalendarsFail(error))
      )
    );

  @Effect()
  createSubCalendar$ = this.actions$
    .ofType(subcalendarActions.CREATE_SUBCALENDAR)
    .pipe(
      map((action: subcalendarActions.CreateSubCalendar) => action.payload),
      switchMap(subcalendar => {
        return this.calendarsService.createSubCalendar(subcalendar).pipe(
          map(
            newSubCalendar =>
              new subcalendarActions.CreateSubCalendarSuccess(newSubCalendar)
          ),
          catchError(error =>
            of(new subcalendarActions.CreateSubCalendarFail(error))
          )
        );
      })
    );

  // update
  @Effect()
  updateSubCalendar$ = this.actions$
    .ofType(subcalendarActions.UPDATE_SUBCALENDAR)
    .pipe(
      map((action: subcalendarActions.UpdateSubCalendar) => action.payload),
      switchMap(subcalendar => {
        return this.calendarsService.updateSubCalendar(subcalendar).pipe(
          map(
            newSubCalendar =>
              new subcalendarActions.UpdateSubCalendarSuccess(newSubCalendar)
          ),
          catchError(error =>
            of(new subcalendarActions.UpdateSubCalendarFail(error))
          )
        );
      })
    );

  @Effect()
  removeSubCalendar$ = this.actions$
    .ofType(subcalendarActions.REMOVE_SUBCALENDAR)
    .pipe(
      map((action: subcalendarActions.RemoveSubCalendar) => action.payload),
      switchMap(subCalendar => {
        return this.calendarsService.removeSubCalendar(subCalendar).pipe(
          map(
            newCalendar =>
              new subcalendarActions.RemoveSubCalendarSuccess(newCalendar)
          ),
          catchError(error =>
            of(new subcalendarActions.RemoveSubCalendarFail(error))
          )
        );
      })
    );
}
