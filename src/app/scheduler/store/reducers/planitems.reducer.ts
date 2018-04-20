import { PlanItem, PlanItemHierarchy } from '../../models/planitem.model';
import * as fromPlanItems from '../actions/planitems.action';
import { Pagination } from '../../../shared/shared.model';

export interface PlanItemState {
    items: PlanItem[];
    itemsLoading: boolean;
    itemsLoaded: boolean;
    selectedItemHierarchy: PlanItemHierarchy;
    selectedItemHierarchyLoading: boolean;
    selectedItemHierarchyLoaded: boolean;
}

export const initialState: PlanItemState = {
    items: [],
    itemsLoading: false,
    itemsLoaded: false,
    selectedItemHierarchy: null,
    selectedItemHierarchyLoaded: false,
    selectedItemHierarchyLoading: false
};

export function planItemsReducer(state = initialState, action: fromPlanItems.PlanItemAction): PlanItemState {
    switch (action.type) {
        case fromPlanItems.LOAD_PLANITEMS: {
            return {
                ...state,
                itemsLoading: true
            };
        }
        case fromPlanItems.LOAD_PLANITEMS_FAIL: {
            return {
                ...state,
                itemsLoaded: false,
                itemsLoading: false
            };
        }
        case fromPlanItems.LOAD_PLANITEMS_SUCCESS: {
            return {
                ...state,
                itemsLoaded: true,
                itemsLoading: false,
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
