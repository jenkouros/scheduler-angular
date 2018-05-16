import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { EventsService } from '../../services/events.service';
import * as fromAction from '../actions';
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
                    map(events => new fromAction.LoadEventsSuccess({
                        events,
                        dateFrom: action.payload.dateFrom,
                        dateTo: action.payload.dateTo
                    })),
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
                map(event => new fromAction.CreateEventSuccess(event)),
                catchError(error => of(new fromAction.CreateEventFail()))
            );
        })
    );

    @Effect()
    updateEvent$  = this.actions$
    .ofType(fromAction.UPDATE_EVENT)
    .pipe(
        switchMap((action: fromAction.UpdateEvent) => {
            return this.eventsService.updateEvent(
                action.payload
            )
            .pipe(
                map(event => new fromAction.UpdateEventSuccess(event)),
                catchError(error => of(new fromAction.UpdateEventFail()))
            );
        })
    );

    @Effect()
    deleteEvent$  = this.actions$
    .ofType(fromAction.DELETE_EVENT)
    .pipe(
        switchMap((action: fromAction.DeleteEvent) => {
            return this.eventsService.deleteEvent(
                action.payload
            )
            .pipe(
                map(result => new fromAction.DeleteEventSuccess(action.payload)),
                catchError(error => of(new fromAction.CreateEventFail()))
            );
        })
    );

    @Effect()
    createEventSuccess$ = this.actions$
        .ofType(fromAction.CREATE_EVENT_SUCCESS)
        .pipe(
            map((action: fromAction.CreateEventSuccess) =>
                new fromAction.RemovePreplanItem(action.payload.idPrePlanItem)
            ));

    @Effect()
    deleteEventSuccess$ = this.actions$
        .ofType(fromAction.DELETE_EVENT_SUCCESS)
        .pipe(
            map((action: fromAction.CreateEventSuccess) =>
                new fromAction.LoadPreplanItems()
            ));

}
