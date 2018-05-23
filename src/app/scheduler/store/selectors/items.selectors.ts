import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { ItemHierarchyViewModel } from '../../models/item.viewmodel';
import { FilterValue } from '../../models/filter.dto';

export const getItemsState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.items
);

export const getItemsStore = createSelector(
    getItemsState,
    state => state.itemsStore
);

export const getSelectedItemHierarchy = createSelector(
    getItemsState,
    (state: fromFeature.ItemState) => {
        if (state.selectedItemHierarchy === null) {
            return null; // new PlanItemHierarchyViewModel(null, null, []);
        }

        const idPlanItem = state.selectedItemHierarchy.idPlanItem;

        const idx = state.items.findIndex(i => i.idItem === idPlanItem);
        if (idx < 0) {
            return null; // new PlanItemHierarchyViewModel(null, null, []);
        }


        return new ItemHierarchyViewModel(
            state.items[idx],
            state.selectedItemHierarchy,
            state.selectedItemHierarchy.alternatives.map(a =>
                new FilterValue(a.id, a.name))
        );
    }
);

export const getItemUiState = createSelector(
    getItemsState,
    state => state.uiState
);
