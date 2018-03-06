import { createSelector } from "@ngrx/store";
import * as fromFeature from "../reducers";

export const getPlanItemsState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.planitems
);