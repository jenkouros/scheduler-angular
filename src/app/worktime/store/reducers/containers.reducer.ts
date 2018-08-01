import * as fromContainers from '../actions/containers.actions';
import { Container } from '../../../scheduler/models/container.dto';

export interface ContainersState {
  selected: { [id: number]: Container };
  available: { [id: number]: Container };
  loading: boolean;
  loaded: boolean;
}

export const initialState: ContainersState = {
  selected: {},
  available: {},
  loading: false,
  loaded: false
};

// create reducer
export function reducer(
  state = initialState,
  action: fromContainers.ContainersActions
): ContainersState {
  switch (action.type) {
    case fromContainers.LOAD_CONTAINERS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromContainers.LOAD_CONTAINERS_SUCCESS: {
      const schedule = action.payload;
      const empty = {};
      console.log(schedule);
      const selected = schedule.selectedContainers.reduce(
        (entities: { [id: number]: Container }, container: Container) => {
          return {
            ...entities,
            [container.id]: container
          };
        },
        {
          ...empty
          // ...state.selected
        }
      );

      const available = schedule.unselectedContainers.reduce(
        (entities: { [id: number]: Container }, container: Container) => {
          return {
            ...entities,
            [container.id]: container
          };
        },
        {
          ...empty
          // ...state.available
        }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        selected,
        available
      };
    }
    case fromContainers.LOAD_CONTAINERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromContainers.ADD_TO_SELECTED_CONTAINERS_SUCCESS: {
      const subCalendar = action.payload;
      const containers = subCalendar.containersIds.map(id => {
        return state.available[id];
      });

      const containerEntities = containers.reduce(
        (entities: { [id: number]: Container }, container: Container) => {
          return {
            ...entities,
            [container.id]: container
          };
        },
        {
          ...state.selected
        }
      );

      return {
        ...state,
        selected: containerEntities
      };
    }
  }
  return state;
}

export const getSelectedContainersEntities = (state: ContainersState) =>
  state.selected;
export const getAvalableContainersEntities = (state: ContainersState) =>
  state.available;
export const getContainersLoading = (state: ContainersState) => state.loading;
export const getContainersLoaded = (state: ContainersState) => state.loaded;
