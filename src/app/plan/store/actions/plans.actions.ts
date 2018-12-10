import { Action } from '@ngrx/store';
import { Plan } from '../../models/plan.model';

export const LOAD_PLANS = '[Plan] Load Plans';
export const LOAD_PLANS_SUCCESS = '[Plan] Load Plans Success';
export const LOAD_PLANS_FAIL = '[Plan] Load Plans Fail';
export const SELECT_PLAN = '[Plan] Selected Plan';

export class LoadPlans implements Action {
  readonly type = LOAD_PLANS;
}

export class LoadPlansSuccess implements Action {
  readonly type = LOAD_PLANS_SUCCESS;
  constructor(public payload: Plan[]) {}
}

export class LoadPlansFail implements Action {
  readonly type = LOAD_PLANS_FAIL;
  constructor(public payload: any) {}
}

export class SelectPlan implements Action {
  readonly type = SELECT_PLAN;
  constructor(public payload: number) {}
}

// popup edit plan
export const PLAN_POPUP_VISIBLE = '[Plan] Show plan edit popup';

export class PlanPopupVisible implements Action {
  readonly type = PLAN_POPUP_VISIBLE;
  constructor(public payload: boolean) {}
}

// popup delete plan
export const PLAN_DELETE_POPUP_VISIBLE = '[Plan] Show plan delete popup';

export class PlanDeletePopupVisible implements Action {
  readonly type = PLAN_DELETE_POPUP_VISIBLE;
  constructor(public payload: boolean) {}
}

// create plan
export const CREATE_PLAN = '[Plan] Create Plan';
export const CREATE_PLAN_SUCCESS = '[Plan] Create Plan Success';
export const CREATE_PLAN_FAIL = '[Plan] Create Plan Fail';

export class CreatePlan implements Action {
  readonly type = CREATE_PLAN;
  constructor(public payload: Plan) {}
}

export class CreatePlanSuccess implements Action {
  readonly type = CREATE_PLAN_SUCCESS;
  constructor(public payload: Plan) {}
}
export class CreatePlanFail implements Action {
  readonly type = CREATE_PLAN_FAIL;
  constructor(public payload: any) {}
}

// update plan

/*
export const UPDATE_PLAN = '[Plan] Update Plan';
export const UPDATE_PLAN_SUCCESS = '[Plan] Update Plan Success';
export const UPDATE_PLAN_FAIL = '[Plan] Update Plan Fail';

export class UpdatePlan implements Action {
  readonly type = UPDATE_PLAN;
  constructor(public payload: Plan) {}
}

export class UpdatePlanSuccess implements Action {
  readonly type = UPDATE_PLAN_SUCCESS;
  constructor(public payload: Plan) {}
}
export class UpdatePlanFail implements Action {
  readonly type = UPDATE_PLAN_FAIL;
  constructor(public payload: any) {}
}
*/
// delete plan
export const REMOVE_PLAN = '[Plan] Remove Plan';
export const REMOVE_PLAN_SUCCESS = '[Plan] Remove Plan Success';
export const REMOVE_PLAN_FAIL = '[Plan] Remove Plan Fail';

export class RemovePlan implements Action {
  readonly type = REMOVE_PLAN;
  constructor(public payload: Plan) {}
}

export class RemovePlanSuccess implements Action {
  readonly type = REMOVE_PLAN_SUCCESS;
  constructor(public payload: Plan) {}
}
export class RemovePlanFail implements Action {
  readonly type = REMOVE_PLAN_FAIL;
  constructor(public payload: any) {}
}

// calendars types
export type PlansActions =
  | LoadPlans
  | LoadPlansFail
  | LoadPlansSuccess
  | SelectPlan
  | PlanDeletePopupVisible
  | RemovePlan
  | RemovePlanSuccess
  | RemovePlanFail
  | PlanPopupVisible
  | CreatePlan
  | CreatePlanSuccess
  | CreatePlanFail;
