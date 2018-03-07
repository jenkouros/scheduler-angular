import { Filter } from "../../models/filter.model";
import * as formFilters from '../actions/filters.action';

export interface FilterState {
    entities: Filter[];
    loading: boolean;
    loaded: boolean;
}

export const initialState: FilterState = {
    entities: [],
    loaded: false,
    loading: false
};

export function filtersReducer(
    state = initialState, 
    action: formFilters.filterActions) 
{
    switch(action.type) {
        case formFilters.LOAD_FILTERS: {
            return {
                ...state,
                loading: true
            };
        }
        case formFilters.LOAD_FILTERS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
        case formFilters.LOAD_FILTERS_SUCCESS: {
            const filters = [...action.payload];
            return {
                ...state,
                loaded: true,
                loading: false,
                entities: filters
            };
        }
    }

}