import * as fromWorkorders from './planitems.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SchedulerState {
    planitems: fromWorkorders.PlanItemState;
}

export const reducers: ActionReducerMap<SchedulerState> = {
    planitems: fromWorkorders.planItemsReducer
};

export const getSchedulerState = createFeatureSelector<SchedulerState>('scheduler');