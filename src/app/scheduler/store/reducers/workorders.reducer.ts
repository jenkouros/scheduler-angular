import { Workorder } from "../../models/wororder.model";
import * as fromWorkorders from "../actions/workorders.action";

export interface WorkorderState {
    entities: { [id: number]: Workorder };
    loading: boolean;
    loaded: boolean;
    //paging entity
}

export const initialState: WorkorderState = {
    entities: {},
    loading: false,
    loaded: false
}

export function workordersReducer(state = initialState, action: fromWorkorders.WorkordersAction) {
    switch(action.type) {
        case fromWorkorders.LOAD_WORKORDERS: {
            return {
                ...state,
                loading: true
            };
        }
        case fromWorkorders.LOAD_WORKORDERS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
        case fromWorkorders.LOAD_WORKORDERS_SUCCESS: {
            return {
                ...state,
                loaded: true,
                loading: false
            }
        }

        default:
            return state;
    }
}