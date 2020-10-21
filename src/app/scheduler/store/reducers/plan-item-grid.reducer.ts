import * as fromAction from '../actions/plan-item-grid.action';
import { PlanItemGrid } from './../../models/plan-item-grid-model';

export interface PlanItemGridState {
  loading: boolean;
  planItemGrids: PlanItemGrid[];
  openedPlanItemGrids: PlanItemGrid[];
  itemLimitDate: Date;
  planItemGridPopup: {
    loading: boolean;
    planItemGrid: PlanItemGrid | undefined;
  };
}

const loadLimitDate = new Date();
loadLimitDate.setHours(0, 0, 0, 0);
loadLimitDate.setMonth(loadLimitDate.getMonth() - 6);
// loadLimitDate.setDate(loadLimitDate.getDate() - 7);
export const initialState: PlanItemGridState = {
  loading: false,
  planItemGrids: [],
  openedPlanItemGrids: [],
  itemLimitDate: loadLimitDate,
  planItemGridPopup: {
    loading: false,
    planItemGrid: undefined
  }
};

export function planItemGridReducer (
  state = initialState,
  action: fromAction.PlanItemGridAction
): PlanItemGridState {
  switch (action.type) {
    case fromAction.LOAD_PLAN_ITEM_GRID: {
      return {
        ...state,
        loading: true
      };
    }
    case fromAction.LOAD_PLAN_ITEM_GRID_FAIL: {
      return {
        ...state,
        loading: false
      };
    }
    case fromAction.LOAD_PLAN_ITEM_GRID_SUCCESS: {
      return {
        ...state,
        loading: false,
        planItemGrids: action.payload
      };
    }
    case fromAction.UPDATE_ITEM_GRID_SUCCESS: {
      const updatedGridItems = state.planItemGrids.map((itemGrid, index) => {
        const item = action.payload.find(i => i.item.idItem === itemGrid.item.idItem);
        if (item) {
          return item;
        }
        return itemGrid;
      });

      let itemDialogData = state.planItemGridPopup.planItemGrid;
      if (itemDialogData) {
        const item = action.payload.find(i => i.item.idItem === itemDialogData!.item.idItem);
        if (item) {
          itemDialogData = item;
        }
      }

      return {
        ...state,
        planItemGrids: updatedGridItems,
        loading: false,
        planItemGridPopup: {
          ...state.planItemGridPopup,
          planItemGrid: itemDialogData
        }
      };
    }

    case fromAction.AUTOPLAN_ITEM_FAIL: {
      return {
        ...state,
        loading: false
      };
    }


    case fromAction.PLAN_ITEM_GRID_UPDATE: {
      return {
        ...state,
        loading: true
      };
    }
    case fromAction.AUTOPLAN_ITEM: {
      return {
        ...state,
        loading: true
      };
    }

    case fromAction.PLAN_ITEM_GRID_OPEN: {
      const selectedPlanItemGrid = [...state.openedPlanItemGrids];
      selectedPlanItemGrid.push(action.payload);
      return {
        ...state,
        openedPlanItemGrids: selectedPlanItemGrid
      };
    }

    case fromAction.PLAN_ITEM_GRID_SET_LIMIT_DATE: {
      return {
        ...state,
        itemLimitDate: action.payload
      };
    }

    case fromAction.LOAD_PLAN_ITEM_GRID_WITHID_SUCCESS: {
      return {
        ...state,
        planItemGridPopup: {
          ...state.planItemGridPopup,
          loading: false,
          planItemGrid: action.payload
        }
      };
    }
    case fromAction.LOAD_PLAN_ITEM_GRID_WITHID: {
      return {
        ...state,
        planItemGridPopup: {
          ...state.planItemGridPopup,
          loading: true
        }
      };
    }
    case fromAction.LOAD_PLAN_ITEM_GRID_WITHID_FAIL: {
      return {
        ...state,
        planItemGridPopup: {
          ...state.planItemGridPopup,
          loading: false
        }
      };
    }
    case fromAction.CLEAR_PLAN_ITEM_GRID_WITHID: {
      return {
        ...state,
        planItemGridPopup: {
          ...state.planItemGridPopup,
          loading: false,
          planItemGrid: undefined
        }
      };
    }
  }

  return state;
}
