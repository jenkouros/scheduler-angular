import * as fromFeature from '../reducers';
import * as fromCalendars from '../reducers/calendars.reducer';
import { createSelector } from '@ngrx/store';

// calendars state
export const getCalendarsState = createSelector(
  fromFeature.getWorkTimeState,
  (state: fromFeature.WorkTimeState) => state.calendars
);

export const getCalendarsEntities = createSelector(
  getCalendarsState,
  fromCalendars.getCalendarsEntities
);

// array of calendars
export const getAllCalendars = createSelector(
  getCalendarsEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getCalendarsLoaded = createSelector(
  getCalendarsState,
  fromCalendars.getCalendarsLoaded
);

export const getCalendarsLoading = createSelector(
  getCalendarsState,
  fromCalendars.getCalendarsLoading
);

export const getCalendarsSelectedId = createSelector(
  getCalendarsState,
  fromCalendars.getCalendarsSelectedId
);

export const getCalendarsSelected = createSelector(
  getCalendarsEntities,
  getCalendarsSelectedId,
  (entities, id) => {
    // console.log(entities, id);
    return entities[id];
  }
);
