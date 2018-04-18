import * as fromPlanItems from './planitems.reducer';
import * as fromFilters from './filters.reducer';
import * as fromContainers from './containers.reducer';
import * as fromEvents from './events.reducer';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SchedulerState {
    filters: fromFilters.FilterState;
    planitems: fromPlanItems.PlanItemState;
    containers: fromContainers.ContainerState;
    events: fromEvents.EventsState;
}

export function getInitialState() {
    return {
        filters: fromFilters.initialState,
        planitems: fromPlanItems.initialState,
        containers: fromContainers.initialState,
        events: fromEvents.initialState
    } as SchedulerState;
}

export const reducers: ActionReducerMap<SchedulerState> = {
    filters: fromFilters.filtersReducer,
    planitems: fromPlanItems.planItemsReducer,
    containers: fromContainers.containerReducer,
    events: fromEvents.eventsReducer
};

export const getSchedulerState = createFeatureSelector<SchedulerState>('scheduler');
export { PlanItemState } from './planitems.reducer';
export { FilterState } from './filters.reducer';
export { ContainerState } from './containers.reducer';
export { EventsState } from './events.reducer';
