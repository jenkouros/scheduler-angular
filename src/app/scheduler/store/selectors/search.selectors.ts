import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getSearchState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.search
);

export const selectSearchItemStoreConfiguration = createSelector(
    getSearchState,
    state => state.searchItemsStoreConfiguration
);
export const selectSearchPlanItemStoreConfiguration = createSelector(
    getSearchState,
    state => state.searchPlanItemsStoreConfiguration
);
