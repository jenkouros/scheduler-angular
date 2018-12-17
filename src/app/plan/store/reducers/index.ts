import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromPlans from '../reducers/plans.reducers';
import * as fromSimulation from '../reducers/simulation.reducers';

export function getInitialState() {
  return {
    items: fromPlans.initialState,
    simulation: fromSimulation.initialState
  } as SchedulerPlansState;
}

export interface SchedulerPlansState {
  items: fromPlans.PlansState;
  simulation: fromSimulation.SimulationState;
}

export const reducers: ActionReducerMap<SchedulerPlansState> = {
  items: fromPlans.reducer,
  simulation: fromSimulation.reducer
};

export const getSchedulerPlansState = createFeatureSelector<SchedulerPlansState>('plan');
