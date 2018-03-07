import * as fromFeature from "../reducers";
import { createSelector } from "@ngrx/store";

export const getFiltersState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.filters
);