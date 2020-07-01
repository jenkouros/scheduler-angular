import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getPlanItemGridState = createSelector(
  fromFeature.getSchedulerState,
  (state: fromFeature.SchedulerState) => state.planItemGrid
);

export const getPlanItemGrid = createSelector(
  getPlanItemGridState,
  state => state.planItemGrids
);

export const selectedPlanItemGrid = createSelector(
  getPlanItemGridState,
  state => state.openedPlanItemGrids
);

export const limitItemLoadDate = createSelector(
  getPlanItemGridState,
  state => state.itemLimitDate
);

export const loader = createSelector(
  getPlanItemGridState,
  state => state.loading
);

export const getPlanGridItemDialogData = createSelector(
  getPlanItemGridState,
  state => state.planItemGridPopup.planItemGrid
);
