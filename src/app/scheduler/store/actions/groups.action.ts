import { Action } from '@ngrx/store';
import { Filter } from '../../models/filter.dto';
import { GroupFilter, GroupFilterViewModel } from '../../models/groupfilter.dto';
import { Container } from '../../models/container.dto';

export const LOAD_GROUPS = '[Groups] Load groups';
export const LOAD_GROUPS_SUCCESS = '[Groups] Load groups success';
export const LOAD_GROUP_CODELIST_FILTER = '[Groups] Load group codelist filter';
export const LOAD_GROUP_CODELIST_FILTER_SUCCESS = '[Groups] Load group codelist filter success';
export const LOAD_GROUP_CODELIST_CONTAINER = '[Groups] Load group codelist container';
export const LOAD_GROUP_CODELIST_CONTAINER_SUCCESS = '[Groups] Load group codelist container success';
export const SET_GROUP_EDIT = '[Groups] Set edit group';
export const UPDATE_GROUP = '[Groups] Update group';
export const CHANGE_EDIT_GROUP_FILTER = '[Groups] Change edit group filter';
export const CHANGE_EDIT_GROUP_CONTAINER_FILTER = '[Groups] Change edit container filter';

export class LoadGroups implements Action {
    readonly type = LOAD_GROUPS;
}

export class LoadGroupsSuccess implements Action {
    readonly type = LOAD_GROUPS_SUCCESS;
    constructor(public payload: GroupFilter[]) {}
}

export class UpdateGroup implements Action {
    readonly type = UPDATE_GROUP;
    constructor(public payload: GroupFilterViewModel) {}
}

export class LoadGroupCodelistFilter implements Action {
    readonly type = LOAD_GROUP_CODELIST_FILTER;
}
export class LoadGroupCodelistFilterSuccess implements Action {
    readonly type = LOAD_GROUP_CODELIST_FILTER_SUCCESS;
    constructor(public payload: Filter[]) {}
}
export class LoadGroupCodeListContainer implements Action {
    readonly type = LOAD_GROUP_CODELIST_CONTAINER;
}
export class LoadGroupCodeListContainerSuccess implements Action {
    readonly type = LOAD_GROUP_CODELIST_CONTAINER_SUCCESS;
    constructor(public payload: Container[]) {}
}

export class ChangeEditGroupFilter {
    readonly type = CHANGE_EDIT_GROUP_FILTER;
    constructor(public payload: { idFilter: number, idValues: number[] }) {}
}

export class ChangeEditGroupContainerFilter {
    readonly type = CHANGE_EDIT_GROUP_CONTAINER_FILTER;
    constructor(public payload: number[]) {}
}

export class SetEditGroup {
    readonly type = SET_GROUP_EDIT;
    constructor(public payload: GroupFilterViewModel | null) {}
}

export type GroupActions =
    LoadGroups |
    LoadGroupsSuccess |
    LoadGroupCodelistFilter |
    LoadGroupCodelistFilterSuccess |
    LoadGroupCodeListContainer |
    SetEditGroup |
    LoadGroupCodeListContainerSuccess |
    UpdateGroup |
    ChangeEditGroupFilter |
    ChangeEditGroupContainerFilter
    ;
