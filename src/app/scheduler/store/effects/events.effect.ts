import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { EventsService } from '../../services/events.service';
import * as fromAction from '../actions/events.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class EventsEffects {
    constructor(
        private actions$: Actions,
        private eventsService: EventsService
    ) {}

    @Effect()
    loadEvents$ = this.actions$
        .ofType(fromAction.LOAD_EVENTS)
        .pipe(
            switchMap(action => {
                return this.eventsService.getEvents()
                    .pipe(
                        map(events => new fromAction.LoadEventsSuccess(events)),
                        catchError(error => of(new fromAction.LoadEventsFail()))
                    );
            })
        );
}
