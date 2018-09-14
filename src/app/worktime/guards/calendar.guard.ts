import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import { Calendar } from '../models/calendar.model';

@Injectable()
export class CalendarsGuard implements CanActivate {
  constructor(private store: Store<fromStore.WorkTimeState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getCalendarsLoaded).pipe(
      // gets loaded prop
      tap(loaded => {
        this.store.dispatch(new fromStore.DeSelectSubCalendar());
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
