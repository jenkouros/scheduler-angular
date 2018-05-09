import { Action } from '@ngrx/store';
import { PlannedEvent } from '../../models/event.model';

export const LOAD_EVENTS = '[Events] Load Events';
export const LOAD_EVENTS_SUCCESS = '[Events] Load Events success';
export const LOAD_EVENTS_FAIL = '[Events] Load Events fail';
export const CREATE_EVENT = '[Event] Create an event';
export const CREATE_EVENT_SUCCESS = '[Event] Create an event - sucess';
export const CREATE_EVENT_FAIL = '[Event] Create an evenet - fail';

export class LoadEvents implements Action {
    readonly type = LOAD_EVENTS;
    constructor(public payload: { containerIds: number[], dateFrom: Date, dateTo: Date }) {
        console.log(payload);
    }
}
export class LoadEventsSuccess implements Action {
    readonly type = LOAD_EVENTS_SUCCESS;
    // constructor(public payload: { [id: number]: PlannedEvent[] }) {}
    constructor(public payload:  PlannedEvent[] ) {}
}
export class LoadEventsFail implements Action {
    readonly type = LOAD_EVENTS_FAIL;
}

export class CreateEvent implements Action {
    readonly type = CREATE_EVENT;
    constructor(public payload: PlannedEvent) {}
}
export class CreateEventSucess implements Action {
    readonly type = CREATE_EVENT_SUCCESS;
    constructor(public payload: PlannedEvent) {}
}
export class CreateEventFail implements Action {
    readonly type = CREATE_EVENT_FAIL;
    constructor() {}
}

export type EventsAction =
    | LoadEvents
    | LoadEventsSuccess
    | LoadEventsFail
    | CreateEvent
    | CreateEventSucess
    | CreateEventFail;
