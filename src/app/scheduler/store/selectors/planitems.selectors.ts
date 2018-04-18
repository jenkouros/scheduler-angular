import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { PlanItemHierarchyDto } from '../../models/planItem.dto';

export const getPlanItemsState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.planitems
);

export const getSelectedPlanItemHierarchy = createSelector(
    getPlanItemsState,
    (state: fromFeature.PlanItemState) => {
        return new PlanItemHierarchyDto(
            state.selectedPlanItemHierarchy,
            state.selectedPlanItemHierarchy.alternatives.map(a => a.name)
        );
    }
);
