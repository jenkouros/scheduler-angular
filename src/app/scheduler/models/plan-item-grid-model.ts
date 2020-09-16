import { PlanGridOperation } from './plan-grid-operation.model';
import { PlanGridItem } from './plan-grid-item-model';
export interface PlanItemGrid {
  groupKey?: string;
  item: PlanGridItem;
  operations: PlanGridOperation[];
  packingItems: PlanItemGrid[];
  productionItems: PlanItemGrid[];
}
