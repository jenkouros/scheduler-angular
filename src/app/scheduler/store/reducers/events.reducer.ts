import * as fromAction from '../actions/events.action';
import { ContainerEvents, PlannedEvent } from '../../models/event.model';

export interface EventsState {
    entities: {[idContainer: number]: ContainerEvents };
    loading: boolean;
    loaded: boolean;
    uiState: {
        massLockPopup: {
            visibility: boolean,
            massLockPopupContainers: number[]
        }
    };
}

export const initialState: EventsState = {
    entities: {},
    loaded: false,
    loading: false,
    uiState: {
        massLockPopup: {
            visibility: false,
            massLockPopupContainers: []
        }
    }
};

export function eventsReducer(
    state = initialState,
    action: fromAction.EventsAction
): EventsState {
    switch (action.type) {
        case fromAction.LOAD_EVENTS: {
            // const events = { ...state.entities };
            // for (const i of action.payload.containerIds) {
            //     const containerEvents: ContainerEvents = {
            //         ...events[i],
            //         dateFrom: action.payload.dateFrom,
            //         dateTo: action.payload.dateTo,
            //         events: events[i] ? [...events[i].events] : []
            //     };
            //     events[i] = containerEvents;
            // }
            // return {
            //     ...state,
            //     loading: true,
            //     entities: events
            // };
            return {
                ...state,
                loading: true
            };
        }
        case fromAction.LOAD_EVENTS_SUCCESS: {
            const events: { [id: number]: ContainerEvents } = { ...state.entities };

            const dict: {[containerId: number]: PlannedEvent[] } = {};

            // const initDictionary: number[] = [];
            for (const event of action.payload.events) {
                if (event.hasOwnProperty('containerId')) {
                    if (!dict[event.containerId]) {
                        dict[event.containerId] = [];
                    }
                    dict[event.containerId].push(event);

                    // if (initDictionary.indexOf(event.containerId) < 0) {
                    //     events[event.containerId].events = [];
                    //     initDictionary.push(event.containerId);
                    // }

                    // events[event.containerId] = {
                    //     events: [...events[event.containerId].events, event],
                    //     dateFrom: action.payload.dateFrom,
                    //     dateTo: action.payload.dateTo
                    // };
                }
            }

            for (const key of action.payload.containers) {
                events[key] = {
                    events: dict[key] || [],
                    dateFrom: action.payload.dateFrom,
                    dateTo: action.payload.dateTo
                };
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
        // case fromAction.UPDATE_EVENT_SUCCESS:
        // case fromAction.CREATE_EVENT_SUCCESS: {
        //     const events =  { ...state.entities };

        //     // if (!events[action.payload.containerId]) {
        //     //     events[action.payload.containerId] = <any>{};
        //     // }

        //     events[action.payload.containerId] = {
        //         ...events[action.payload.containerId],
        //         events: [...events[action.payload.containerId].events || [], action.payload]
        //     };

        //     return {
        //         ...state,
        //         entities: events
        //     };
        // }
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
        case fromAction.TOGGLE_MASSLOCK_POPUP_VISIBILITY: {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    massLockPopup: {
                        visibility: action.payload.visibility,
                        massLockPopupContainers: action.payload.containerIds
                    }
                }
            };
        }

        default:
            return state;
    }
}

