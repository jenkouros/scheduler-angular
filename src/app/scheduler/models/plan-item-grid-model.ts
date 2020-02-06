import { PlanItemGridOperation } from './plan-item-grid-operation.model';
import { PlanItemGridItem } from './plan-item-grid-item-model';
export interface PlanItemGrid {
  item: PlanItemGridItem;
  operations: PlanItemGridOperation[];
  packingItems: PlanItemGrid[];
  productionItems: PlanItemGrid[];
}
