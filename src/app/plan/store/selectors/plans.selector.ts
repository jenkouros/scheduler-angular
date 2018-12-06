import * as fromFeature from '../reducers';
import * as fromPlans from '../reducers/plans.reducers';
import { createSelector } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';

// plans state
export const getPlansState = createSelector(
  fromFeature.getSchedulerPlansState,
  (state: fromFeature.SchedulerPlansState) => state.items
);

export const getPlansEntities = createSelector(
  getPlansState,
  fromPlans.getPlansEntities
);

export const getPlans = createSelector(
  getPlansEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getSelectedPlanId = createSelector(
  getPlansState,
  fromPlans.getPlansSelectedId
);

export const getDeletePlanPopupVisibility = createSelector(
  getPlansState,
  fromPlans.getDeletePlanPopupVisibility
);
