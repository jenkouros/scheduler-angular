import * as fromActions from '../actions/items.action';
import CustomStore from 'devextreme/data/custom_store';
import { Item, ItemHierarchy } from '../../models/item.dto';

export interface ItemUIState {
    popupOpened: boolean;
}

export interface ItemState {
    items: Item[];
    itemsStore: CustomStore | null;
    selectedItemHierarchy: ItemHierarchy | null;
    selectedItemHierarchyLoading: boolean;
    selectedItemHierarchyLoaded: boolean;
    uiState: ItemUIState;
}

export const initialState: ItemState = {
    items: [],
    itemsStore: null,
    selectedItemHierarchy: null,
    selectedItemHierarchyLoaded: false,
    selectedItemHierarchyLoading: false,
    uiState: {
        popupOpened: false
    }
};

export function itemsReducer(state = initialState, action: fromActions.ItemActions): ItemState {
    switch (action.type) {
        case fromActions.REGISTER_ITEMS_STORE: {
            return {
                ...state,
                itemsStore: action.payload
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
                selectedItemHierarchy: null
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
                }
            };
        }
        default:
            return state;
    }
}
