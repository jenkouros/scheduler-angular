import * as fromAction from '../actions/events.action';
import { PlannedEvent } from '../../models/event.model';

export interface EventsState {
    entities: {[id: number]: PlannedEvent};
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

            const events = action.payload;
            const entities = events.reduce(
            (entities: { [id: number]: PlannedEvent}, event: PlannedEvent) => {
                return {
                    ...entities,
                    [event.containerId]: event,
                };
            },
            {
                ...state.entities
            }
            );
            return {
                ...state,
                loading: false,
                loaded: true,
                entities,
            };
            /*
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
            */
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
            // const event = {[action.payload.containerId]: action.payload};
            return {
                ...state,
                loaded: true,
                loading: false
            };
        }
        case fromAction.CREATE_EVENT_FAIL: {
            // const event = {[action.payload.containerId]: action.payload};
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

