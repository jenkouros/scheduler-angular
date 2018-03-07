import { PlanItem } from "../../models/planitem.model";
import * as fromPlanItems from "../actions/planitems.action";
import { Pagination } from "../../../shared/shared.model";

export interface PlanItemState {
    entities: PlanItem[];
    pagination: Pagination;
    loading: boolean;
    loaded: boolean;
    //paging entity
}

export const initialState: PlanItemState = {
    entities: [],
    pagination: null,
    loading: false,
    loaded: false
}

export function planItemsReducer(state = initialState, action: fromPlanItems.PlanItemAction) {
    switch(action.type) {
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
            return {
                ...state,
                loaded: true,
                loading: false,
                pagination: {
                    ...state.pagination,
                    ...action.payload.metadata
                },
                entities: [...action.payload.records]
            };
        }

        default:
            return state;
    }
}