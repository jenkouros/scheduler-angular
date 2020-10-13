import { CreateItemInput } from './../../components/item/item-create/item-create.model';
import { ItemAutoplanRequest } from './../../models/item-autoplan.model';
import { Action } from '@ngrx/store';
import { PaginationResponse } from '../../../shared/shared.model';
import { Item, ItemHierarchy } from '../../models/item.dto';
import { GridStoreConfiguration } from '../../models/shared.dto';

export const LOAD_ITEMS = '[Item] Load workorders';
export const LOAD_ITEMS_FAIL = '[Item] Load workorders Fail';
export const LOAD_ITEMS_SUCCESS = '[Item] Load workorders Success';
export const REGISTER_ITEMS_STORE = '[Item] Register Items Store';

export const LOAD_ITEMHIERARCHY = '[Item] Load selected plan item hierarcy';
export const LOAD_ITEMHIERARCHY_FAIL = '[Item] Load selected plan item hierarcy fail';
export const LOAD_ITEMHIERARCHY_SUCCESS = '[Item] Load selected plan item hierarcy success';

export const SHOW_ITEM_POPUP = '[Item] Show plan item popup';
export const HIDE_ITEM_POPUP = '[Item] Hide plan item popup';

export const SHOW_CREATE_ITEM_POPUP = '[Item] Show create plan item popup';
export const HIDE_CREATE_ITEM_POPUP = '[Item] Hide create plan item popup';
export const HIDE_ITEM = '[Item] Hide item';

export const CREATE_ITEM = '[Item] Create item';
export const CREATE_ITEM_SUCCESS = '[Item] Create item success';
export const CREATE_ITEM_FAIL = '[Item] Create item fail';


export class CreateItem implements Action {
  readonly type = CREATE_ITEM;
  constructor(public payload: CreateItemInput) {}
}

export class CreateItemSuccess implements Action {
  readonly type = CREATE_ITEM_SUCCESS;
  constructor(public payload: { itemId: number }) {}
}

export class CreateItemFail implements Action {
  readonly type = CREATE_ITEM_FAIL;
}

export class LoadItems implements Action {
    readonly type = LOAD_ITEMS;
}

export class HideItem implements Action {
    readonly type = HIDE_ITEM;
    constructor(public payload: number) {}
}

export class RegisterItemStore implements Action {
    readonly type = REGISTER_ITEMS_STORE;
    constructor(public payload: GridStoreConfiguration) {}
}

export class LoadItemsFail implements Action {
    readonly type = LOAD_ITEMS_FAIL;
    constructor(public payload: any) {}
}

export class LoadItemsSuccess implements Action {
    readonly type = LOAD_ITEMS_SUCCESS;
    constructor(public payload: Item[]) {}
}

export class LoadItemHierarchy implements Action {
    readonly type = LOAD_ITEMHIERARCHY;
    constructor(public payload: { item: Item, addToList: boolean}) {}
}

export class LoadItemHierarchyFail implements Action {
    readonly type = LOAD_ITEMHIERARCHY_FAIL;
}

export class LoadItemHierarchySuccess implements Action {
    readonly type = LOAD_ITEMHIERARCHY_SUCCESS;
    constructor(public payload: ItemHierarchy) {}
}

export class ShowItemPopup implements Action {
    readonly type = SHOW_ITEM_POPUP;
}

export class HideItemPopup implements Action {
    readonly type = HIDE_ITEM_POPUP;
}

export class ShowCreateItemPopup implements Action {
  readonly type = SHOW_CREATE_ITEM_POPUP;
}

export class HideCreateItemPopup implements Action {
  readonly type = HIDE_CREATE_ITEM_POPUP;
}


export type ItemActions =
    | LoadItems
    | RegisterItemStore
    | LoadItemsFail
    | LoadItemsSuccess
    | LoadItemHierarchy
    | LoadItemHierarchyFail
    | LoadItemHierarchySuccess
    | ShowItemPopup
    | HideItemPopup
    | ShowCreateItemPopup
    | HideCreateItemPopup
    | CreateItemSuccess
    | CreateItem
;
