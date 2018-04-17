import * as fromPlanItems from './planitems.reducer';
import * as fromFilters from './filters.reducer';
import * as fromPlanner from './planner.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SchedulerState {
    filters: fromFilters.FilterState;
    planitems: fromPlanItems.PlanItemState;
    planner: fromPlanner.PlannerState;
}

export function getInitialState() {
    return {
        filters: fromFilters.initialState,
        planitems: fromPlanItems.initialState,
        planner: fromPlanner.initialState
    } as SchedulerState;
}

export const reducers: ActionReducerMap<SchedulerState> = {
    filters: fromFilters.filtersReducer,
    planitems: fromPlanItems.planItemsReducer,
    planner: fromPlanner.plannerReducer
};

export const getSchedulerState = createFeatureSelector<SchedulerState>('scheduler');
export { PlanItemState } from './planitems.reducer';
export { FilterState } from './filters.reducer';
export { PlannerState } from './planner.reducer';