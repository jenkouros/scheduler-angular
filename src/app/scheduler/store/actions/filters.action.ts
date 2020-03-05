import { Action } from '@ngrx/store';
import { Filter } from '../../models/filter.dto';
import { Container } from '../../models/container.dto';

export const LOAD_FILTERS = '[Filters] Load filters';
export const LOAD_FILTERS_FAIL = '[Filters] Load filters fail';
export const LOAD_FILTERS_SUCCESS = '[Filters] Load filters success';
// export const SELECT_VALUE_ON_FILTER = '[Filters] Select value on filter';
// export const REMOVE_VALUE_ON_FILTER = '[Filters] Remove value on filter';

export const CHANGE_FILTER = '[Filter] Change filter';
export const CHANGE_CONTAINERS_FILTER = '[Filter] Change containers filter';

export const CHANGE_ONE_FILTER = '[Filter] Change one filter';

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

export class ChangeFilter implements Action {
    readonly type = CHANGE_FILTER;
    constructor(public payload: { [id: number]: number[] }) {}
}

export class ChangeContainersFilter implements Action {
    readonly type = CHANGE_CONTAINERS_FILTER;
    constructor(public payload: Container[]) {}
}

export class ChangeOneFilter implements Action {
    readonly type = CHANGE_ONE_FILTER;
    constructor(public payload: { id: number, values: number[] }) {}
}

// export class SelectValueOnFilter implements Action {
//     readonly type = SELECT_VALUE_ON_FILTER;
//     constructor(public payload: { id: number, value: number }) {}
// }

// export class RemoveValueOnFilter implements Action {
//     readonly type = REMOVE_VALUE_ON_FILTER;
//     constructor(public payload: { id: number, value: number }) {}
// }

export type filterActions
    = LoadFilters
    | LoadFiltersFail
    | LoadFiltersSuccess
    | ChangeFilter
    | ChangeContainersFilter
    | ChangeOneFilter;

