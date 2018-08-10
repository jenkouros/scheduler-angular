import * as fromFeature from '../reducers';
import * as fromSubCalendars from '../reducers/subcalendars.reducer';
import { createSelector } from '@ngrx/store';

// subcalendars state
export const getSubCalendarsState = createSelector(
  fromFeature.getWorkTimeState,
  (state: fromFeature.WorkTimeState) => state.subcalendars
);

export const getSubCalendarsEntities = createSelector(
  getSubCalendarsState,
  fromSubCalendars.getSubCalendarsEntities
);

// array of subcalendars
export const getAllSubCalendars = createSelector(
  getSubCalendarsState,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getSubCalendarsLoaded = createSelector(
  getSubCalendarsState,
  fromSubCalendars.getSubCalendarsLoaded
);

export const getSubCalendarsLoading = createSelector(
  getSubCalendarsState,
  fromSubCalendars.getSubCalendarsLoading
);

export const getSubCalendarsSelectedId = createSelector(
  getSubCalendarsState,
  fromSubCalendars.getSubCalendarsSelectedId
);

export const getSubCalendarsEditingId = createSelector(
  getSubCalendarsState,
  fromSubCalendars.getSubCalendarsEditingId
);

export const getSubCalendarsSelected = createSelector(
  getSubCalendarsEntities,
  getSubCalendarsSelectedId,
  (entities, id) => {
    return entities[id];
  }
);

export const getSubCalendarPopupVisibility = createSelector(
  getSubCalendarsState,
  fromSubCalendars.getSubCalendarPopupVisibility
);

export const getSubCalendarsEditSelected = createSelector(
  getSubCalendarsEntities,
  getSubCalendarsEditingId,
  (entities, id) => {
    return entities[id];
  }
);

export const getDeleteSubCalendarPopupVisibility = createSelector(
  getSubCalendarsState,
  fromSubCalendars.getSubCalendarDeletePopupVisibility
);
