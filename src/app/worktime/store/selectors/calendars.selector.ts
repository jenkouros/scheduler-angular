import * as fromFeature from '../reducers';
import * as fromCalendars from '../reducers/calendars.reducer';
import { createSelector } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';

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

export const getCalendarsSelectedOld = createSelector(
  getCalendarsEntities,
  fromRoot.getRouterState,
  (entities, router) => {
    return router.state && entities[router.state.params.calendarId];
  }
);

export const getCalendarsSelected = createSelector(
  getCalendarsEntities,
  getCalendarsSelectedId,
  (entities, id) => {
    return entities[id];
  }
);
// = (containerIds: number[]) => createSelector(
export const getCalendarById = (id: number) =>
  createSelector(
    getCalendarsEntities,
    entities => {
      return entities[id];
    }
  );

export const getCalendarPopupVisibility = createSelector(
  getCalendarsState,
  fromCalendars.getCalendarPopupVisibility
);

export const getSubCalendars = (calendarId: number) =>
  createSelector(
    getCalendarsEntities,
    entities => {
      return entities[calendarId].subCalendars;
    }
  );

export const getCalendarGeneratePopupVisibility = createSelector(
  getCalendarsState,
  fromCalendars.getCalendarGeneratePopupVisibility
);
