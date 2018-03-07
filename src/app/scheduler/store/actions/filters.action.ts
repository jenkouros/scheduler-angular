import { Action } from "@ngrx/store";
import { Filter } from "../../models/filter.model";

export const LOAD_FILTERS = "[Filters] Load filters";
export const LOAD_FILTERS_FAIL = "[Filters] Load filters fail";
export const LOAD_FILTERS_SUCCESS = "[Filters] Load filters success";

export class LoadFilters implements Action {
    readonly type = LOAD_FILTERS;
}

export class LoadFiltersFail implements Action {
    readonly type = LOAD_FILTERS_FAIL;
}

export class LoadFiltersSuccess implements Action {
    readonly type = LOAD_FILTERS_SUCCESS;
    constructor(public payload: Filter[]) {}
}

export type filterActions 
    = LoadFilters
    | LoadFiltersFail
    | LoadFiltersSuccess;