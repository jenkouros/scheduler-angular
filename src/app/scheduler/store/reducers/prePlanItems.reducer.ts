import * as fromAction from '../actions/preplanitems.action';
import { PreplanItem } from '../../models/preplanitem.dto';

export interface PreplanitemState {
    preplanItems: PreplanItem[];
}

export const initState: PreplanitemState = {
    preplanItems: []
};

export function prePlanItems(state = initState, action: fromAction.PreplanitemAction): PreplanitemState {
    switch (action.type) {
        case(fromAction.LOAD_PREPLANITEMS_SUCCESS): {
            return {
                ...state,
                preplanItems: action.payload
            };
        }
        case(fromAction.REMOVE_PREPLANITEM): {
            return {
                ...state,
                preplanItems: state.preplanItems.filter(x => x.id !== action.payload)
            };
        }
        default:
            return state;
    }
}
