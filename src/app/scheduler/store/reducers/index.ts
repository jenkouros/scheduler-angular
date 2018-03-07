import * as fromPlanItems from './planitems.reducer';
import * as fromFilters from './filters.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SchedulerState {
    planitems: fromPlanItems.PlanItemState;
    filters: fromFilters.FilterState;
}

export const reducers: ActionReducerMap<SchedulerState> = {
    planitems: fromPlanItems.planItemsReducer,
    filters: fromFilters.filtersReducer
};

export const getSchedulerState = createFeatureSelector<SchedulerState>('scheduler');
export { PlanItemState } from './planitems.reducer';
export { FilterState } from './filters.reducer';