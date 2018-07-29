import { Action } from '@ngrx/store';
import CustomStore from 'devextreme/data/custom_store';

export const GET_SEARCHITEMS_STORE = '[Search] GET search items store';
export const GET_SEARCHITEMS_STORE_SUCCESS = '[Search] GET search items store success';
export const SEARCH_SEARCHITEMS_STORE = '[Search] SEARCH searchitems store';

export const GET_SEARCHPLANITEMS_STORE = '[Search] GET search plan items store';
export const GET_SEARCHPLANITEMS_STORE_SUCCESS = '[Search] GET search plan items store success';
export const SEARCH_SEARCHPLANITEMS_STORE = '[Search] SEARCH searchplanitems store';


export class GetSearchItemsStore implements Action {
    readonly type = GET_SEARCHITEMS_STORE;
    constructor(public payload: string) {}
}
export class GetSearchItemsStoreSuccess implements Action {
    readonly type = GET_SEARCHITEMS_STORE_SUCCESS;
    constructor(public payload: CustomStore | null) {}
}

export class SearchItemsStore implements Action {
    readonly type = SEARCH_SEARCHITEMS_STORE;
    constructor(public payload: string) {}
}

export class GetSearchPlanItemsStore implements Action {
    readonly type = GET_SEARCHPLANITEMS_STORE;
    constructor(public payload: string) {}
}
export class GetSearchPlanItemsStoreSuccess implements Action {
    readonly type = GET_SEARCHPLANITEMS_STORE_SUCCESS;
    constructor(public payload: CustomStore | null) {}
}

export class SearchPlanItemsStore implements Action {
    readonly type = SEARCH_SEARCHPLANITEMS_STORE;
    constructor(public payload: string) {}
}

export type SearchActions =
 GetSearchItemsStore |
 GetSearchItemsStoreSuccess |
 SearchItemsStore |
 GetSearchPlanItemsStore |
 GetSearchPlanItemsStoreSuccess |
 SearchPlanItemsStore
 ;
