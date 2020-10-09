import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { ItemHierarchyViewModel } from '../../models/item.viewmodel';
import { FilterValue } from '../../models/filter.dto';

export const getItemsState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.items
);

export const getItemsStoreConfiguration = createSelector(
    getItemsState,
    state => state.itemsStoreConfiguration
);

export const getSelectedItemHierarchy = createSelector(
    getItemsState,
    (state: fromFeature.ItemState) => {
        if (state.selectedItemHierarchy === null) {
            return null; // new PlanItemHierarchyViewModel(null, null, []);
        }

        const idPlanItem = state.selectedItemHierarchy.idPlanItem;
        let loadingItem = state.loadingItem && idPlanItem === state.loadingItem.idItem
            ? state.loadingItem
            : null;
        if (!loadingItem) {
            const idx = state.items.findIndex(i => i.idItem === idPlanItem);
            if (idx < 0) {
                return null; // new PlanItemHierarchyViewModel(null, null, []);
            }
            loadingItem = state.items[idx];
        }


        return new ItemHierarchyViewModel(
            loadingItem,
            state.selectedItemHierarchy,
            state.selectedItemHierarchy.alternatives.map(a =>
                FilterValue.create(a.id, a.name))
        );
    }
);

export const getCreatedItemId = createSelector(
  getItemsState,
  state => state.lastCreatedItemId
);

export const getItemUiState = createSelector(
    getItemsState,
    state => state.uiState
);
