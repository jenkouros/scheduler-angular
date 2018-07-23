import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import { Calendar } from '../models/calendar.model';

@Injectable()
export class CalendarExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.WorkTimeState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.calendarId, 10);
        return this.hasCalendar(id);
      })
    );
  }

  hasCalendar(id: number): Observable<boolean> {
    return this.store.select(fromStore.getCalendarsEntities).pipe(
      map((entities: { [key: number]: Calendar }) => !!entities[id]),
      tap(exist => {
        if (exist) {
          this.store.dispatch(new fromStore.SelectCalendar(id));
        }
      }),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getCalendarsLoaded).pipe(
      // gets loaded prop
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadCalendars());
        }
      }),
      // continue stream (tap is ignored), ko je loaded==true se stream nadaljuje
      filter(loaded => loaded),
      // take loaded prop an call observable compete!, izvede se unsubscribe
      take(1)
    );
  }
}
