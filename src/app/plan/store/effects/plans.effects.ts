import { Injectable } from '@angular/core';
import * as fromServices from '../../services';
import * as fromActions from '../actions';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PlansEffects {
  constructor(private actions$: Actions, private plansService: fromServices.PlansService) {}

  @Effect()
  loadPlans$ = this.actions$.ofType(fromActions.LOAD_PLANS).pipe(
    switchMap(() => {
      return this.plansService.getPlans().pipe(
        map(plans => new fromActions.LoadPlansSuccess(plans)),
        catchError(error => of(new fromActions.LoadPlansFail(error)))
      );
    })
  );

  @Effect()
  removePlan$ = this.actions$.ofType(fromActions.REMOVE_PLAN).pipe(
    map((action: fromActions.RemovePlan) => action.payload),
    switchMap(plan => {
      return this.plansService.removePlan(plan).pipe(
        map(() => new fromActions.RemovePlanSuccess(plan)),
        catchError(error => of(new fromActions.RemovePlanFail(error)))
      );
    })
  );

  @Effect()
  removePlanSuccess$ = this.actions$.ofType(fromActions.REMOVE_PLAN_SUCCESS).pipe(
    map(() => {
      return new fromActions.PlanDeletePopupVisible(false);
    })
  );

  /*
@Effect()
  createCalendar$ = this.actions$.ofType(fromActions.).pipe(
    map((action: fromActions.CreateCalendar) => action.payload),
    switchMap(calendar => {
      return this.plansService.createCalendar(calendar).pipe(
        map(newCalendar => new fromActions.CreateCalendarSuccess(newCalendar)),
        catchError(error => of(new fromActions.CreateCalendarFail(error)))
      );
    })
  );

  @Effect()
  calendarSuccess$ = this.actions$
    .ofType(
      fromActions.UPDATE_CALENDAR_SUCCESS,
      fromActions.CREATE_CALENDAR_SUCCESS
    )
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
        map(newCalendar => new fromActions.RemoveCalendarSuccess(newCalendar)),
        catchError(error => of(new fromActions.RemoveCalendarFail(error)))
      );
    })
  );
*/
}
