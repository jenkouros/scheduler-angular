import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { PlannedEvent } from '../../models/event.model';
import { PlanSchedule } from '../../models/planschedule.dto';

export const getEventsState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.events
);

const _getStoreEvents = createSelector(
    getEventsState,
    (state: fromFeature.EventsState) => {
        return state.entities;
    }
);

export const getEvents = createSelector(
    _getStoreEvents,
    storeEvents => {
        let events: PlannedEvent[] = [];
        const notWorkingHoursEvents: {[idContainer: number]: PlanSchedule[]} = {};
        for (const key in storeEvents) {
            if (storeEvents.hasOwnProperty(key)) {
                notWorkingHoursEvents[key] = storeEvents[key].notWorkingHoursEvents;
                events = events.concat(storeEvents[key].events);
            }
        }
        return {
            planItems: events,
            notWorkingHoursEvents: notWorkingHoursEvents
        };
    }
);

export const getEventsForContainers = (containerIds: number[]) => createSelector(
    _getStoreEvents,
    storeEvents => {
        let events: PlannedEvent[] = [];
        for (const key of containerIds) {
            if (storeEvents.hasOwnProperty(key)) {
                events = events.concat(storeEvents[key].events);
            }
        }
        return events;
    }
);

export const getItemBatchTimeUpdateSuggestion = createSelector(
    getEventsState,
    state => state.timeUpdateSuggestion
);


export const getNotWorkingHoursUpdateSuggestion = createSelector(
    getEventsState,
    state => state.notWorkingHoursTimeUpdateSuggestion
);

export const getEventsUiState = createSelector(
    getEventsState,
    state => state.uiState
);
