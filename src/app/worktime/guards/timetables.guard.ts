import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import { SubCalendar } from '../models/calendar.model';

@Injectable()
export class TimeTablesGuard implements CanActivate {
  constructor(private store: Store<fromStore.WorkTimeState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = parseInt(route.params.id, 10);
    return this.checkStore(id).pipe(
      switchMap(() => {
        return this.hasSelectedSubCalendar(id);
      })
    );
  }

  hasSelectedSubCalendar(id: number): Observable<boolean> {
    if (id === 0) {
      return of(false);
    }
    return this.store.select(fromStore.getSubCalendarsEntities).pipe(
      map((entities: { [key: number]: SubCalendar }) => !!entities[id]),
      take(1)
    );
  }

  checkStore(id: number): Observable<boolean> {
    return this.store.select(fromStore.getSubCalendarsSelectedId).pipe(
      // gets loaded prop
      tap(subcalendarId => {
        if (subcalendarId !== id) {
          this.store.dispatch(new fromStore.SelectSubCalendar(id));
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
