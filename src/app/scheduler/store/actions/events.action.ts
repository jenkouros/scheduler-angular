import { Action } from '@ngrx/store';
import { PlannedEvent } from '../../models/event.model';

export const LOAD_EVENTS = '[Events] Load Events';
export const LOAD_EVENTS_SUCCESS = '[Events] Load Events success';
export const LOAD_EVENTS_FAIL = '[Events] Load Events fail';
export const CREATE_EVENT = '[Event] Create an event';
export const CREATE_EVENT_SUCCESS = '[Event] Create an event - success';
export const CREATE_EVENT_FAIL = '[Event] Create an evenet - fail';
export const DELETE_EVENT = '[Event] Delete an event';
export const DELETE_EVENT_SUCCESS = '[Event] Delete an event - success';
export const DELETE_EVENT_FAIL = '[Event] Delete an event - fail';
export const UPDATE_EVENT = '[Event] Update an event';
export const UPDATE_EVENT_SUCCESS = '[Event] Update an event - success';
export const UPDATE_EVENT_FAIL = '[Event] Update an event - fail';
export const RELOAD_EVENTS = '[Event] Reload events';
export const TOGGLE_LOCK = '[Event] Toggle lock';
export const MASS_TOGGLE_EVENTS_LOCK = '[Event] Mass Toggle Events Lock';
export const TOGGLE_MASSLOCK_POPUP_VISIBILITY = '[Event] Toggle mass lock popup visibility';
export const RELOAD_ALL_EVENTS = '[Event] Reload All Selected Containers Events';

export class LoadEvents implements Action {
    readonly type = LOAD_EVENTS;
    constructor(public payload: { containerIds: number[], dateFrom: Date, dateTo: Date }) {
    }
}

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
    constructor(public payload: { events: PlannedEvent[], dateFrom: Date, dateTo: Date, containers: number[] } ) {}
}
export class LoadEventsFail implements Action {
    readonly type = LOAD_EVENTS_FAIL;
}

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
    constructor() {}
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
    | ReloadAllSelectedContainersEvents;
