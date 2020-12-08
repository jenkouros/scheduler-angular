import { createSelector } from '@ngrx/store';
import { ContainerSelect } from '../../models/container.viewModel';
import * as fromFeature from '../reducers';

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
      const containerSelect = ContainerSelect.create(container);
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

export const getContainerTooltips = createSelector(
  getSelectedContainerSelectList,
  (containerSelectList: ContainerSelect[]) => {
    const dict: {[id: number]: string} = {};
    return containerSelectList.reduce(function(map, obj) {
      map[obj.id] = obj.name;
      return map;
  }, {});
  }
);

export const getSelectedContainerIds = createSelector(
  getContainersState,
  fromFeature.getSelectedContainers
);

export const getStatuses = createSelector(
  getContainersState,
  fromFeature.getContainerStatuses
);
