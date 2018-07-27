import * as fromFeature from '../reducers';
import * as fromTimeTables from '../reducers/timetables.reducer';
import { createSelector } from '@ngrx/store';



// timetables state
export const getTimeTablesState = createSelector(
  fromFeature.getWorkTimeState,
  (state: fromFeature.WorkTimeState) => state.timetables
);

export const getTimeTablesEntities = createSelector(
  getTimeTablesState,
  fromTimeTables.getTimeTablesEntities
);

export const getTimeTables = createSelector(getTimeTablesEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getTimeTablesLoaded = createSelector(
  getTimeTablesState,
  fromTimeTables.getTimeTablesLoaded
);

export const getTimeTablesCalendarId = createSelector(
  getTimeTablesState,
  fromTimeTables.getTimeTablesCalendarId
);
