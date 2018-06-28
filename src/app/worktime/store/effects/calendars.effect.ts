import { Injectable } from '@angular/core';
import * as fromServices from '../../services';
import * as calendarActions from '../actions/calendars.actions';

import { Actions, Effect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CalendarsEffects {
  constructor(
    private actions$: Actions,
    private calendarsService: fromServices.CalendarsService
  ) {}

  @Effect()
  loadCalendars$ = this.actions$.ofType(calendarActions.LOAD_CALENDARS).pipe(
    switchMap(() => {
      return this.calendarsService.getCalendars().pipe(
        map(calendars => new calendarActions.LoadCalendarsSuccess(calendars)),
        catchError(error => of(new calendarActions.LoadCalendarsFail(error)))
      );
    })
  );
}
