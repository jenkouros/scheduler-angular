import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getPlanContainerGridState = createSelector(
  fromFeature.getSchedulerState,
  (state: fromFeature.SchedulerState) => state.planContainerGrid
);

export const getPlanContainerGrid = createSelector(
  getPlanContainerGridState,
  state => state.planContainerGrids
);

// export const selectedPlanItemGrid = createSelector(
//   getPlanContainerGridState,
//   state => state.openedPlanItemGrids
// );

export const limitContainerGridLoadDate = createSelector(
  getPlanContainerGridState,
  state => state.containerGridLimitDate
);

export const loader = createSelector(
  getPlanContainerGridState,
  state => state.loading
);

export const planHoursSwitch = createSelector(
  getPlanContainerGridState,
  state => state.planHoursSwitch
);

export const showArchiveSwitch = createSelector(
  getPlanContainerGridState,
  state => state.showArchiveSwitch
);

export const expandAllSwitch = createSelector(
  getPlanContainerGridState,
  state => state.expandAllSwitch
);

export const getUpdateTimeDialogData = createSelector(
  getPlanContainerGridState,
  state => state.updateTimeDialogData
);

export const inProcessWoSwitch = createSelector(
  getPlanContainerGridState,
  state => state.inProgressWoSwitch
);

export const currentWoSwitch = createSelector(
  getPlanContainerGridState,
  state => state.currentWoSwitch
);
