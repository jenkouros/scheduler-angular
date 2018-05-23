import * as fromPlanItems from '../actions/planitems.action';
import CustomStore from 'devextreme/data/custom_store';
import { PlanItem, PlanItemHierarchy } from '../../models/planitem.dto';

export interface PlanItemUIState {
    popupOpened: boolean;
}

export interface PlanItemState {
    items: PlanItem[];
    itemsStore: CustomStore | null;
    selectedItemHierarchy: PlanItemHierarchy | null;
    selectedItemHierarchyLoading: boolean;
    selectedItemHierarchyLoaded: boolean;
    uiState: PlanItemUIState;
}

export const initialState: PlanItemState = {
    items: [],
    itemsStore: null,
    selectedItemHierarchy: null,
    selectedItemHierarchyLoaded: false,
    selectedItemHierarchyLoading: false,
    uiState: {
        popupOpened: false
    }
};

export function planItemsReducer(state = initialState, action: fromPlanItems.PlanItemAction): PlanItemState {
    switch (action.type) {
        case fromPlanItems.REGISTER_PLANITEMS_STORE: {
            return {
                ...state,
                itemsStore: action.payload
            };
        }
        case fromPlanItems.LOAD_PLANITEMS_SUCCESS: {
            return {
                ...state,
                items: [...action.payload]
            };
        }
        case fromPlanItems.LOAD_PLANITEMHIERARCHY: {
            return {
                ...state,
                selectedItemHierarchyLoaded: false,
                selectedItemHierarchyLoading: true,
                selectedItemHierarchy: null
            };
        }
        case fromPlanItems.LOAD_PLANITEMHIERARCHY_FAIL: {
            return {
                ...state,
                selectedItemHierarchyLoaded: false,
                selectedItemHierarchyLoading: false,
                selectedItemHierarchy: null
            };
        }
        case fromPlanItems.LOAD_PLANITEMHIERARCHY_SUCCESS: {
            return {
                ...state,
                selectedItemHierarchyLoaded: true,
                selectedItemHierarchyLoading: false,
                selectedItemHierarchy: { ...action.payload }
            };
        }
        case fromPlanItems.SHOW_PLANITEM_POPUP: {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    popupOpened: true
                }
            };
        }
        case fromPlanItems.HIDE_PLANITEM_POPUP: {
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
