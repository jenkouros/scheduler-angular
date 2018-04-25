import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { Container } from '../../models/container.dto';
import { ContainerSelect } from '../../models/container.viewModel';


export const getContainersState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.containers
);

export const getContainerCodeList = createSelector(
    getContainersState,
    state => state.containers
);


export const getContainerSelectList = createSelector(
    getContainersState,
    (state: fromFeature.ContainerState) => {
        return state.containers.map(container => {
            const containerSelect = new ContainerSelect(container);
            if (state.selectedContainers.indexOf(containerSelect.id) > -1) {
                containerSelect.selected = true;
            }
            return containerSelect;
        });
    }
);

export const getSelectedContainerSelectList = createSelector(
    getContainerSelectList,
    (containerSelectList: ContainerSelect[]) => {
        return containerSelectList.filter(c => c.selected);
    }
);