import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getPlanContainerGridState = createSelector(
  fromFeature.getSchedulerState,
  (state: fromFeature.SchedulerState) => state.planContainerGrid
);

export const getPlanContainerGrid = createSelector(
  getPlanContainerGridState,
  state => {
    const search = state.filter.search.toLowerCase();
    return state.planContainerGrids.filter(i =>
      state.filter.statuses.includes(i.operation.idPlanItemStatus) &&
      (search === '' ||
       i.item.articleCode.toLowerCase().includes(search) ||
       i.item.articleName.toLowerCase().includes(search) ||
       i.item.itemCode.toLowerCase().includes(search)));
  }
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

export const planDate = createSelector(
  getPlanContainerGridState,
  state => state.planDate
);

export const filter = createSelector (
  getPlanContainerGridState,
  state => state.filter
);

export const selectShowNotPlannable = createSelector (
  filter,
  state => state.showNotPlannable
);
