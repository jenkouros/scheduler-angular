import { Filter } from '../../models/filter.dto';
import * as fromFilters from '../actions/filters.action';
import { Container } from '../../models/container.dto';

export interface FilterState {
    entities: Filter[];
    selectedEntities: { [id: string]: number[] };
    selectedContainers: Container[];
    loading: boolean;
    loaded: boolean;
}

export const initialState: FilterState = {
    entities: [],
    selectedEntities: {},
    selectedContainers: [],
    loaded: false,
    loading: false
};

export function filtersReducer(
    state = initialState,
    action: fromFilters.filterActions) {
    switch (action.type) {
        case fromFilters.LOAD_FILTERS: {
            return {
                ...state,
                loading: true
            };
        }
        case fromFilters.LOAD_FILTERS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
        case fromFilters.LOAD_FILTERS_SUCCESS: {
            const filters = [...action.payload];
            return {
                ...state,
                loaded: true,
                loading: false,
                entities: filters
            };
        }
        case fromFilters.CHANGE_FILTER: {
            // const selected = {...state.selectedEntities};
            const selected = {};
            for (const key in action.payload) {
                if (action.payload.hasOwnProperty(key)) {
                    selected[key] = [...action.payload[key]];
                }
            }
            return {
                ...state,
                selectedEntities: selected
            };
        }
        case fromFilters.CHANGE_CONTAINERS_FILTER: {
            return {
                ...state,
                selectedContainers: action.payload
            };
        }

        case fromFilters.CHANGE_ONE_FILTER: {
            const selected = {...state.selectedEntities};
            if (!action.payload.values.length) {
                delete selected[action.payload.id];
            } else {
                selected[action.payload.id] = [...action.payload.values];
            }

            return {
                ...state,
                selectedEntities: selected
            };
        }

        // case fromFilters.SELECT_VALUE_ON_FILTER: {
        //     const selected = { ...state.selectedEntities };
        //     if (selected[action.payload.id]) {
        //         selected[action.payload.id] = [...selected[action.payload.id], action.payload.value];
        //     } else {
        //         selected[action.payload.id] = [action.payload.value];
        //     }

        //     return {
        //         ...state,
        //         selectedEntities: selected
        //     };
        // }
        // case fromFilters.REMOVE_VALUE_ON_FILTER: {
        //     const selected = { ...state.selectedEntities };
        //     if (selected[action.payload.id]) {
        //         const selectedIndex = selected[action.payload.id].findIndex(x => x === action.payload.value);
        //         if (selected[action.payload.id].length === 1) {
        //             delete selected[action.payload.id];
        //         } else {
        //             selected[action.payload.id] = [
        //                 ...selected[action.payload.id].slice(0, selectedIndex),
        //                 ...selected[action.payload.id].slice(selectedIndex + 1)
        //             ];
        //             // selected[action.payload.id].splice(selectedIndex, 1);
        //         }
        //     }
        //     return {
        //         ...state,
        //         selectedEntities: selected
        //     };
        // }
        default:
            return state;
    }
}
