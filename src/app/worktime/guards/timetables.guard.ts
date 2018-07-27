import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import { Calendar } from '../models/calendar.model';
import { pipe } from '../../../../node_modules/@angular/core/src/render3/pipe';

@Injectable()
export class TimeTablesGuard implements CanActivate {
  constructor(private store: Store<fromStore.WorkTimeState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log('id', route);
    if (!route.parent) {
      return of(false);
    }

    const id = parseInt(route.parent.params.calendarId, 10);
    console.log('id', route, id);
    return this.checkStore(id).pipe(
      switchMap(() => {
        return this.hasSelectedCalendar(id);
      })
    );
  }

  hasSelectedCalendar(id: number): Observable<boolean> {
    return this.store.select(fromStore.getCalendarsEntities).pipe(
      map((entities: { [key: number]: Calendar }) => !!entities[id]),
      take(1)
    );
  }

  checkStore(id: number): Observable<boolean> {
    return this.store.select(fromStore.getTimeTablesCalendarId).pipe(
      // gets loaded prop
      tap(calendarId => {
        if (calendarId !== id) {
          this.store.dispatch(new fromStore.SelectCalendar(id));
          this.store.dispatch(new fromStore.LoadTimeTables(id));
        }
      }),
      switchMap(() => {
        return this.store.select(fromStore.getTimeTablesLoaded);
      }),
      // continue stream (tap is ignored), ko je loaded==true se stream nadaljuje
      filter(loaded => loaded),
      // take loaded prop an call observable complete!, izvede se unsubscribe
      take(1)
    );
  }
}
