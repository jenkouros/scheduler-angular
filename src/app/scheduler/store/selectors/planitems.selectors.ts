import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { PlanItemHierarchyDto } from '../../models/planItem.dto';
import { FilterSelectValue } from '../../models/filter.model';

export const getPlanItemsState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.planitems
);

export const getSelectedPlanItemHierarchy = createSelector(
    getPlanItemsState,
    (state: fromFeature.PlanItemState) => {
        if (state.selectedItemHierarchy == null) {
            return new PlanItemHierarchyDto(null, null, []);
        }
        const idx = state.items.findIndex(i => i.idPlanItem === state.selectedItemHierarchy.idPlanItem);
        if (idx < 0) {
            return new PlanItemHierarchyDto(null, null, []);
        }


        return new PlanItemHierarchyDto(
            state.items[idx],
            state.selectedItemHierarchy,
            state.selectedItemHierarchy.alternatives.map(a =>
                new FilterSelectValue(a.id, a.name, false))
        );
    }
);
