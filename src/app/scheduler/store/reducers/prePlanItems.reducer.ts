import * as fromAction from '../actions/preplanitems.action';
import { PreplanItem } from '../../models/preplanitem.dto';
import { PreplanitemState } from '../../models/preplanItem.store';

export { PreplanitemState } from '../../models/preplanItem.store';

export const initState: PreplanitemState = {
    preplanItems: [],
    preplanItemSuggestions: [],
    selectedPreplanItems: null,
    uiState: {
        draggedEnded: true,
        isDeletePopupVisible: false,
        isPreplanSuggestionPopupVisible: false,
        idDeleteItemBatchCandidate: null,
        idPreplanItemHideCandidate: null,
        isHidePreplanItemPopupVisible: false
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
        case(fromAction.SHOW_PREPLANITEM_HIDE_POPUP): {
          return {
              ...state,
              uiState: {
                  ...state.uiState,
                  idPreplanItemHideCandidate: action.payload.idPreplanItem,
                  isHidePreplanItemPopupVisible: true
              }
          };
        }
        case(fromAction.HIDE_PREPLANITEM_HIDE_POPUP): {
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    idPreplanItemHideCandidate: null,
                    isHidePreplanItemPopupVisible: false
                }
            };
        }
        case(fromAction.LOAD_PREPLANITEMS_SUGGESTIONS_SUCCESS): {
            // alert('state: ' + this.uiState);
            // alert('stateVisible: ' + this.uiState.isPreplanSuggestionPopupVisible);
            alert('test state: ' + state.uiState.isPreplanSuggestionPopupVisible);
            return {
                ...state,
                preplanItemSuggestions: action.payload,
                uiState: {
                    ...state.uiState,
                    isPreplanSuggestionPopupVisible: true
                }
            };
        }
        default:
            return state;
    }
}
