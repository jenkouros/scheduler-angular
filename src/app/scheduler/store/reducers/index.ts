import * as fromItems from './items.reducer';
import * as fromFilters from './filters.reducer';
import * as fromContainers from './containers.reducer';
import * as fromEvents from './events.reducer';
import * as fromPreplanitems from './prePlanItems.reducer';
import * as fromSearch from './search.reducer';
import * as fromGroups from './groups.reducer';
import * as fromPlanItemGrid from './plan-item-grid.reducer';
import * as fromPlanContainerGrid from './plan-container-grid.reducer';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SchedulerState {
  filters: fromFilters.FilterState;
  items: fromItems.ItemState;
  containers: fromContainers.ContainerState;
  events: fromEvents.EventsState;
  preplanitems: fromPreplanitems.PreplanitemState;
  search: fromSearch.SearchState;
  groups: fromGroups.GroupState;
  planItemGrid: fromPlanItemGrid.PlanItemGridState;
  planContainerGrid: fromPlanContainerGrid.PlanContainerGridState;
}

export function getInitialState() {
  return {
    filters: fromFilters.initialState,
    items: fromItems.initialState,
    containers: fromContainers.initialState,
    events: fromEvents.initialState,
    preplanitems: fromPreplanitems.initState,
    search: fromSearch.initialState,
    groups: fromGroups.initialState,
    planItemGrid: fromPlanItemGrid.initialState,
    planContainerGrid: fromPlanContainerGrid.initialState
  } as SchedulerState;
}

export const reducers: ActionReducerMap<SchedulerState> = {
  filters: fromFilters.filtersReducer,
  items: fromItems.itemsReducer,
  containers: fromContainers.containerReducer,
  events: fromEvents.eventsReducer,
  preplanitems: fromPreplanitems.prePlanItems,
  search: fromSearch.search,
  groups: fromGroups.groupsReducer,
  planItemGrid: fromPlanItemGrid.planItemGridReducer,
  planContainerGrid: fromPlanContainerGrid.planItemGridReducer
};

export const getSchedulerState = createFeatureSelector<SchedulerState>('scheduler');
export { ItemState, ItemUIState } from './items.reducer';
export { FilterState } from './filters.reducer';
export * from './containers.reducer';
export { EventsState } from './events.reducer';
export { PreplanitemState } from './prePlanItems.reducer';
export { SearchState } from './search.reducer';
export { GroupState } from './groups.reducer';
export { PlanItemGridState } from './plan-item-grid.reducer';
export { PlanContainerGridState } from './plan-container-grid.reducer';
