import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { EventsService } from '../../services/events.service';
import * as fromAction from '../actions/events.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { PlannedEvent } from '../../models/event.model';

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
            switchMap((action: fromAction.LoadEvents) => {
                return this.eventsService.getEvents(
                    action.payload.containerIds,
                    action.payload.dateFrom,
                    action.payload.dateTo
                )
                .pipe(
                    map(events => new fromAction.LoadEventsSuccess(events)),
                    catchError(error => of(new fromAction.LoadEventsFail()))
                );
            })
        );

    @Effect()
    createEvent$  = this.actions$
    .ofType(fromAction.CREATE_EVENT)
    .pipe(
        switchMap((action: fromAction.CreateEvent) => {
            return this.eventsService.createEvent(
                action.payload
            )
            .pipe(
                map(event => new fromAction.CreateEventSucess(event)),
                catchError(error => of(new fromAction.CreateEventFail()))
            );
        })
    );
}
