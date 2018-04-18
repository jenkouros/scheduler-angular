import * as fromAction from '../actions/events.action';
import { PlannedEvent } from '../../models/event.model';

export interface EventsState {
    entities: {[containerId: number]: PlannedEvent[]};
    loading: boolean;
    loaded: boolean;
}

export const initialState: EventsState = {
    entities: {},
    loaded: false,
    loading: false
};

export function eventsReducer(
    state: EventsState,
    action: fromAction.EventsAction
): EventsState {
    switch (action.type) {
        case fromAction.LOAD_EVENTS: {
            return {
                ...state,
                loading: true
            };
        }
        case fromAction.LOAD_EVENTS_SUCCESS: {
            const events = { ...state.entities };
            // tslint:disable-next-line:forin
            for (const key in action.payload) {
                events[key] = action.payload[key];
            }
            return {
                ...state,
                loading: false,
                loaded: true,
                entities: events
            };
        }
        case fromAction.LOAD_EVENTS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
        default:
            return state;
    }
}

