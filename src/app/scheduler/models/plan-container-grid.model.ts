import { PlanGridItem } from './plan-grid-item-model';
import { PlanGridOperation } from './plan-grid-operation.model';
export interface PlanContainerGrid {
  operation: PlanGridOperation;
  item: PlanGridItem;
  allDay: boolean;
}
