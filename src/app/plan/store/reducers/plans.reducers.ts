import * as fromPlans from '../actions/plans.actions';
import { Plan } from '../../models/plan.model';

export interface PlansState {
  entities: { [id: number]: Plan };
  selectedId: number;
  popupVisible: boolean;
  isDeletePopupVisible: boolean;
  loading: boolean;
  loaded: boolean;
}

export const initialState: PlansState = {
  entities: {},
  selectedId: 0,
  popupVisible: false,
  isDeletePopupVisible: false,
  loading: false,
  loaded: false
};

// create reducer
export function reducer(state = initialState, action: fromPlans.PlansActions): PlansState {
  switch (action.type) {
    case fromPlans.LOAD_PLANS: {
      return {
        ...state,
        selectedId: 0,
        loading: true
      };
    }
    case fromPlans.LOAD_PLANS_SUCCESS: {
      const plans = action.payload;

      const entities = plans.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: number]: Plan }, plan: Plan) => {
          return {
            ...entities,
            [plan.idPlan]: plan
          };
        },
        {
          ...state.entities
        }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromPlans.LOAD_PLANS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromPlans.SELECT_PLAN: {
      const selectedId = action.payload;
      return {
        ...state,
        selectedId
      };
    }
    case fromPlans.PLAN_POPUP_VISIBLE: {
      return {
        ...state,
        popupVisible: action.payload
      };
    }
    case fromPlans.CREATE_PLAN_SUCCESS: {
      const plan = action.payload;

      const entities = {
        ...state.entities,
        [plan.idPlan]: plan
      };

      return {
        ...state,
        entities
      };
    }
    case fromPlans.PLAN_DELETE_POPUP_VISIBLE: {
      return {
        ...state,
        isDeletePopupVisible: action.payload
      };
    }
    case fromPlans.REMOVE_PLAN_SUCCESS: {
      const plan = action.payload;
      const { [plan.idPlan]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
  }
  return state;
}

// export level of state
export const getPlansEntities = (state: PlansState) => state.entities;
export const getPlansLoading = (state: PlansState) => state.loading;
export const getPlansLoaded = (state: PlansState) => state.loaded;
export const getPopupVisibility = (state: PlansState) => state.popupVisible;
export const getPlansSelectedId = (state: PlansState) => state.selectedId;
export const getDeletePlanPopupVisibility = (state: PlansState) => state.isDeletePopupVisible;
