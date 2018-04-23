import { Action } from '@ngrx/store';
import { PlanItem, PlanItemHierarchy } from '../../models/planitem.model';
import { PaginationResponse } from '../../../shared/shared.model';
import CustomStore from 'devextreme/data/custom_store';

export const LOAD_PLANITEMS = '[PlanItem] Load workorders';
export const LOAD_PLANITEMS_FAIL = '[PlanItem] Load workorders Fail';
export const LOAD_PLANITEMS_SUCCESS = '[PlanItem] Load workorders Success';
export const REGISTER_PLANITEMS_STORE = '[PlanItem] Register planItems Store';

export const LOAD_PLANITEMHIERARCHY = '[PlanItem] Load selected plan item hierarcy';
export const LOAD_PLANITEMHIERARCHY_FAIL = '[PlanItem] Load selected plan item hierarcy fail';
export const LOAD_PLANITEMHIERARCHY_SUCCESS = '[PlanItem] Load selected plan item hierarcy success';


export class LoadPlanItems implements Action {
    readonly type = LOAD_PLANITEMS;
}

export class RegisterPlanItemStore implements Action {
    readonly type = REGISTER_PLANITEMS_STORE;
    constructor(public payload: CustomStore) {}
}

export class LoadPlanItemsFail implements Action {
    readonly type = LOAD_PLANITEMS_FAIL;
    constructor(public payload: any) {}
}

export class LoadPlanItemsSuccess implements Action {
    readonly type = LOAD_PLANITEMS_SUCCESS;
    constructor(public payload: PlanItem[]) {}
}

export class LoadPlanItemHierarchy implements Action {
    readonly type = LOAD_PLANITEMHIERARCHY;
    constructor(public payload: { planItemId: number}) {}
}

export class LoadPlanItemHierarchyFail implements Action {
    readonly type = LOAD_PLANITEMHIERARCHY_FAIL;
}

export class LoadPlanItemHierarchySuccess implements Action {
    readonly type = LOAD_PLANITEMHIERARCHY_SUCCESS;
    constructor(public payload: PlanItemHierarchy) {}
}

export type PlanItemAction =
    | LoadPlanItems
    | RegisterPlanItemStore
    | LoadPlanItemsFail
    | LoadPlanItemsSuccess
    | LoadPlanItemHierarchy
    | LoadPlanItemHierarchyFail
    | LoadPlanItemHierarchySuccess
;
