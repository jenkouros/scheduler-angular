import * as fromActions from '../actions/items.action';
import CustomStore from 'devextreme/data/custom_store';
import { Item, ItemHierarchy } from '../../models/item.dto';
import { GridStoreConfiguration } from '../../models/shared.dto';
import { ItemState } from '../../models/item.store';
export { ItemState } from '../../models/item.store';
export { ItemUIState } from '../../models/item.store';

export const initialState: ItemState = {
    items: [],
    loadingItem: null,
    itemsStoreConfiguration: null,
    selectedItemHierarchy: null,
    selectedItemHierarchyLoaded: false,
    selectedItemHierarchyLoading: false,
    uiState: {
        popupOpened: false,
        createItemPopupOpened: false
    },
    lastCreatedItemId: null
};

export function itemsReducer(state = initialState, action: fromActions.ItemActions): ItemState {
    switch (action.type) {
        case fromActions.REGISTER_ITEMS_STORE: {
            return {
                ...state,
                itemsStoreConfiguration: {
                    ...action.payload,
                    reloadDate: new Date()
                }
            };
        }
        case fromActions.LOAD_ITEMS_SUCCESS: {
            return {
                ...state,
                items: [...action.payload]
            };
        }
        case fromActions.LOAD_ITEMHIERARCHY: {
            return {
                ...state,
                selectedItemHierarchyLoaded: false,
                selectedItemHierarchyLoading: true,
                selectedItemHierarchy: null,
                loadingItem: {
                    ...action.payload.item
                }
            };
        }
        case fromActions.LOAD_ITEMHIERARCHY_FAIL: {
            return {
                ...state,
                selectedItemHierarchyLoaded: false,
                selectedItemHierarchyLoading: false,
                selectedItemHierarchy: null
            };
        }
        case fromActions.LOAD_ITEMHIERARCHY_SUCCESS: {
            return {
                ...state,
                selectedItemHierarchyLoaded: true,
                selectedItemHierarchyLoading: false,
                selectedItemHierarchy: { ...action.payload }
            };
        }
        case fromActions.SHOW_ITEM_POPUP: {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    popupOpened: true
                }
            };
        }
        case fromActions.HIDE_ITEM_POPUP: {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    popupOpened: false
                },
                loadingItem: null
            };
        }
        case fromActions.SHOW_CREATE_ITEM_POPUP: {
          return {
              ...state,
              uiState: {
                  ...state.uiState,
                  createItemPopupOpened: true
              }
          };
        }
        case fromActions.HIDE_CREATE_ITEM_POPUP: {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    createItemPopupOpened: false
                },
                loadingItem: null
            };
        }
        case fromActions.CREATE_ITEM_SUCCESS: {
          return {
            ...state,
            lastCreatedItemId: action.payload.itemId
          };
        }
        default:
            return state;
    }
}
