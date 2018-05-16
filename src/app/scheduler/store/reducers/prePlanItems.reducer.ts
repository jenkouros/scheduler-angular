import * as fromAction from '../actions/preplanitems.action';
import { PreplanItem } from '../../models/preplanitem.dto';

export interface PreplanitemState {
    preplanItems: PreplanItem[];
    selectedPreplanItems: PreplanItem | null;
}

export const initState: PreplanitemState = {
    preplanItems: [],
    selectedPreplanItems: null
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
        case(fromAction.DRAGSTART_PREPLANITEM): {
            return {
                ...state,
                selectedPreplanItems: {...action.payload }
            };
        }
        case(fromAction.DRAGEND_PREPLANITEM): {
            return {
                ...state,
                selectedPreplanItems: null
            };
        }
        default:
            return state;
    }
}
