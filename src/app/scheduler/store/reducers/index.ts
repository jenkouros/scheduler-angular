import * as fromPlanItems from './planitems.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SchedulerState {
    planitems: fromPlanItems.PlanItemState;
}

export const reducers: ActionReducerMap<SchedulerState> = {
    planitems: fromPlanItems.planItemsReducer
};

export const getSchedulerState = createFeatureSelector<SchedulerState>('scheduler');
export { PlanItemState } from './planitems.reducer';