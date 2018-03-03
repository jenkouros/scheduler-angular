import { createSelector } from "@ngrx/store";
import * as fromFeature from "../reducers";

export const getWorkorderState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.workorders
);