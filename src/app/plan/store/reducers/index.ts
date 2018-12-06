import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromPlans from '../reducers/plans.reducers';

export function getInitialState() {
  return {
    items: fromPlans.initialState
  } as SchedulerPlansState;
}

export interface SchedulerPlansState {
  items: fromPlans.PlansState;
}

export const reducers: ActionReducerMap<SchedulerPlansState> = {
  items: fromPlans.reducer
};

export const getSchedulerPlansState = createFeatureSelector<SchedulerPlansState>('plan');
