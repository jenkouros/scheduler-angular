import { Action } from "@ngrx/store";
import { Container } from "../../models/container.model";

export const LOAD_CONTAINERS = "[Planner] Load containers";
export const LOAD_CONTAINERS_FAIL = "[Planner] Load containers Fail";
export const LOAD_CONTAINERS_SUCCESS = "[Planner] Load containers Success";
export const SELECT_CONTAINERS = "[Planner] Select containers";
export const DESELECT_CONTAINERS = "[Planner] Deselect containers";

export const LOAD_PLANNINGITEMS = "[Planner] Load planning items";
export const LOAD_PLANNINGITEMS_FAIL = "[Planner] Load planning items fail";
export const LOAD_PLANNINGITEMS_SUCCESS = "[Planner] Load planning items success";
export const ADD_PLANNINGITEMS = "[Planner] Add planning items";
export const REMOVE_PLANNINGITEM = "[Planner] Remove planning item";
export const PLAN_PLANNINGITEM = "[Planner] Plan planning item";

export const LOAD_PLANNEDITEMS = "[Planner] Load planned items";
export const LOAD_PLANNEDITEMS_SUCCESS = "[Planner] Load planned items success";
export const LOAD_PLANNEDITEMS_FAIL = "[Planner] Load planned items fail";

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

export type PlannerAction =
    | LoadContainers
    | LoadContainersFail
    | LoadContainersSuccess
    | SelectContainers
    | DeselectContainers;