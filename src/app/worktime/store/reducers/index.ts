import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCalendars from '../reducers/calendars.reducer';
import * as fromSubCalendars from '../reducers/subcalendars.reducer';
import * as fromTimeTables from '../reducers/timetables.reducer';
import * as fromContainers from './containers.reducer';

export interface WorkTimeState {
  calendars: fromCalendars.CalendarsState;
  subcalendars: fromSubCalendars.SubCalendarsState;
  timetables: fromTimeTables.TimeTablesState;
  containers: fromContainers.ContainersState;
}

export const reducers: ActionReducerMap<WorkTimeState> = {
  calendars: fromCalendars.reducer,
  subcalendars: fromSubCalendars.reducer,
  timetables: fromTimeTables.reducer,
  containers: fromContainers.reducer
};

export const getWorkTimeState = createFeatureSelector<WorkTimeState>(
  'worktime'
);
