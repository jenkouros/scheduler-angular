import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as fromAction from '../actions';
import { switchMap, map, catchError, mergeMap ,  filter, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';
import { PlannedEvent } from '../../models/event.model';
import { EventsService } from '../../services/events.service';
import { ContainersService } from '../../services/containers.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
// import { ContainersService, EventsService } from '../../services';

@Injectable()
export class EventsEffects {
    constructor(
        private actions$: Actions,
        private eventsService: EventsService,
        private containersService: ContainersService,
        private store: Store<AppState>
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
    reloadEvents$ = this.actions$
        .ofType(fromAction.RELOAD_EVENTS)
        .pipe(
            map((action: fromAction.ReloadEvents) => action.payload.containerIds),
            withLatestFrom(this.store.select(state => state.scheduler.events)),
            mergeMap(([containerIds, state]) => {
                return containerIds.map(c => new fromAction.LoadEvents({
                    containerIds: [c],
                    dateTo: state.entities[c].dateTo,
                    dateFrom: state.entities[c].dateFrom
                }));
            })
        );

    @Effect()
    toggleLock$ = this.actions$
        .ofType(fromAction.TOGGLE_LOCK)
        .pipe(
            switchMap((action: fromAction.ToggleEventLock) => {
                return this.eventsService.toggleLock(action.payload)
                .pipe(
                    map(events => new fromAction.ReloadEvents({ containerIds: [action.payload.containerId] })),
                    catchError(error => of(new fromAction.LoadEventsFail()))
                );
            })
        );

    @Effect()
    createEvent$  = this.actions$
    .ofType(fromAction.CREATE_EVENT)
    .pipe(
        map((action: fromAction.CreateEvent) => action.payload),
        withLatestFrom(this.store.select(state => state.scheduler.events)),
        switchMap(([plannedEvent, state]) => {
            return this.eventsService.createEvent(plannedEvent)
                .pipe(
                    mergeMap(event => {
                        return [
                            new fromAction.LoadEvents(
                            {
                                containerIds: [event.containerId],
                                dateTo: state.entities[event.containerId].dateTo,
                                dateFrom: state.entities[event.containerId].dateFrom
                            }),
                            new fromAction.CreateEventSuccess(plannedEvent)
                        ];
                    }),
                    catchError(error => {
                        return of(new fromAction.CreateEventFail());
                    })
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
