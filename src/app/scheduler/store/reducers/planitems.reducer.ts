import { PlanItem, PlanItemHierarchy } from '../../models/planitem.model';
import * as fromPlanItems from '../actions/planitems.action';
import { Pagination } from '../../../shared/shared.model';

export interface PlanItemState {
    entities: PlanItem[];
    pagination: Pagination;
    loading: boolean;
    loaded: boolean;
    selectedPlanItemHierarchy: PlanItemHierarchy;
    loadingHierarchy: boolean;
    loadedHierarchy: boolean;
    // paging entity
}

export const initialState: PlanItemState = {
    entities: [],
    pagination: null,
    loading: false,
    loaded: false,
    selectedPlanItemHierarchy: null,
    loadedHierarchy: false,
    loadingHierarchy: false
};

export function planItemsReducer(state = initialState, action: fromPlanItems.PlanItemAction): PlanItemState {
    switch (action.type) {
        case fromPlanItems.LOAD_PLANITEMS: {
            return {
                ...state,
                loading: true
            };
        }
        case fromPlanItems.LOAD_PLANITEMS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
        case fromPlanItems.LOAD_PLANITEMS_SUCCESS: {
            const metadata = {
                ...state.pagination,
                ...action.payload.metadata
            };
            metadata.page = metadata.page + 1;

            return {
                ...state,
                loaded: true,
                loading: false,
                pagination: metadata,
                entities: [...action.payload.records]
            };
        }
        case fromPlanItems.LOAD_PLANITEMHIERARCHY: {
            return {
                ...state,
                loadedHierarchy: false,
                loadingHierarchy: true,
                selectedPlanItemHierarchy: null
            };
        }
        case fromPlanItems.LOAD_PLANITEMHIERARCHY_FAIL: {
            return {
                ...state,
                loadedHierarchy: false,
                loadingHierarchy: false,
                selectedPlanItemHierarchy: null
            };
        }
        case fromPlanItems.LOAD_PLANITEMHIERARCHY_SUCCESS: {
            return {
                ...state,
                loadedHierarchy: true,
                loadingHierarchy: false,
                selectedPlanItemHierarchy: { ...action.payload }
            };
        }
        default:
            return state;
    }
}
