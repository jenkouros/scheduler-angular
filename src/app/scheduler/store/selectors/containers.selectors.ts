import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { ContainerSelect } from '../../models/container.model';

export const getContainersState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.containers
);

export const getContainers = createSelector(
    getContainersState,
    (state: fromFeature.ContainerState) => {
        return state.containers.map(c => {
            const containerSelect = new ContainerSelect(c);
            if (state.selectedContainers.indexOf(containerSelect.id) > -1) {
                containerSelect.selected = true;
            }
            return containerSelect;
        });
    }
);

export const getSelectedContainers = createSelector(
    getContainers,
    (containers: ContainerSelect[]) => {
        return containers.filter(c => c.selected);
    }
);
