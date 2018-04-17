import { Action } from '@ngrx/store';
import { PlanItem } from '../../models/planitem.model';
import { PaginationResponse } from '../../../shared/shared.model';

export const LOAD_PLANITEMS = '[PlanItem] Load workorders';
export const LOAD_PLANITEMS_FAIL = '[PlanItem] Load workorders Fail';
export const LOAD_PLANITEMS_SUCCESS = '[PlanItem] Load workorders Success';

export class LoadPlanItems implements Action {
    readonly type = LOAD_PLANITEMS;
    constructor(public payload: { page: number, pageSize: number }) {}
}

export class LoadPlanItemsFail implements Action {
    readonly type = LOAD_PLANITEMS_FAIL;
    constructor(public payload: any) {}
}

export class LoadPlanItemsSuccess implements Action {
    readonly type = LOAD_PLANITEMS_SUCCESS;
    constructor(public payload: PaginationResponse<PlanItem>) {}
}

export type PlanItemAction =
    | LoadPlanItems
    | LoadPlanItemsFail
    | LoadPlanItemsSuccess;
