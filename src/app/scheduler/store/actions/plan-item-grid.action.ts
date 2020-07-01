import { PlanItemGrid } from './../../models/plan-item-grid-model';
import { Action } from '@ngrx/store';
import { ItemAutoplanRequest } from '../../models/item-autoplan.model';
import { PlanGridOperation } from '../../models/plan-grid-operation.model';

export const LOAD_PLAN_ITEM_GRID = '[PlanItemGrid] Load Plan Item Grid';
export const LOAD_PLAN_ITEM_GRID_SUCCESS = '[PlanItemGrid] Load Plan Item Grid Success';
export const LOAD_PLAN_ITEM_GRID_FAIL = '[PlanItemGrid] Load Plan Item Grid Fail';

export const CLEAR_PLAN_ITEM_GRID_WITHID = '[PlanItemGrid] Clear Plan Item Grid with ID';
export const LOAD_PLAN_ITEM_GRID_WITHID = '[PlanItemGrid] Load Plan Item Grid with ID';
export const LOAD_PLAN_ITEM_GRID_WITHID_SUCCESS = '[PlanItemGrid] Load Plan Item Grid with ID success';
export const LOAD_PLAN_ITEM_GRID_WITHID_FAIL = '[PlanItemGrid] Load Plan Item Grid with ID fail';


export const AUTOPLAN_ITEM = '[PlanItemGrid] Auto plan item';
export const AUTOPLAN_ITEM_FAIL = '[PlanItemGrid] Auto plan item fail';
export const UPDATE_ITEM_GRID_SUCCESS = '[PlanItemGrid] Plan Item Grid Update success';
export const PLAN_ITEM_GRID_OPEN = '[PlanItemGrid] Open Item';
export const PLAN_ITEM_GRID_UPDATE = '[PlanItemGrid] Plan Item Grid Update';
export const PLAN_ITEM_GRID_SET_LIMIT_DATE = '[PlanItemGrid] Set load item limit date';

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
  constructor(public payload: PlanGridOperation) {}
}

export class SetItemLimitDate implements Action {
  readonly type = PLAN_ITEM_GRID_SET_LIMIT_DATE;
  constructor(public payload: Date) {}
}

export class ClearPlanItemGridWithId implements Action {
  readonly type = CLEAR_PLAN_ITEM_GRID_WITHID;
}

export class LoadPlanItemGridWithId implements Action {
  readonly type = LOAD_PLAN_ITEM_GRID_WITHID;
  constructor(public payload: number) {}
}

export class LoadPlanItemGridWithIdSuccess implements Action {
  readonly type = LOAD_PLAN_ITEM_GRID_WITHID_SUCCESS;
  constructor(public payload: PlanItemGrid) {}
}

export class LoadPlanItemGridWithIdFail implements Action {
  readonly type = LOAD_PLAN_ITEM_GRID_WITHID_FAIL;
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
  | SetItemLimitDate
  | LoadPlanItemGridWithId
  | LoadPlanItemGridWithIdSuccess
  | LoadPlanItemGridWithIdFail
  | ClearPlanItemGridWithId
  ;
