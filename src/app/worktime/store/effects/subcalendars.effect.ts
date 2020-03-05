import { Injectable } from '@angular/core';
import * as fromServices from '../../services';
import * as fromActions from '../actions';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromRoot from '../../../store';
import { Calendar, SubCalendar } from '../../models/calendar.model';

import { NotifyService } from '../../../shared/services/notify.service';

@Injectable()
export class SubCalendarsEffects {
  constructor(
    private actions$: Actions,
    private calendarsService: fromServices.CalendarsService,
    private notify: NotifyService
  ) {}

  @Effect()
  subCalendarSuccess$ = this.actions$
    .ofType(fromActions.LOAD_CALENDARS_SUCCESS)
    .pipe(
      map((action: fromActions.LoadCalendarsSuccess) => action.payload),
      map(calendars => {
        const subCalendars = calendars.reduce(
          (prev: SubCalendar[], curr: Calendar) => {
            return prev.concat(...curr.subCalendars);
          },
          []
        );
        return new fromActions.LoadSubCalendarsSuccess(subCalendars);
      }),
      catchError(error => of(new fromActions.LoadSubCalendarsFail(error)))
    );

  @Effect()
  createSubCalendar$ = this.actions$
    .ofType(fromActions.CREATE_SUBCALENDAR)
    .pipe(
      map((action: fromActions.CreateSubCalendar) => action.payload),
      switchMap(subcalendar => {
        return this.calendarsService.createSubCalendar(subcalendar).pipe(
          map(
            newSubCalendar =>
              new fromActions.CreateSubCalendarSuccess(newSubCalendar)
          ),
          catchError(error => of(new fromActions.CreateSubCalendarFail(error)))
        );
      })
    );

  // update
  @Effect()
  updateSubCalendar$ = this.actions$
    .ofType(fromActions.UPDATE_SUBCALENDAR)
    .pipe(
      map((action: fromActions.UpdateSubCalendar) => action.payload),
      switchMap(subcalendar => {
        return this.calendarsService.updateSubCalendar(subcalendar).pipe(
          map(
            newSubCalendar =>
              new fromActions.UpdateSubCalendarSuccess(newSubCalendar)
          ),
          catchError(error => of(new fromActions.UpdateSubCalendarFail(error)))
        );
      })
    );

  @Effect()
  removeSubCalendar$ = this.actions$
    .ofType(fromActions.REMOVE_SUBCALENDAR)
    .pipe(
      map((action: fromActions.RemoveSubCalendar) => action.payload),
      switchMap(subCalendar => {
        return this.calendarsService.removeSubCalendar(subCalendar).pipe(
          map(() => new fromActions.RemoveSubCalendarSuccess(subCalendar)),
          catchError(error => of(new fromActions.RemoveSubCalendarFail(error)))
        );
      })
    );

  @Effect()
  updateSubCalendarSuccess$ = this.actions$
    .ofType(fromActions.UPDATE_SUBCALENDAR_SUCCESS)
    .pipe(
      map(() => {
        return new fromActions.SubCalendarPopupVisible(false);
      })
    );

  @Effect()
  removeSubCalendarSuccess$ = this.actions$
    .ofType(fromActions.REMOVE_SUBCALENDAR_SUCCESS)
    .pipe(
      map(() => {
        return new fromActions.SubCalendarDeletePopupVisible(false);
      })
    );
}
