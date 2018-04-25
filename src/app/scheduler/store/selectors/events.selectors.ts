import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { PlannedEvent } from '../../models/event.model';

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
        for (const key in storeEvents) {
            if (storeEvents.hasOwnProperty(key)) {
                events = events.concat(storeEvents[key]);
            }
        }
        return events;
    }
);

export function getEventsForContainers(containerIds: number[]) {
    return createSelector(
        _getStoreEvents,
        storeEvents => {
            let events: PlannedEvent[] = [];
            for (const i of containerIds) {
                if (storeEvents.hasOwnProperty(i)) {
                    events = events.concat(storeEvents[i]);
                }
            }
            return events;
        }
    );
}