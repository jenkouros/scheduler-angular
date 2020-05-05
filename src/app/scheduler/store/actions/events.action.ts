import { Action } from '@ngrx/store';
import { PlannedEvent, PlannedEventMove, PlannedEventNotWorkingHoursMove } from '../../models/event.model';
import { PlanSchedule } from '../../models/planschedule.dto';

export const LOAD_EVENT = '[Events] Load Event';
export const LOAD_EVENT_SUCCESS = '[Events] Load Event success';
export const LOAD_EVENT_FAIL = '[Events] Load Event fail';
export const LOAD_EVENTS = '[Events] Load Events';
export const LOAD_EVENTS_SUCCESS = '[Events] Load Events success';
export const LOAD_EVENTS_FAIL = '[Events] Load Events fail';
export const RELOAD_EVENTS = '[Event] Reload events';
export const RELOAD_ALL_EVENTS = '[Event] Reload All Selected Containers Events';

export class LoadEvents implements Action {
    readonly type = LOAD_EVENTS;
    constructor(public payload: { containerIds: number[], dateFrom: Date, dateTo: Date }) {
    }
}

export class LoadEvent implements Action {
  readonly type = LOAD_EVENT;
  constructor(public payload: { id: number }) {}
}
export class LoadEventSuccess implements Action {
  readonly type = LOAD_EVENT_SUCCESS;
  constructor(public payload: { event: PlannedEvent }) {}
}
export class LoadEventFail implements Action {
  readonly type = LOAD_EVENT_FAIL;
}

export class ReloadEvents implements Action {
    readonly type = RELOAD_EVENTS;
    constructor(public payload: { containerIds: number[] }) {}
}
export class ReloadAllSelectedContainersEvents implements Action {
    readonly type = RELOAD_ALL_EVENTS;
}
export class LoadEventsSuccess implements Action {
    readonly type = LOAD_EVENTS_SUCCESS;
    // constructor(public payload: { [id: number]: PlannedEvent[] }) {}
    constructor(public payload: {
        events: PlannedEvent[],
        notWorkingHoursEvents: PlanSchedule[],
        dateFrom: Date,
        dateTo: Date,
        containers: number[] } ) {}
}
export class LoadEventsFail implements Action {
    readonly type = LOAD_EVENTS_FAIL;
}

export const TOGGLE_LOCK = '[Event] Toggle lock';
export const MASS_TOGGLE_EVENTS_LOCK = '[Event] Mass Toggle Events Lock';
export const TOGGLE_MASSLOCK_POPUP_VISIBILITY = '[Event] Toggle mass lock popup visibility';

export class ToggleEventLock implements Action {
    readonly type = TOGGLE_LOCK;
    constructor(public payload: PlannedEvent) {}
}
export class ToggleMassLockPopup implements Action {
    readonly type = TOGGLE_MASSLOCK_POPUP_VISIBILITY;
    constructor(public payload: { containerIds: number[], visibility: boolean }) {}
}
export class MassToggleEventsLock implements Action {
    readonly type = MASS_TOGGLE_EVENTS_LOCK;
    constructor(public payload: { containerIds: number[], fromDate: Date, toDate: Date }) {}
}

export const CREATE_EVENT = '[Event] Create an event';
export const CREATE_EVENT_SUCCESS = '[Event] Create an event - success';
export const CREATE_EVENT_FAIL = '[Event] Create an evenet - fail';

export class CreateEvent implements Action {
    readonly type = CREATE_EVENT;
    constructor(public payload: PlannedEvent) {}
}
export class CreateEventSuccess implements Action {
    readonly type = CREATE_EVENT_SUCCESS;
    constructor(public payload: PlannedEvent) {}
}
export class CreateEventFail implements Action {
    readonly type = CREATE_EVENT_FAIL;
    constructor() {}
}

export const DELETE_EVENT = '[Event] Delete an event';
export const DELETE_EVENT_SUCCESS = '[Event] Delete an event - success';
export const DELETE_EVENT_FAIL = '[Event] Delete an event - fail';

export class DeleteEvent implements Action {
    readonly type = DELETE_EVENT;
    constructor(public payload: PlannedEvent) {}
}
export class DeleteEventSuccess implements Action {
    readonly type = DELETE_EVENT_SUCCESS;
    constructor(public payload: PlannedEvent) {}
}
export class DeleteEventFail implements Action {
    readonly type = DELETE_EVENT_FAIL;
    constructor() {}
}

export const UPDATE_EVENT = '[Event] Update an event';
export const UPDATE_EVENT_SUCCESS = '[Event] Update an event - success';
export const UPDATE_EVENT_FAIL = '[Event] Update an event - fail';
export const UPDATE_EVENTS = '[Event] Update events';
export const UPDATE_EVENTS_SUCCESS = '[Event] Update events - success';
export const UPDATE_EVENTS_FAIL = '[Event] Update events - fail';

export class UpdateEvent implements Action {
    readonly type = UPDATE_EVENT;
    constructor(public payload: PlannedEvent) {}
}

export class UpdateEventSuccess implements Action {
    readonly type = UPDATE_EVENT_SUCCESS;
    // constructor(public payload: PlannedEvent) {}
}

export class UpdateEventFail implements Action {
    readonly type = UPDATE_EVENT_FAIL;
}

export class UpdateEvents implements Action {
    readonly type = UPDATE_EVENTS;
    constructor(public payload: { planItemMoves: PlannedEventMove[], fixPlanItems: boolean, ignoreStatusLimitation: boolean }) {}
}

export class UpdateEventsSuccess implements Action {
    readonly type = UPDATE_EVENTS_SUCCESS;
    // constructor(public payload: PlannedEvent) {}
}

export class UpdateEventsFail implements Action {
    readonly type = UPDATE_EVENTS_FAIL;
}

export const REMOVE_EVENTS = '[Event] Remove DeSelected Containers Events';
export const REMOVE_ALL_EVENTS = '[Event] Remove Events';

export class RemoveEventsByContainerId implements Action {
    readonly type = REMOVE_EVENTS;
    constructor(public payload: number ) {}
}
export class RemoveEvents implements Action {
    readonly type = REMOVE_ALL_EVENTS;
}

export const GET_ITEMBATCH_TIMEUPDATE_SUGGESTION = '[Event] Get ItemBatch time update suggestion';
export const GET_ITEMBATCH_TIMEUPDATE_SUGGESTION_SUCCESS = '[Event] Get ItemBatch time update suggestion SUCCESS';
export const CLEAR_ITEMBATCH_TIMEUPDATE_SUGGESTION = '[Event] Clear ItemBatch time update suggestion';

export class GetItemBatchTimeUpdateSuggestion implements Action {
    readonly type = GET_ITEMBATCH_TIMEUPDATE_SUGGESTION;
    constructor(public payload: number) {}
}
export class GetItemBatchTimeUpdateSuggestionSuccess implements Action {
    readonly type = GET_ITEMBATCH_TIMEUPDATE_SUGGESTION_SUCCESS;
    constructor(public payload: PlannedEventMove[]) {}
}
export class ClearItemBatchTimeUpdateSuggestion implements Action {
    readonly type = CLEAR_ITEMBATCH_TIMEUPDATE_SUGGESTION;
}

export const GET_REALIZATION_TIMEUPDATE_SUGGESTION = '[Event] Get realization time update suggestion';
export const GET_REALIZATION_TIMEUPDATE_SUGGESTION_SUCCESS = '[Event] Get realization time update suggestion SUCCESS';
export const CLEAR_REALIZATION_TIMEUPDATE_SUGGESTION = '[Event] Clear realization time update suggestion';

export class GetRealizationTimeUpdateSuggestion implements Action {
    readonly type = GET_REALIZATION_TIMEUPDATE_SUGGESTION;
    constructor(public payload: { containerIds: number[], fromDate: Date, toDate: Date }) {}
}
export class GetRealizationTimeUpdateSuggestionSuccess implements Action {
    readonly type = GET_REALIZATION_TIMEUPDATE_SUGGESTION_SUCCESS;
    constructor(public payload: PlannedEventMove[]) {}
}
export class ClearRealizationTimeUpdateSuggestion implements Action {
    readonly type = CLEAR_REALIZATION_TIMEUPDATE_SUGGESTION;
}

export const GET_NOTWORKINGHOURS_PLANITEM_UPDATE_SUGGESTION = '[Event] Get PlanItem notworkingHours update suggestion';
export const GET_NOTWORKINGHOURS_PLANITEM_UPDATE_SUGGESTION_SUCCESS = '[Event] Get PlanItem notworkingHours update suggestion SUCCESS';
export const CLEAR_NOTWORKINGHOURS_PLANITEM_SUGGESTION = '[Event] Clear PlanItem notworkingHours update suggestion';

export class GetNotWorkingHoursPlanItemUpdateSuggestion implements Action {
    readonly type = GET_NOTWORKINGHOURS_PLANITEM_UPDATE_SUGGESTION;
    constructor(public payload: number) {}
}
export class GetNotWorkingHoursPlanItemUpdateSuggestionSuccess implements Action {
    readonly type = GET_NOTWORKINGHOURS_PLANITEM_UPDATE_SUGGESTION_SUCCESS;
    constructor(public payload: PlannedEventNotWorkingHoursMove) {}
}
export class ClearNotWorkingHoursPlanItemUpdateSuggestion implements Action {
    readonly type = CLEAR_NOTWORKINGHOURS_PLANITEM_SUGGESTION;
}

export const SET_CURRENTDATE = '[Event] Set current date';

export class SetSchedulerCurrentDate {
    readonly type = SET_CURRENTDATE;
    constructor(public payload: Date) {}
}

export const SHOW_PLANITEM_DETAIL_POPUP = '[Event] Show PlanItem detail popup';
export const HIDE_PLANITEM_DETAIL_POPUP = '[Event] Hide PlanItem detail popup';
export class ShowPlanItemDetailPopup implements Action {
  readonly type = SHOW_PLANITEM_DETAIL_POPUP;
  constructor(public payload: { id: number }) {}
}
export class HidePlanItemDetailPopup implements Action {
  readonly type = HIDE_PLANITEM_DETAIL_POPUP;
}

export type EventsAction =
    | LoadEvents
    | LoadEventsSuccess
    | LoadEventsFail
    | CreateEvent
    | CreateEventSuccess
    | CreateEventFail
    | DeleteEvent
    | DeleteEventSuccess
    | DeleteEventFail
    | UpdateEvent
    | UpdateEventSuccess
    | UpdateEventFail
    | ToggleEventLock
    | MassToggleEventsLock
    | ReloadEvents
    | ToggleMassLockPopup
    | ReloadAllSelectedContainersEvents
    | RemoveEventsByContainerId
    | RemoveEvents
    | GetItemBatchTimeUpdateSuggestion
    | GetItemBatchTimeUpdateSuggestionSuccess
    | ClearItemBatchTimeUpdateSuggestion
    | GetNotWorkingHoursPlanItemUpdateSuggestion
    | GetNotWorkingHoursPlanItemUpdateSuggestionSuccess
    | ClearNotWorkingHoursPlanItemUpdateSuggestion
    | UpdateEvents
    | UpdateEventsFail
    | UpdateEventsSuccess
    | SetSchedulerCurrentDate
    | ClearRealizationTimeUpdateSuggestion
    | GetRealizationTimeUpdateSuggestion
    | GetRealizationTimeUpdateSuggestionSuccess
    | LoadEvent
    | LoadEventSuccess
    | LoadEventFail
    | ShowPlanItemDetailPopup
    | HidePlanItemDetailPopup
    ;
