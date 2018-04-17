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
        default:
            return state;
    }
}

