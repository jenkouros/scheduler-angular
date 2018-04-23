import { PlanItem, PlanItemHierarchy } from '../../models/planitem.model';
import * as fromPlanItems from '../actions/planitems.action';
import { Pagination } from '../../../shared/shared.model';
import CustomStore from 'devextreme/data/custom_store';

export interface PlanItemState {
    items: PlanItem[];
    itemsStore: CustomStore;
    selectedItemHierarchy: PlanItemHierarchy;
    selectedItemHierarchyLoading: boolean;
    selectedItemHierarchyLoaded: boolean;
}

export const initialState: PlanItemState = {
    items: [],
    itemsStore: null,
    selectedItemHierarchy: null,
    selectedItemHierarchyLoaded: false,
    selectedItemHierarchyLoading: false
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
        default:
            return state;
    }
}
