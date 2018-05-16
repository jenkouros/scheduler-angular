import * as fromAction from '../actions/events.action';
import { ContainerEvents } from '../../models/event.model';
import { ItemsList } from '@ng-select/ng-select/ng-select/items-list';

export interface EventsState {
    entities: {[idContainer: number]: ContainerEvents };
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
            const events: { [id: number]: ContainerEvents } = {};
            for (const event of action.payload.events) {
                if (event.hasOwnProperty('containerId')) {
                    const existingEvents = events[event.containerId] ? events[event.containerId].events : [];

                    events[event.containerId] = {
                        events: [...existingEvents, event],
                        dateFrom: action.payload.dateFrom,
                        dateTo: action.payload.dateTo
                    };
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
        case fromAction.UPDATE_EVENT_SUCCESS:
        case fromAction.CREATE_EVENT_SUCCESS: {
            const events =  { ...state.entities };

            // if (!events[action.payload.containerId]) {
            //     events[action.payload.containerId] = <any>{};
            // }

            events[action.payload.containerId] = {
                ...events[action.payload.containerId],
                events: [...events[action.payload.containerId].events || [], action.payload]
            };

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
            events[action.payload.containerId].events = events[action.payload.containerId].events.filter((item) =>
                item.id !== action.payload.id);

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

