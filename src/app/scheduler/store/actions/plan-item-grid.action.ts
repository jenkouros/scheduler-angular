import { PlanItemGrid } from './../../models/plan-item-grid-model';
import { Action } from '@ngrx/store';
import { ItemAutoplanRequest } from '../../models/item-autoplan.model';
import { PlanItemGridOperation } from '../../models/plan-item-grid-operation.model';

export const LOAD_PLAN_ITEM_GRID = '[PlanItemGrid] Load Plan Item Grid';
export const LOAD_PLAN_ITEM_GRID_SUCCESS = '[PlanItemGrid] Load Plan Item Grid Success';
export const LOAD_PLAN_ITEM_GRID_FAIL = '[PlanItemGrid] Load Plan Item Grid Fail';
export const AUTOPLAN_ITEM = '[PlanItemGrid] Auto plan item';
export const AUTOPLAN_ITEM_FAIL = '[PlanItemGrid] Auto plan item fail';
export const UPDATE_ITEM_GRID_SUCCESS = '[PlanItemGrid] Auto plan item success';
export const PLAN_ITEM_GRID_OPEN = '[PlanItemGrid] Open Item';
export const PLAN_ITEM_GRID_UPDATE = '[PlanItemGrid] Plan Item Grid Update';

export class LoadPlanItemGrid implements Action {
  readonly type = LOAD_PLAN_ITEM_GRID;
}

export class LoadPlanItemGridSuccess implements Action {
  readonly type = LOAD_PLAN_ITEM_GRID_SUCCESS;
  constructor(public payload: PlanItemGrid[]) {}
}

export class LoadPlanItemGridFail implements Action {
  readonly type = LOAD_PLAN_ITEM_GRID_FAIL;
}

export class AutoplanItem implements Action {
  readonly type = AUTOPLAN_ITEM;
  constructor(public payload: ItemAutoplanRequest) {}
}


export class UpdateItemGridSuccess implements Action {
  readonly type = UPDATE_ITEM_GRID_SUCCESS;
  constructor(public payload: PlanItemGrid[]) {}
}


export class AutoplanItemFail implements Action {
  readonly type = AUTOPLAN_ITEM_FAIL;
}

export class PlanItemGridOpen implements Action {
  readonly type = PLAN_ITEM_GRID_OPEN;
  constructor(public payload: PlanItemGrid) {}
}

export class PlanItemGridUpdate implements Action {
  readonly type = PLAN_ITEM_GRID_UPDATE;
  constructor(public payload: PlanItemGridOperation) {}
}

export type PlanItemGridAction =
  | LoadPlanItemGrid
  | LoadPlanItemGridFail
  | LoadPlanItemGridSuccess
  | AutoplanItem
  | UpdateItemGridSuccess
  | AutoplanItemFail
  | PlanItemGridOpen
  | PlanItemGridUpdate
  ;
