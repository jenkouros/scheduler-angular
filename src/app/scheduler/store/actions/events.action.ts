import { Action } from '@ngrx/store';
import { PlannedEvent } from '../../models/event.model';

export const LOAD_EVENTS = '[Events] Load Events';
export const LOAD_EVENTS_SUCCESS = '[Events] Load Events success';
export const LOAD_EVENTS_FAIL = '[Events] Load Events fail';

export class LoadEvents implements Action {
    readonly type = LOAD_EVENTS;
    constructor(public payload: { containerIds: number[], dateFrom: Date, dateTo: Date }) {}
}
export class LoadEventsSuccess implements Action {
    readonly type = LOAD_EVENTS_SUCCESS;
    // constructor(public payload: { [id: number]: PlannedEvent[] }) {}
    constructor(public payload:  PlannedEvent[] ) {}
}
export class LoadEventsFail implements Action {
    readonly type = LOAD_EVENTS_FAIL;
}

export type EventsAction =
    | LoadEvents
    | LoadEventsSuccess
    | LoadEventsFail;
