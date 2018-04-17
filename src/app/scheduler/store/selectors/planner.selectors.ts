import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { ContainerSelect } from '../../models/container.model';

export const getPlannerState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.planner
);



export const getContainers = createSelector(
    getPlannerState,
    (state: fromFeature.PlannerState) => {
        console.log('Inside getContainers');
        return state.containers.map(c => {
            const containerSelect = new ContainerSelect(c);
            if (state.selectedContainers.indexOf(containerSelect.id) > -1) {
                containerSelect.selected = true;
            }
            return containerSelect;
        });
    }
);
