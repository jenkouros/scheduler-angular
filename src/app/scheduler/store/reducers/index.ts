import * as fromWorkorders from './workorders.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SchedulerState {
    workorders: fromWorkorders.WorkorderState;
}

export const reducers: ActionReducerMap<SchedulerState> = {
    workorders: fromWorkorders.workordersReducer
};

export const getSchedulerState = createFeatureSelector<SchedulerState>('scheduler');