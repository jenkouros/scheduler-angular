import * as fromAction from '../actions/events.action';
import { PlannedEvent } from '../../models/event.model';
import { ItemsList } from '@ng-select/ng-select/ng-select/items-list';

export interface EventsState {
    entities: {[id: number]: PlannedEvent[]};
    loading: boolean;
    loaded: boolean;
}

export const initialState: EventsState = {
    entities: {},
    loaded: false,
    loading: false
};

export function eventsReducer(
    state = initialState,
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
            const events: {[id: number]: PlannedEvent[]} = {};
            for (const event of action.payload) {
                if (event.hasOwnProperty('containerId')) {
                    events[event.containerId] = [...events[event.containerId] || [], event];
                }
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
        case fromAction.CREATE_EVENT: {
            return {
                ...state,
                loaded: false,
                loading: true
            };
        }
        case fromAction.CREATE_EVENT_SUCCESS: {
            const events =  { ...state.entities };
            events[action.payload.containerId] = [...events[action.payload.containerId] || [], action.payload];

            return {
                ...state,
                entities: events
            };
        }
        case fromAction.CREATE_EVENT_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
        case fromAction.DELETE_EVENT_SUCCESS: {
            const events =  { ...state.entities };
            events[action.payload.containerId] = events[action.payload.containerId].filter((item) => item.id !== action.payload.id);

            return {
                ...state,
                entities: events,
                loaded: false,
                loading: false
            };
        }
        default:
            return state;
    }
}

