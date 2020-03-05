import { PreplanItem, PrePlanItemSuggestion } from './preplanitem.dto';

export interface PreplanitemState {
    preplanItems: PreplanItem[];
    preplanItemSuggestions: PrePlanItemSuggestion[];
    selectedPreplanItems: PreplanItem | null;
    uiState: PreplanitemUiState;
}

export interface PreplanitemUiState {
    draggedEnded: boolean;
    isDeletePopupVisible: boolean;
    isHidePreplanItemPopupVisible: boolean;
    isPreplanSuggestionPopupVisible: boolean;
    idDeleteItemBatchCandidate: number | null;
    idPreplanItemHideCandidate: number | null;
}
