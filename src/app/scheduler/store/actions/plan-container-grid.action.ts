import { Action } from '@ngrx/store';
import { CalendarFilter } from '../../models/calendar-filter.model';
import { PlanContainerGrid } from '../../models/plan-container-grid.model';
import { PlanGridOperation, PlanGridOperationChange } from '../../models/plan-grid-operation.model';
import { PlannedEventSimple } from './../../models/event.model';

export const LOAD_PLAN_CONTAINER_GRID = '[PlanContainerGrid] Load Plan Container Grid';
export const LOAD_PLAN_CONTAINER_GRID_SUCCESS = '[PlanContainerGrid] Load Plan Container Grid Success';
export const LOAD_PLAN_CONTAINER_GRID_FAIL = '[PlanContainerGrid] Load Plan Container Grid Fail';

// export const AUTOPLAN_ITEM = '[PlanContainerGrid] Auto plan Container Grid';
export const UPDATE_CONTAINER_GRID_FAIL = '[PlanContainerGrid] Plan Container Grid Update fail';
export const UPDATE_CONTAINER_GRID_SUCCESS = '[PlanContainerGrid] Plan Container Grid Update success';
// export const PLAN_ITEM_GRID_OPEN = '[PlanContainerGrid] Open Container Item';
export const PLAN_CONTAINER_GRID_UPDATE = '[PlanContainerGrid] Plan Container Grid Update';
export const PLAN_CONTAINER_DIALOG_GRID_UPDATE = '[PlanContainerGrid] Plan Container Dialog Grid Update';
export const PLAN_CONTAINER_GRID_SET_LIMIT_DATE = '[PlanContainerGrid] Set load Plan Container grid limit date';

export const PLAN_CONTAINER_GRID_PLANHOURS_SWITCH = '[PlanContainerGrid] Set plan container grid planhours switch';
export const PLAN_CONTAINER_GRID_SHOWARCHIVE_SWITCH = '[PlanContainerGrid] Set plan container grid show archive switch';
export const PLAN_CONTAINER_GRID_EXPANDALL_SWITCH = '[PlanContainerGrid] Set plan container grid expand all switch';
export const PLAN_CONTAINER_GRID_INPROGRESSWO_SWITCH = '[PlanContainerGrid] Set plan container grid in progress wo switch';
export const PLAN_CONTAINER_GRID_CURRENT_SWITCH = '[PlanContainerGrid] Set plan container grid current wo switch';

export const PLAN_CONTAINER_GRID_SHOW_TIME_UPDATE_DIALOG = '[PlanContainerGrid] Show Time Update Dialog';
export const PLAN_CONTAINER_GRID_HIDE_TIME_UPDATE_DIALOG = '[PlanContainerGrid] Hide Time Update Dialog';

export const PLAN_CONTAINER_GRID_FILTER = '[PlanContainerGrid] Set Filter';
export const PLAN_CONTAINER_GRID_DELETE_PLANITEM = '[PlanContainerGrid] Delete Plan Item';

export const PLAN_CONTAINER_PLANITEM_DELETE_SUCCESS = '[PlanContainerGrid] Delete PlanItem Success';
export const PLAN_CONTAINER_PLANITEM_DELETE_FAIL = '[PlanContainerGrid] Delete PlanItem Fail';

export class SetPlanContainerGridFilter implements Action {
  readonly type = PLAN_CONTAINER_GRID_FILTER;
  constructor(public payload: {search: string, statuses: number[], showNotPlannable: boolean}) {}
}

export class DeletePlanitem implements Action {
  readonly type = PLAN_CONTAINER_GRID_DELETE_PLANITEM;
  constructor(public payload: {planItemId: number}) {}
}

export class LoadPlanContainerGrid implements Action {
  readonly type = LOAD_PLAN_CONTAINER_GRID;
  constructor(public payload: CalendarFilter | undefined) {}
}

export class LoadPlanContainerGridSuccess implements Action {
  readonly type = LOAD_PLAN_CONTAINER_GRID_SUCCESS;
  constructor(public payload: PlanContainerGrid[]) {}
}

export class LoadPlanContainerGridFail implements Action {
  readonly type = LOAD_PLAN_CONTAINER_GRID_FAIL;
}

export const PLAN_CONTAINER_GRID_CHANGE_SEQUENCE = '[PlanContainerGrid] Change plan item sequence';
export class ChangeSequence implements Action {
  readonly type = PLAN_CONTAINER_GRID_CHANGE_SEQUENCE;
  constructor(public payload: { isUp: boolean, idPlanItem: number }) {}
}

// export class AutoplanItem implements Action {
//   readonly type = AUTOPLAN_ITEM;
//   constructor(public payload: ItemAutoplanRequest) {}
// }


export class UpdateContainerGridSuccess implements Action {
  readonly type = UPDATE_CONTAINER_GRID_SUCCESS;
  constructor(public payload: {
    data: PlanContainerGrid[],
    allowAdd: boolean,
    order: boolean
  }) {}
}


export class UpdateContainerGridFail implements Action {
  readonly type = UPDATE_CONTAINER_GRID_FAIL;
}

// export class PlanItemGridOpen implements Action {
//   readonly type = PLAN_ITEM_GRID_OPEN;
//   constructor(public payload: PlanItemGrid) {}
// }

export class PlanContainerGridUpdate implements Action {
  readonly type = PLAN_CONTAINER_GRID_UPDATE;
  constructor(public payload: { operation: PlanGridOperation, allowAdd: boolean }) {}
}

export class PlanContainerDialogGridUpdate implements Action {
  readonly type = PLAN_CONTAINER_DIALOG_GRID_UPDATE;
  constructor(public payload: {operation: PlannedEventSimple, idPlanItem: number}) {}
}


export class SetPlanContainerGridLimitDate implements Action {
  readonly type = PLAN_CONTAINER_GRID_SET_LIMIT_DATE;
  constructor(public payload: Date) {}
}

export class SetPlanHoursSwitch implements Action {
  readonly type = PLAN_CONTAINER_GRID_PLANHOURS_SWITCH;
  constructor(public payload: boolean) {}
}

export class SetExpandAllSwitch implements Action {
  readonly type = PLAN_CONTAINER_GRID_EXPANDALL_SWITCH;
  constructor(public payload: boolean) {}
}

export class ShowUpdatePlanGridOperationDialog implements Action {
  readonly type = PLAN_CONTAINER_GRID_SHOW_TIME_UPDATE_DIALOG;
  constructor(public payload: PlanGridOperationChange) {}
}

export class HideUpdatePlanGridOperationDialog implements Action {
  readonly type = PLAN_CONTAINER_GRID_HIDE_TIME_UPDATE_DIALOG;
}
export class SetInProgressWoSwitch implements Action {
  readonly type = PLAN_CONTAINER_GRID_INPROGRESSWO_SWITCH;
  constructor(public payload: boolean) {}
}

export class SetCurrentWoSwitch implements Action {
  readonly type = PLAN_CONTAINER_GRID_CURRENT_SWITCH;
  constructor(public payload: boolean) {}
}

export class SetShowArchiveSwitch implements Action {
  readonly type = PLAN_CONTAINER_GRID_SHOWARCHIVE_SWITCH;
  constructor(public payload: boolean) {}
}

export class DeletePlanItemSuccess implements Action {
  readonly type = PLAN_CONTAINER_PLANITEM_DELETE_SUCCESS;
  constructor(public payload: {planItemId: number}) {}
}
export class DeletePlanItemFail implements Action {
  readonly type = PLAN_CONTAINER_PLANITEM_DELETE_FAIL;
}

export type PlanContainerGridAction =
  | LoadPlanContainerGrid
  | LoadPlanContainerGridFail
  | LoadPlanContainerGridSuccess
  // | AutoplanItem
  | UpdateContainerGridSuccess
  | UpdateContainerGridFail
  // | PlanItemGridOpen
  | PlanContainerGridUpdate
  | SetPlanContainerGridLimitDate
  | SetPlanHoursSwitch
  | SetExpandAllSwitch
  | PlanContainerDialogGridUpdate
  | ShowUpdatePlanGridOperationDialog
  | HideUpdatePlanGridOperationDialog
  | SetInProgressWoSwitch
  | SetCurrentWoSwitch
  | SetShowArchiveSwitch
  | SetPlanContainerGridFilter
  | DeletePlanItemFail
  | DeletePlanItemSuccess
  ;
