import { PlanItemGrid } from './../../models/plan-item-grid-model';
import * as fromAction from '../actions/plan-item-grid.action';

export interface PlanItemGridState {
  loading: boolean;
  planItemGrids: PlanItemGrid[];
  openedPlanItemGrids: PlanItemGrid[];
}

export const initialState: PlanItemGridState = {
  loading: false,
  planItemGrids: [],
  openedPlanItemGrids: []
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

      return {
        ...state,
        planItemGrids: updatedGridItems
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
  }

  return state;
}
