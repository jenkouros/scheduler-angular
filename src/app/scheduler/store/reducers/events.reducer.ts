import * as fromAction from '../actions/events.action';
import { ContainerEvents, PlannedEvent, PlannedEventMove, PlannedEventNotWorkingHoursMove } from '../../models/event.model';
import { PlanSchedule } from '../../models/planschedule.dto';

export interface EventsState {
    entities: {[idContainer: number]: ContainerEvents };
    selectedEvent: PlannedEvent | null;
    loading: boolean;
    loaded: boolean;
    timeUpdateSuggestion: {[idPrePlanItem: number]: PlannedEventMove} | null;
    timeUpdateByRealizationSuggestion: {[idPlanItem: number]: PlannedEventMove} | null;
    notWorkingHoursTimeUpdateSuggestion: PlannedEventNotWorkingHoursMove | null;
    uiState: {
        massLockPopup: {
            visibility: boolean,
            massLockPopupContainers: number[]
        },
        idItemBatchTimeUpdateSuggestion: number | null,
        idPlanItemNotWorkingHoursTimeUpdateSuggestion: number | null,
        schedulerCurrentDate: Date | null,
        eventDetailPopup: boolean
    };
}

export const initialState: EventsState = {
    entities: {},
    selectedEvent: null,
    loaded: false,
    loading: false,
    timeUpdateSuggestion: null,
    timeUpdateByRealizationSuggestion: null,
    notWorkingHoursTimeUpdateSuggestion: null,
    uiState: {
        massLockPopup: {
            visibility: false,
            massLockPopupContainers: []
        },
        idItemBatchTimeUpdateSuggestion: null,
        idPlanItemNotWorkingHoursTimeUpdateSuggestion: null,
        schedulerCurrentDate: null,
        eventDetailPopup: false
    }
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
        case fromAction.LOAD_EVENT_SUCCESS: {
          return {
            ...state,
            selectedEvent: action.payload.event
          };
        }
        case fromAction.SHOW_PLANITEM_DETAIL_POPUP: {
          const uiState = {
            ...state.uiState,
            eventDetailPopup: true
          };
          return {
            ...state,
            uiState: uiState
          };
        }
        case fromAction.HIDE_PLANITEM_DETAIL_POPUP: {
          const uiState = {
            ...state.uiState,
            eventDetailPopup: false
          };
          return {
            ...state,
            selectedEvent: null,
            uiState: uiState
          };
        }
        case fromAction.LOAD_EVENTS_SUCCESS: {
            const events: { [id: number]: ContainerEvents } = { ...state.entities };

            const dict: {[containerId: number]: PlannedEvent[] } = {};

            for (const event of action.payload.events) {
                if (event.hasOwnProperty('containerId')) {
                    if (!dict[event.containerId]) {
                        dict[event.containerId] = [];
                    }
                    dict[event.containerId].push(event);
                }
            }

            const notWorkingHoursDict: {[containerId: number]: PlanSchedule[] } = [];
            for (const notWorkingHoursEvent of action.payload.notWorkingHoursEvents) {
                if (notWorkingHoursEvent.hasOwnProperty('idContainer')) {
                    if (!notWorkingHoursDict[notWorkingHoursEvent.idContainer]) {
                        notWorkingHoursDict[notWorkingHoursEvent.idContainer] = [];
                    }
                    notWorkingHoursDict[notWorkingHoursEvent.idContainer].push(notWorkingHoursEvent);
                }
            }

            for (const key of action.payload.containers) {
                events[key] = {
                    events: dict[key] || [],
                    notWorkingHoursEvents: notWorkingHoursDict[key] || [],
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
        case fromAction.CREATE_EVENT_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
        case fromAction.DELETE_EVENT_SUCCESS: {
            const containerEvents =  { ...state.entities };
            containerEvents[action.payload.containerId] = {
                ...containerEvents[action.payload.containerId],
                events: containerEvents[action.payload.containerId].events.filter((item) =>
                    item.id !== action.payload.id)
            };

            // containerEvents[action.payload.containerId].events = containerEvents[action.payload.containerId].events.filter((item) =>
            //     item.id !== action.payload.id);

            return {
                ...state,
                entities: containerEvents,
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
        case fromAction.REMOVE_EVENTS: {
            const { [action.payload]: removed, ...events} = state.entities;
            console.log(action.payload);
            return {
                ...state,
                entities: events,
                loaded: false,
                loading: false
            };
        }
        case fromAction.REMOVE_ALL_EVENTS: {
            return {
                ...state,
                entities: {},
                loaded: false,
                loading: false
            };
        }
        case fromAction.GET_ITEMBATCH_TIMEUPDATE_SUGGESTION: {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    idItemBatchTimeUpdateSuggestion: action.payload
                }
            };
        }
        case fromAction.CLEAR_ITEMBATCH_TIMEUPDATE_SUGGESTION: {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    idItemBatchTimeUpdateSuggestion: null
                },
                timeUpdateSuggestion: null
            };
        }
        case fromAction.GET_ITEMBATCH_TIMEUPDATE_SUGGESTION_SUCCESS: {
            const suggestion: { [idPrePlanItem: number]: PlannedEventMove } = {};
            action.payload.forEach(move => suggestion[move.idPrePlanItem] = move);

            return {
                ...state,
                timeUpdateSuggestion: suggestion
            };
        }
        case fromAction.GET_NOTWORKINGHOURS_PLANITEM_UPDATE_SUGGESTION_SUCCESS: {
            return {
                ...state,
                notWorkingHoursTimeUpdateSuggestion: action.payload
            };
        }
        case fromAction.GET_ITEMBATCH_TIMEUPDATE_SUGGESTION: {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    idPlanItemNotWorkingHoursTimeUpdateSuggestion: action.payload
                }
            };
        }

        case fromAction.CLEAR_NOTWORKINGHOURS_PLANITEM_SUGGESTION: {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    idPlanItemNotWorkingHoursTimeUpdateSuggestion: null
                },
                notWorkingHoursTimeUpdateSuggestion: null
            };
        }
        case fromAction.CLEAR_REALIZATION_TIMEUPDATE_SUGGESTION: {
            return {
                ...state,
                timeUpdateByRealizationSuggestion: null
            };
        }
        case fromAction.GET_REALIZATION_TIMEUPDATE_SUGGESTION_SUCCESS: {
            const suggestion: { [idPlanItem: number]: PlannedEventMove } = {};
            action.payload.forEach(move => suggestion[move.idPlanItem] = move);
            return {
                ...state,
                timeUpdateByRealizationSuggestion: suggestion
            };
        }

        case fromAction.SET_CURRENTDATE: {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    schedulerCurrentDate: action.payload
                }
            };
        }

        default:
            return state;
    }
}

