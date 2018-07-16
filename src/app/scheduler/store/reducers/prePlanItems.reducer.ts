import * as fromAction from '../actions/preplanitems.action';
import { PreplanItem } from '../../models/preplanitem.dto';
import { PreplanitemState } from '../../models/preplanItem.store';

export { PreplanitemState } from '../../models/preplanItem.store';

export const initState: PreplanitemState = {
    preplanItems: [],
    selectedPreplanItems: null,
    uiState: {
        draggedEnded: true,
        isDeletePopupVisible: false,
        idDeleteItemBatchCandidate: null
    }
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
                selectedPreplanItems: {...action.payload },
                uiState: {
                    ...state.uiState,
                    draggedEnded : false
                }
            };
        }
        case(fromAction.DRAGEND_PREPLANITEM): {
            return {
                ...state,
                selectedPreplanItems: null,
                uiState: {
                    ...state.uiState,
                    draggedEnded : true
                }
            };
        }
        case(fromAction.SHOW_ITEMBATCH_DELETE_POPUP): {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    idDeleteItemBatchCandidate: action.payload.idItemBatch,
                    isDeletePopupVisible: true
                }
            };
        }
        case(fromAction.HIDE_ITEMBATCH_DELETE_POPUP): {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    idDeleteItemBatchCandidate: null,
                    isDeletePopupVisible: false
                }
            };
        }

        default:
            return state;
    }
}
