import { Injectable } from '@angular/core';
import * as fromServices from '../../services';
import * as fromActions from '../actions';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { NotifyService } from '../../../shared/services/notify.service';

@Injectable()
export class CalendarsEffects {
  constructor(
    private actions$: Actions,
    private calendarsService: fromServices.CalendarsService,
    private notify: NotifyService
  ) {}

  @Effect()
  loadCalendars$ = this.actions$.ofType(fromActions.LOAD_CALENDARS).pipe(
    switchMap(() => {
      return this.calendarsService.getCalendars().pipe(
        map(calendars => new fromActions.LoadCalendarsSuccess(calendars)),
        catchError(error => of(new fromActions.LoadCalendarsFail(error)))
      );
    })
  );

  @Effect()
  createCalendar$ = this.actions$.ofType(fromActions.CREATE_CALENDAR).pipe(
    map((action: fromActions.CreateCalendar) => action.payload),
    switchMap(calendar => {
      return this.calendarsService.createCalendar(calendar).pipe(
        map(newCalendar => new fromActions.CreateCalendarSuccess(newCalendar)),
        catchError(error => of(new fromActions.CreateCalendarFail(error)))
      );
    })
  );

  @Effect()
  updateCalendar$ = this.actions$.ofType(fromActions.UPDATE_CALENDAR).pipe(
    map((action: fromActions.UpdateCalendar) => action.payload),
    switchMap(calendar => {
      return this.calendarsService.updateCalendar(calendar).pipe(
        map(newCalendar => new fromActions.UpdateCalendarSuccess(newCalendar)),
        catchError(error => of(new fromActions.UpdateCalendarFail(error)))
      );
    })
  );

  @Effect()
  calendarSuccess$ = this.actions$
    .ofType(fromActions.UPDATE_CALENDAR_SUCCESS, fromActions.CREATE_CALENDAR_SUCCESS)
    .pipe(
      // HttpInterceptor takes care of it
      // tap(() => this.notify.notifySuccess('Koledar je bil uspešno ažuriran.')),
      map(() => {
        return new fromActions.CalendarPopupVisible(false);
      })
    );

  @Effect()
  removeCalendar$ = this.actions$.ofType(fromActions.REMOVE_CALENDAR).pipe(
    map((action: fromActions.RemoveCalendar) => action.payload),
    switchMap(calendar => {
      return this.calendarsService.removeCalendar(calendar).pipe(
        // tap(() => this.notify.notifySuccess('Koledar je bil uspešno brisan.')),
        map(success => {
          if (!success) {
            return new fromActions.RemoveCalendarFail(success);
          }
          return new fromActions.RemoveCalendarSuccess(calendar);
        }),
        catchError(error => of(new fromActions.RemoveCalendarFail(error)))
      );
    })
  );

  @Effect()
  calendarSubCalendarSuccess$ = this.actions$
    .ofType(fromActions.CREATE_SUBCALENDAR_SUCCESS, fromActions.UPDATE_SUBCALENDAR_SUCCESS)
    .pipe(
      // tap(() => this.notify.notifySuccess('Urnik je bil uspešno kreiran.')),
      map((action: fromActions.CreateSubCalendarSuccess) => {
        return new fromActions.UpdateCalendarSubCalendar(action.payload);
      })
    );

  @Effect()
  calendarSubCalendarRemoveSuccess$ = this.actions$
    .ofType(fromActions.REMOVE_SUBCALENDAR_SUCCESS)
    .pipe(
      // tap(() => this.notify.notifySuccess('Urnik je bil uspešno brisan.')),
      map((action: fromActions.RemoveSubCalendarSuccess) => {
        return new fromActions.RemoveCalendarSubCalendar(action.payload);
      })
    );

  @Effect()
  generateCalendar$ = this.actions$.ofType(fromActions.GENERATE_CALENDAR).pipe(
    map((action: fromActions.GenerateCalendar) => action.payload),
    switchMap(fromDate => {
      return this.calendarsService.generateCalendar(fromDate).pipe(
        map(status => new fromActions.GenerateCalendarSuccess(status)),
        catchError(error => of(new fromActions.CreateCalendarFail(error)))
      );
    })
  );

  @Effect()
  generateCalendarSuccess$ = this.actions$.ofType(fromActions.GENERATE_CALENDAR_SUCCESS).pipe(
    tap((action: fromActions.GenerateCalendarSuccess) => {
      if (action.payload) {
        this.notify.notifySuccess('Koledar je bil uspešno generiran.');
      }
    }),
    map(() => {
      return new fromActions.CalendarGeneratePopupVisible(false);
    })
  );
}
