import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getEventsState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.events
);

export const getEvents = createSelector(
    getEventsState,
    (state: fromFeature.EventsState) => {
        return state.entities;
    }
);
