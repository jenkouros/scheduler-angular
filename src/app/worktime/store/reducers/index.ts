import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCalendars from '../reducers/calendars.reducer';
import * as fromTimeTables from '../reducers/timetables.reducer';
import { timeInterval } from 'rxjs/operators';

export interface WorkTimeState {
  calendars: fromCalendars.CalendarsState;
  timetables: fromTimeTables.TimeTablesState;
}

export const reducers: ActionReducerMap<WorkTimeState> = {
  calendars: fromCalendars.reducer,
  timetables: fromTimeTables.reducer
};

export const getWorkTimeState = createFeatureSelector<WorkTimeState>(
  'worktime'
);
