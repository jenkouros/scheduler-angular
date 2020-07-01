import { limitContainerGridLoadDate } from './../selectors/plan-container-grid.selectors';
import { PlanItemGrid } from './../../models/plan-item-grid-model';
import * as fromAction from '../actions/plan-container-grid.action';
import { PlanContainerGrid } from '../../models/plan-container-grid.model';
import { PlanGridOperationChange } from '../../models/plan-grid-operation.model';

export interface PlanContainerGridState {
  loading: boolean;
  planContainerGrids: PlanContainerGrid[];
  // openedPlanItemGrids: PlanItemGrid[];
  containerGridLimitDate: Date;
  planHoursSwitch: boolean;
  expandAllSwitch: boolean;
  updateTimeDialogData: PlanGridOperationChange | undefined;
}

const loadLimitDate = new Date();
loadLimitDate.setHours(0, 0, 0, 0);
loadLimitDate.setMonth(loadLimitDate.getMonth() - 6);
// loadLimitDate.setDate(loadLimitDate.getDate() - 7);

export const initialState: PlanContainerGridState = {
  loading: false,
  planContainerGrids: [],
  // openedPlanItemGrids: [],
  containerGridLimitDate: loadLimitDate,
  planHoursSwitch: false,
  expandAllSwitch: false,
  updateTimeDialogData: undefined
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
      if (!action.payload) {
        return {
          ...state,
          loading: false,
          updateTimeDialogData: undefined
        };
      }

      const items = [...action.payload];
      let updatedGridItems = state.planContainerGrids.map((containerGrid, index) => {
        if (!containerGrid.operation.idPrePlanItem) {
          const subItem = action.payload.find(i =>
            i.operation.idSubItem === containerGrid.operation.idSubItem);
          if (subItem) {
            const idx = items.findIndex(i =>
              i.operation.idSubItem === containerGrid.operation.idSubItem);
            if (idx > -1) { items.splice(idx, 1); }
            return subItem;
          }
          return containerGrid;
        }

        const operation = action.payload.find(i =>
          i.operation.idPrePlanItem === containerGrid.operation.idPrePlanItem);
        if (operation) {
          const idx = items.findIndex(i =>
            i.operation.idPrePlanItem === containerGrid.operation.idPrePlanItem);
          if (idx > -1) { items.splice(idx, 1); }
          return operation;
        }
        return containerGrid;
      });

      if (items.length > 0) {
        updatedGridItems = updatedGridItems.concat(items);
      }

      return {
        ...state,
        planContainerGrids: updatedGridItems,
        loading: false,
        updateTimeDialogData: undefined
      };
    }

    case fromAction.UPDATE_CONTAINER_GRID_FAIL: {
      return {
        ...state,
        loading: false,
        updateTimeDialogData: undefined
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
    case fromAction.PLAN_CONTAINER_GRID_EXPANDALL_SWITCH: {
      return {
        ...state,
        expandAllSwitch: action.payload
      };
    }
    case fromAction.PLAN_CONTAINER_GRID_SHOW_TIME_UPDATE_DIALOG: {
      return {
        ...state,
        updateTimeDialogData: {...action.payload}
      };
    }
    case fromAction.PLAN_CONTAINER_GRID_HIDE_TIME_UPDATE_DIALOG: {
      return {
        ...state,
        updateTimeDialogData: undefined
      };
    }
  }

  return state;
}
