import { PlanGridOperation } from './plan-grid-operation.model';
import { PlanGridItem } from './plan-grid-item-model';
export interface PlanItemGrid {
  item: PlanGridItem;
  operations: PlanGridOperation[];
  packingItems: PlanItemGrid[];
  productionItems: PlanItemGrid[];
}
