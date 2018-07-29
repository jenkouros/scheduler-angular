import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getSearchState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.search
);

export const selectSearchItemStore = createSelector(
    getSearchState,
    state => state.searchItemsStore
);
export const selectSearchPlanItemStore = createSelector(
    getSearchState,
    state => state.searchPlanItemsStore
);
