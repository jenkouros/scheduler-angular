import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getPreplanitemsState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.preplanitems
);

export const getPreplanitems = createSelector(
    getPreplanitemsState,
    state => state.preplanItems
);

export const getSelectedPrePlanItem = createSelector(
    getPreplanitemsState,
    state => state.selectedPreplanItems
);
