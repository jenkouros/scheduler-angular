import { Item, ItemHierarchy } from './item.dto';
import { GridStoreConfiguration } from './shared.dto';

export interface ItemUIState {
    popupOpened: boolean;
    createItemPopupOpened: boolean;
}

export interface ItemState {
    items: Item[];
    loadingItem: Item | null;
    itemsStoreConfiguration: GridStoreConfiguration | null;
    selectedItemHierarchy: ItemHierarchy | null;
    selectedItemHierarchyLoading: boolean;
    selectedItemHierarchyLoaded: boolean;
    uiState: ItemUIState;
    lastCreatedItemId: number | null;
    subItemPlannableState: {id: number, value: boolean}[];
}
