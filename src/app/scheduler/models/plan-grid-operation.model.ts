export interface PlanGridOperation {
  idPrePlanItem: number;
  code: string;
  name: string;
  isPlanable: boolean;
  sequenceNumber: number;
  idContainer: number;
  containerCode: string;
  timeEnd: Date;
  timeStart: Date;
  idSubItem: number;
}
