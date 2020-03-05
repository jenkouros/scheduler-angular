import { limitContainerGridLoadDate } from './../selectors/plan-container-grid.selectors';
import { PlanItemGrid } from './../../models/plan-item-grid-model';
import * as fromAction from '../actions/plan-container-grid.action';
import { PlanContainerGrid } from '../../models/plan-container-grid.model';

export interface PlanContainerGridState {
  loading: boolean;
  planContainerGrids: PlanContainerGrid[];
  // openedPlanItemGrids: PlanItemGrid[];
  containerGridLimitDate: Date;
  planHoursSwitch: boolean;
}

const loadLimitDate = new Date();
loadLimitDate.setHours(0, 0, 0, 0);
// loadLimitDate.setMonth(loadLimitDate.getMonth() - 1);
loadLimitDate.setDate(loadLimitDate.getDate() - 7);
export const initialState: PlanContainerGridState = {
  loading: false,
  planContainerGrids: [],
  // openedPlanItemGrids: [],
  containerGridLimitDate: loadLimitDate,
  planHoursSwitch: true
};

export function planItemGridReducer (
  state = initialState,
  action: fromAction.PlanContainerGridAction
): PlanContainerGridState {
  switch (action.type) {
    case fromAction.LOAD_PLAN_CONTAINER_GRID: {
      return {
        ...state,
        loading: true
      };
    }
    case fromAction.LOAD_PLAN_CONTAINER_GRID_FAIL: {
      return {
        ...state,
        loading: false
      };
    }
    case fromAction.LOAD_PLAN_CONTAINER_GRID_SUCCESS: {
      return {
        ...state,
        loading: false,
        planContainerGrids: action.payload
      };
    }
    case fromAction.UPDATE_CONTAINER_GRID_SUCCESS: {
      const updatedGridItems = state.planContainerGrids.map((containerGrid, index) => {
        if (!containerGrid.operation.idPrePlanItem) {
          const subItem = action.payload.find(i =>
            i.operation.idSubItem === containerGrid.operation.idSubItem);
          if (subItem) { return subItem; }
          return containerGrid;
        }

        const operation = action.payload.find(i =>
          i.operation.idPrePlanItem === containerGrid.operation.idPrePlanItem);
        if (operation) {
          return operation;
        }
        return containerGrid;
      });

      return {
        ...state,
        planContainerGrids: updatedGridItems,
        loading: false
      };
    }

    case fromAction.UPDATE_CONTAINER_GRID_FAIL: {
      return {
        ...state,
        loading: false
      };
    }


    case fromAction.PLAN_CONTAINER_GRID_UPDATE: {
      return {
        ...state,
        loading: true
      };
    }
    // case fromAction.AUTOPLAN_ITEM: {
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // }

    // case fromAction.PLAN_ITEM_GRID_OPEN: {
    //   const selectedPlanItemGrid = [...state.openedPlanItemGrids];
    //   selectedPlanItemGrid.push(action.payload);
    //   return {
    //     ...state,
    //     openedPlanItemGrids: selectedPlanItemGrid
    //   };
    // }

    case fromAction.PLAN_CONTAINER_GRID_SET_LIMIT_DATE: {
      return {
        ...state,
        containerGridLimitDate: action.payload
      };
    }

    case fromAction.PLAN_CONTAINER_GRID_PLANHOURS_SWITCH: {
      return {
        ...state,
        planHoursSwitch: action.payload
      };
    }
  }

  return state;
}
