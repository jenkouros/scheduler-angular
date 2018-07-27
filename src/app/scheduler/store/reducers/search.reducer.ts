import { SearchState } from '../../models/search.store';
import * as fromAction from '../actions/search.action';

export const initialState: SearchState = {
    searchItemsStore: null,
    searchPlanItemsStore: null
};

export function search(state = initialState, action: fromAction.SearchActions): SearchState {
    switch (action.type) {
        case fromAction.GET_SEARCHITEMS_STORE_SUCCESS: {
            return {
                ...state,
                searchItemsStore: action.payload
            };
        }
        case fromAction.GET_SEARCHPLANITEMS_STORE_SUCCESS: {
            return {
                ...state,
                searchPlanItemsStore: action.payload
            };
        }
        default:
            return state;
    }
}

export * from '../../models/search.store';
