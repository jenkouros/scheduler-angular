import * as fromFeature from '../reducers';
import * as fromPlans from '../reducers/simulation.reducers';
import { createSelector } from '@ngrx/store';

// plans state
export const getSimulatonState = createSelector(
  fromFeature.getSchedulerPlansState,
  (state: fromFeature.SchedulerPlansState) => state.simulation
);

export const getSimulationsList = createSelector(
  getSimulatonState,
  fromPlans.getSimulations
);

export const getSimulationPopupVisibility = createSelector(
  getSimulatonState,
  fromPlans.getPopupVisibility
);

export const getSimulationLoaded = createSelector(
  getSimulatonState,
  fromPlans.getSimulationLoaded
);
