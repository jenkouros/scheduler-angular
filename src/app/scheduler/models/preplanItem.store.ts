import { PreplanItem } from './preplanitem.dto';

export interface PreplanitemState {
    preplanItems: PreplanItem[];
    selectedPreplanItems: PreplanItem | null;
    uiState: PreplanitemUiState;
}

export interface PreplanitemUiState {
    draggedEnded: boolean;
    isDeletePopupVisible: boolean;
    idDeleteItemBatchCandidate: number | null;
}
