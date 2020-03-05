import { Action } from '@ngrx/store';
import { Simulation } from '../../models/change.model';

// simulation changes
export const LOAD_PLANS_SIMULATION = '[Plan] Load Plans Simulation';
export const LOAD_PLANS_SIMULATION_SUCCESS = '[Plan] Load PlansSimulation  Success';
export const LOAD_PLANS_SIMULATION_FAIL = '[Plan] Load Plans Simulation Fail';

export class LoadPlansSimulation implements Action {
  readonly type = LOAD_PLANS_SIMULATION;
  constructor(public payload: number) {}
}

export class LoadPlansSimulationSuccess implements Action {
  readonly type = LOAD_PLANS_SIMULATION_SUCCESS;
  constructor(public payload: Simulation[]) {}
}

export class LoadPlansSimulationFail implements Action {
  readonly type = LOAD_PLANS_SIMULATION_FAIL;
  constructor(public payload: any) {}
}

// popup edit siumaltion
export const PLAN_SIMULATION_POPUP_VISIBLE = '[Plan] Show plan simulation popup';

export class PlanSimulationPopupVisible implements Action {
  readonly type = PLAN_SIMULATION_POPUP_VISIBLE;
  constructor(public payload: boolean) {}
}

// simulation types
export type SumulationsActions =
  | LoadPlansSimulation
  | LoadPlansSimulationSuccess
  | LoadPlansSimulationFail
  | PlanSimulationPopupVisible;
