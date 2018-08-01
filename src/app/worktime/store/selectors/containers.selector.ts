import * as fromFeature from '../reducers';
import * as fromContainers from '../reducers/containers.reducer';
import { createSelector } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';

// containers state
export const getContainersState = createSelector(
  fromFeature.getWorkTimeState,
  (state: fromFeature.WorkTimeState) => state.containers
);

export const getAvalableContainersEntities = createSelector(
  getContainersState,
  fromContainers.getAvalableContainersEntities
);

export const getSelectedContainersEntities = createSelector(
  getContainersState,
  fromContainers.getSelectedContainersEntities
);

export const getAvalableContainers = createSelector(
  getAvalableContainersEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getSelectedContainers = createSelector(
  getSelectedContainersEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);
