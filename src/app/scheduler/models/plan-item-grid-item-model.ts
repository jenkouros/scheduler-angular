export interface PlanItemGridItem {
  idItem: number;
  idItemBatch: number;
  itemCode: string;
  articleName: string;
  articleCode: string;
  quantity: number;
  quantityMeasurementUnit: string;
  published: Date;
  lastUpdate: Date;
  itemExecutionStatus: number;
  priority: number;
}
