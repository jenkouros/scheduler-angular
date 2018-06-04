import * as fromItems from './items.reducer';
import * as fromFilters from './filters.reducer';
import * as fromContainers from './containers.reducer';
import * as fromEvents from './events.reducer';
import * as fromPreplanitems from './prePlanItems.reducer';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SchedulerState {
    filters: fromFilters.FilterState;
    items: fromItems.ItemState;
    containers: fromContainers.ContainerState;
    events: fromEvents.EventsState;
    preplanitems: fromPreplanitems.PreplanitemState;
}

export function getInitialState() {
    return {
        filters: fromFilters.initialState,
        items: fromItems.initialState,
        containers: fromContainers.initialState,
        events: fromEvents.initialState,
        preplanitems: fromPreplanitems.initState
    } as SchedulerState;
}

export const reducers: ActionReducerMap<SchedulerState> = {
    filters: fromFilters.filtersReducer,
    items: fromItems.itemsReducer,
    containers: fromContainers.containerReducer,
    events: fromEvents.eventsReducer,
    preplanitems: fromPreplanitems.prePlanItems
};

export const getSchedulerState = createFeatureSelector<SchedulerState>('scheduler');
export { ItemState, ItemUIState } from './items.reducer';
export { FilterState } from './filters.reducer';
export { ContainerState } from './containers.reducer';
export { EventsState } from './events.reducer';
export { PreplanitemState } from './prePlanItems.reducer';
