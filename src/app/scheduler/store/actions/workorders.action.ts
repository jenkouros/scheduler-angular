import { Action } from '@ngrx/store'
import { Workorder } from '../../models/wororder.model';

export const LOAD_WORKORDERS = "[Workorders] Load workorders";
export const LOAD_WORKORDERS_FAIL = "[Workorders] Load workorders Fail";
export const LOAD_WORKORDERS_SUCCESS = "[Workorders] Load workorders Success";

export class LoadWorkorders implements Action {
    readonly type = LOAD_WORKORDERS;
}

export class LoadWorkordersFail implements Action {
    readonly type = LOAD_WORKORDERS_FAIL;
    constructor(public payload: any) {}
}

export class LoadWorkordersSuccess implements Action {
    readonly type = LOAD_WORKORDERS_SUCCESS;
    constructor(public payload: Workorder[]) {}
}

export type WorkordersAction = 
    | LoadWorkorders
    | LoadWorkordersFail
    | LoadWorkordersSuccess;