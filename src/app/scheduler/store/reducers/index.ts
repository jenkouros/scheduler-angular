import * as fromPlanItems from './planitems.reducer';
import * as fromFilters from './filters.reducer';
import * as fromContainers from './containers.reducer';
import * as fromEvents from './events.reducer';
import * as fromPreplanitems from './prePlanItems.reducer';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SchedulerState {
    filters: fromFilters.FilterState;
    planitems: fromPlanItems.PlanItemState;
    containers: fromContainers.ContainerState;
    events: fromEvents.EventsState;
    preplanitems: fromPreplanitems.PreplanitemState;
}

export function getInitialState() {
    return {
        filters: fromFilters.initialState,
        planitems: fromPlanItems.initialState,
        containers: fromContainers.initialState,
        events: fromEvents.initialState,
        preplanitems: fromPreplanitems.initState
    } as SchedulerState;
}

export const reducers: ActionReducerMap<SchedulerState> = {
    filters: fromFilters.filtersReducer,
    planitems: fromPlanItems.planItemsReducer,
    containers: fromContainers.containerReducer,
    events: fromEvents.eventsReducer,
    preplanitems: fromPreplanitems.prePlanItems
};

export const getSchedulerState = createFeatureSelector<SchedulerState>('scheduler');
export { PlanItemState, PlanItemUIState } from './planitems.reducer';
export { FilterState } from './filters.reducer';
export { ContainerState } from './containers.reducer';
export { EventsState } from './events.reducer';
export { PreplanitemState } from './prePlanItems.reducer';
