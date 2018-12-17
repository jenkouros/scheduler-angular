import * as fromPlans from '../actions/simulation.action';
import { Simulation } from '../../models/change.model';

export interface SimulationState {
  simulations: Simulation[];
  popupVisible: boolean;
  loading: boolean;
  loaded: boolean;
}

export const initialState: SimulationState = {
  simulations: [],
  popupVisible: false,
  loading: false,
  loaded: false
};

// create reducer
export function reducer(
  state = initialState,
  action: fromPlans.SumulationsActions
): SimulationState {
  switch (action.type) {
    case fromPlans.LOAD_PLANS_SIMULATION: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case fromPlans.LOAD_PLANS_SIMULATION_SUCCESS: {
      const simulations = action.payload;

      return {
        ...state,
        loading: false,
        loaded: true,
        simulations
      };
    }
    case fromPlans.LOAD_PLANS_SIMULATION_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromPlans.PLAN_SIMULATION_POPUP_VISIBLE: {
      return {
        ...state,
        popupVisible: action.payload
      };
    }
  }
  return state;
}

// export level of state
export const getSimulations = (state: SimulationState) => state.simulations;
export const getSimulationLoading = (state: SimulationState) => state.loading;
export const getSimulationLoaded = (state: SimulationState) => state.loaded;
export const getPopupVisibility = (state: SimulationState) => state.popupVisible;
