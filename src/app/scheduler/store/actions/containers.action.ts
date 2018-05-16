import { Action } from '@ngrx/store';
import { Container } from '../../models/container.dto';

export const LOAD_CONTAINERS = '[Containers] Load containers';
export const LOAD_CONTAINERS_FAIL = '[Containers] Load containers Fail';
export const LOAD_CONTAINERS_SUCCESS = '[Containers] Load containers Success';
export const SELECT_CONTAINERS = '[Containers] Select containers';
export const DESELECT_CONTAINERS = '[Containers] Deselect containers';
export const RESELECT_CONTAINERS = '[Containers] Reselect containers';

export const LOAD_PLANNINGITEMS = '[Containers] Load planning items';
export const LOAD_PLANNINGITEMS_FAIL = '[Containers] Load planning items fail';
export const LOAD_PLANNINGITEMS_SUCCESS = '[Containers] Load planning items success';
export const ADD_PLANNINGITEMS = '[Containers] Add planning items';
export const REMOVE_PLANNINGITEM = '[Containers] Remove planning item';
export const PLAN_PLANNINGITEM = '[Containers] Plan planning item';

export const REMOVE_CONTAINERS_BLANKSPACE = '[Containers] Remove containers blank space';

/* CONTAINERS */
export class LoadContainers implements Action {
    readonly type = LOAD_CONTAINERS;
}
export class LoadContainersFail implements Action {
    readonly type = LOAD_CONTAINERS_FAIL;
}
export class LoadContainersSuccess implements Action {
    readonly type = LOAD_CONTAINERS_SUCCESS;
    constructor(public payload: Container[]) {}
}
export class SelectContainers implements Action {
    readonly type = SELECT_CONTAINERS;
    constructor(public payload: number[]) {}
}
export class DeselectContainers implements Action {
    readonly type = DESELECT_CONTAINERS;
    constructor(public payload: number[]) {}
}

export class ReselectContainers implements Action {
    readonly type = RESELECT_CONTAINERS;
    constructor(public payload: number[]) {}
}

export class RemoveContainersBlankSpace implements Action {
    readonly type = REMOVE_CONTAINERS_BLANKSPACE;
    constructor(public payload: { containerIds: number[] }) {}
}



export type ContainersAction
    = LoadContainers
    | LoadContainersFail
    | LoadContainersSuccess
    | SelectContainers
    | DeselectContainers
    | ReselectContainers;

