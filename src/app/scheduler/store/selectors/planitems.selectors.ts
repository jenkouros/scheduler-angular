import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { PlanItemHierarchyViewModel } from '../../models/planitem.viewmodel';
import { FilterValue } from '../../models/filter.dto';

export const getPlanItemsState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.planitems
);

export const getPlanItemsStore = createSelector(
    getPlanItemsState,
    state => state.itemsStore
);

export const getSelectedPlanItemHierarchy = createSelector(
    getPlanItemsState,
    (state: fromFeature.PlanItemState) => {
        if (state.selectedItemHierarchy == null) {
            return new PlanItemHierarchyViewModel(null, null, []);
        }
        const idx = state.items.findIndex(i => i.idItem === state.selectedItemHierarchy.idPlanItem);
        if (idx < 0) {
            return new PlanItemHierarchyViewModel(null, null, []);
        }


        return new PlanItemHierarchyViewModel(
            state.items[idx],
            state.selectedItemHierarchy,
            state.selectedItemHierarchy.alternatives.map(a =>
                new FilterValue(a.id, a.name))
        );
    }
);
