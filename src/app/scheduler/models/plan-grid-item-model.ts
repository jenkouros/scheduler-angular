export interface PlanGridItem {
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

export enum LinkedItemStatusEnum {
  NoData = 0,
  NotFinished = 1,
  Finished = 2
}
