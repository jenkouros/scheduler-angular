import * as fromPlanItems from './planitems.reducer';
import * as fromFilters from './filters.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SchedulerState {
    filters: fromFilters.FilterState;
    planitems: fromPlanItems.PlanItemState;
    
}

export function getInitialState() {
    return {
        filters: fromFilters.initialState,
        planitems: fromPlanItems.initialState
    } as SchedulerState;
}

export const reducers: ActionReducerMap<SchedulerState> = {
    filters: fromFilters.filtersReducer,
    planitems: fromPlanItems.planItemsReducer
    
};

export const getSchedulerState = createFeatureSelector<SchedulerState>('scheduler');
export { PlanItemState } from './planitems.reducer';
export { FilterState } from './filters.reducer';