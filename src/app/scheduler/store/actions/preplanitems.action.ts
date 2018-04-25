import { Action } from '@ngrx/store';
import { PreplanItemRequest, PreplanItem } from '../../models/preplanitem.dto';

export const CREATE_PREPLANITEMS = '[PrePlanItem] CREATE PreplanItems';
export const LOAD_PREPLANITEMS = '[PrePlanItem] GET PreplanItems';
export const LOAD_PREPLANITEMS_SUCCESS = '[PrePlanItem] GET PreplanItems success';
export const LOAD_PREPLANITEMS_FAIL = '[PrePlanItem] GET PreplanItems fail';

export class CreatePreplanItems implements Action {
    readonly type = CREATE_PREPLANITEMS;
    constructor(public payload: PreplanItemRequest) {}
}

export class LoadPreplanItems implements Action {
    readonly type = LOAD_PREPLANITEMS;
}

export class LoadPreplanItemsSuccess implements Action {
    readonly type = LOAD_PREPLANITEMS_SUCCESS;
    constructor(public payload: PreplanItem[]) {}
}
export class LoadPreplanItemsFail implements Action {
    readonly type = LOAD_PREPLANITEMS_FAIL;
}

export type PreplanitemAction =
    | CreatePreplanItems
    | LoadPreplanItems
    | LoadPreplanItemsFail
    | LoadPreplanItemsSuccess
;
