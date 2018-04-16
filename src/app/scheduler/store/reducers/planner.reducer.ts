import * as fromPlanner from "../actions/planner.action";
import { Container } from "../../models/container.model";

export interface PlannerState {
    containers: Container[],
    selectedContainers: number[],
    loading: boolean,
    loaded: boolean
}

export const initialState: PlannerState = {
    containers: [],
    selectedContainers: [],
    loaded: false,
    loading: false
};

export function plannerReducer(state = initialState, action: fromPlanner.PlannerAction) {
    switch(action.type) {
        case fromPlanner.LOAD_CONTAINERS: {
            return {
                ...state,
                loading: true
            };
        }
        case fromPlanner.LOAD_CONTAINERS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
        case fromPlanner.LOAD_CONTAINERS_SUCCESS: {
            return {
                ...state,
                loaded: true,
                loading: false,
                containers: [...action.payload]
            }
        }
        case fromPlanner.SELECT_CONTAINERS: {
            let selectionToAdd = action.payload.filter(i => state.selectedContainers.indexOf(i) < 0);
            return {
                ...state,
                selectedContainers: selectionToAdd.concat(state.selectedContainers)
            };
        }
        case fromPlanner.DESELECT_CONTAINERS: {
            let selectedContainers = [...state.selectedContainers];
            let newSelection = selectedContainers.filter(i => action.payload.indexOf(i) < 0);
            return {
                ...state,
                selectedContainers: newSelection
            };
        }
        default:
            return state;
    }
}