import * as fromAction from '../actions/containers.action';
import { Container } from '../../models/container.dto';

export interface ContainerState {
    containers: Container[];
    selectedContainers: number[];
    loading: boolean;
    loaded: boolean;
}

export const initialState: ContainerState = {
    containers: [],
    selectedContainers: [],
    loaded: false,
    loading: false
};

export function containerReducer (
    state = initialState,
    action: fromAction.ContainersAction): ContainerState {
    switch (action.type) {
        case fromAction.LOAD_CONTAINERS: {
            return {
                ...state,
                loading: true
            };
        }
        case fromAction.LOAD_CONTAINERS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
        case fromAction.LOAD_CONTAINERS_SUCCESS: {
            return {
                ...state,
                loaded: true,
                loading: false,
                containers: [...action.payload]
            };
        }
        case fromAction.SELECT_CONTAINERS: {
            const selectionToAdd = action.payload.filter(i => state.selectedContainers.indexOf(i) < 0);
            return {
                ...state,
                selectedContainers: selectionToAdd.concat(state.selectedContainers)
            };
        }
        case fromAction.DESELECT_CONTAINERS: {
            const selectedContainers = [...state.selectedContainers];
            const newSelection = selectedContainers.filter(i => action.payload.indexOf(i) < 0);
            return {
                ...state,
                selectedContainers: newSelection
            };
        }
        case fromAction.RESELECT_CONTAINERS: {
            return {
                ...state,
                selectedContainers: action.payload
            };
        }

        default:
            return state;
    }
}
