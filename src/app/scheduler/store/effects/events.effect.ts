import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as fromAction from '../actions';
import {
  switchMap,
  map,
  catchError,
  mergeMap,
  filter,
  withLatestFrom,
  flatMap
} from 'rxjs/operators';

import { of } from 'rxjs';
import { PlannedEvent, PlanItemsGetResponse } from '../../models/event.model';
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
  loadEvents$ = this.actions$.ofType(fromAction.LOAD_EVENTS).pipe(
    flatMap((action: fromAction.LoadEvents) =>
      this.eventsService
        .getEvents(
          action.payload.containerIds,
          action.payload.dateFrom,
          action.payload.dateTo
        )
        .pipe(
          map(
            (planItemResponse: PlanItemsGetResponse) =>
              new fromAction.LoadEventsSuccess({
                events: planItemResponse.planItems,
                notWorkingHoursEvents: planItemResponse.notWorkingHoursEvents,
                dateFrom: action.payload.dateFrom,
                dateTo: action.payload.dateTo,
                containers: action.payload.containerIds
              })
          ),
          catchError(error => {
            console.log('Error');
            return of(new fromAction.LoadEventsFail());
          })
        )
    )
  );

  @Effect()
  reloadEvents$ = this.actions$.ofType(fromAction.RELOAD_EVENTS).pipe(
    map((action: fromAction.ReloadEvents) => action.payload.containerIds),
    withLatestFrom(this.store.select(state => state.scheduler.events)),
    map(([containerIds, state]) => {
      return new fromAction.LoadEvents({
        containerIds: containerIds,
        dateTo: state.entities[containerIds[0]].dateTo,
        dateFrom: state.entities[containerIds[0]].dateFrom
      });

      // return containerIds.map(c => new fromAction.LoadEvents({
      //     containerIds: [c],
      //     dateTo: state.entities[c].dateTo,
      //     dateFrom: state.entities[c].dateFrom
      // }));
    }),
    catchError(error => {
      console.log('Error2');
      return of(new fromAction.LoadEventsFail());
    })
  );


  /** CREATE EVENTS */
  @Effect()
  createEvent$ = this.actions$.ofType(fromAction.CREATE_EVENT).pipe(
    map((action: fromAction.CreateEvent) => action.payload),
    switchMap(plannedEvent =>
      this.eventsService.createEvent(plannedEvent).pipe(
        map(event => new fromAction.CreateEventSuccess(event)),
        catchError(error => of(new fromAction.CreateEventFail()))
      )
    )
  );

  @Effect({dispatch: false})
  createEventSuccessCheckNotPlannable$ = this.actions$
    .ofType(fromAction.CREATE_EVENT_SUCCESS)
    .pipe(
      switchMap((action: fromAction.CreateEventSuccess) =>
        this.eventsService.checkForNotPlannableEvents(action.payload.id)
      )
    );

  @Effect()
  createEventSuccessReloadPreplanItems$ = this.actions$
    .ofType(fromAction.CREATE_EVENT_SUCCESS)
    .pipe(
      map(
        (action: fromAction.CreateEventSuccess) =>
          new fromAction.RemovePreplanItem(action.payload.idPrePlanItem)
      )
    );

  /** UPDATE EVENTS */
  @Effect()
  updateEvent$ = this.actions$.ofType(fromAction.UPDATE_EVENT).pipe(
    switchMap((action: fromAction.UpdateEvent) =>
      this.eventsService.updateEvent(action.payload).pipe(
        map(event => new fromAction.UpdateEventSuccess()),
        catchError(error => of(new fromAction.UpdateEventFail()))
      )
    )
  );

  @Effect()
  updateEvents$ = this.actions$.ofType(fromAction.UPDATE_EVENTS).pipe(
    switchMap((action: fromAction.UpdateEvents) =>
      this.eventsService.updateEvents(
        action.payload.planItemMoves,
        action.payload.fixPlanItems,
        action.payload.ignoreStatusLimitation
      ).pipe(
        map(event => new fromAction.UpdateEventsSuccess()),
        catchError(error => of(new fromAction.UpdateEventsFail()))
      )
    )
  );

  /** DELETE EVENTS */
  @Effect()
  deleteEvent$ = this.actions$.ofType(fromAction.DELETE_EVENT).pipe(
    switchMap((action: fromAction.DeleteEvent) =>
      this.eventsService.deleteEvent(action.payload).pipe(
        map(result => {
          if (result) {
            return new fromAction.DeleteEventSuccess(action.payload);
          }
          return new fromAction.CreateEventFail();
        }),
        catchError(error => of(new fromAction.CreateEventFail()))
      )
    )
  );

  @Effect()
  deleteEventSuccess$ = this.actions$
    .ofType(fromAction.DELETE_EVENT_SUCCESS)
    .pipe(
      map(
        (action: fromAction.CreateEventSuccess) =>
          new fromAction.LoadPreplanItems()
      )
    );


  /** LOCK */
  @Effect({ dispatch: false })
  toggleLock$ = this.actions$.ofType(fromAction.TOGGLE_LOCK).pipe(
    switchMap((action: fromAction.ToggleEventLock) =>
      this.eventsService.toggleLock(action.payload).pipe(
        // map(events => new fromAction.ReloadEvents({ containerIds: [action.payload.containerId] })),
        catchError(error => of(new fromAction.LoadEventsFail()))
      )
    )
  );

  @Effect()
  massToggleLock$ = this.actions$
    .ofType(fromAction.MASS_TOGGLE_EVENTS_LOCK)
    .pipe(
      switchMap((action: fromAction.MassToggleEventsLock) => {
        return this.eventsService
          .toggleMassLocks(
            action.payload.containerIds,
            action.payload.fromDate,
            action.payload.toDate,
            true
          )
          .pipe(
            map(
              events =>
                new fromAction.ReloadEvents({
                  containerIds: action.payload.containerIds
                })
            ),
            catchError(error => of(new fromAction.LoadEventsFail()))
          );
      })
    );


  @Effect()
  timeUpdateSuggestion$ = this.actions$
    .ofType(fromAction.GET_ITEMBATCH_TIMEUPDATE_SUGGESTION)
    .pipe(
        map((action: fromAction.GetItemBatchTimeUpdateSuggestion) => action.payload),
        switchMap(idItemBatch =>
            this.eventsService.getTimeUpdateSuggestion(idItemBatch)
            .pipe(
                map(result => new fromAction.GetItemBatchTimeUpdateSuggestionSuccess(result)),
                catchError(error => of(new fromAction.ClearItemBatchTimeUpdateSuggestion()))
            )
        )
    );

  @Effect()
  timeUpdateRealizationSuggestion$ = this.actions$
    .ofType(fromAction.GET_REALIZATION_TIMEUPDATE_SUGGESTION)
    .pipe(
        map((action: fromAction.GetRealizationTimeUpdateSuggestion) => action.payload),
        switchMap(request =>
            this.eventsService.getTimeUpdateByRealizationSuggestion(request.containerIds, request.fromDate, request.toDate)
            .pipe(
                map(result => new fromAction.GetRealizationTimeUpdateSuggestionSuccess(result)),
                catchError(error => of(new fromAction.ClearRealizationTimeUpdateSuggestion()))
            )
        )
    );

  @Effect()
  notWorkingHoursTimeSuggestion$ = this.actions$
    .ofType(fromAction.GET_NOTWORKINGHOURS_PLANITEM_UPDATE_SUGGESTION)
    .pipe(
        map((action: fromAction.GetNotWorkingHoursPlanItemUpdateSuggestion) => action.payload),
        switchMap(idPlanItem =>
            this.eventsService.getTimeSuggestionForNotWorkingHours(idPlanItem)
            .pipe(
                map(result => new fromAction.GetNotWorkingHoursPlanItemUpdateSuggestionSuccess(result)),
                catchError(error => of(new fromAction.ClearNotWorkingHoursPlanItemUpdateSuggestion()))
            )
        )
    );
}
