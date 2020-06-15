import { PlanItemCreateRequestOptions, PlannedEventSimple } from './event.model';

export interface PlanGridOperation {
  idPrePlanItem: number;
  code: string;
  name: string;
  isPlanable: boolean;
  sequenceNumber: number;
  idContainer: number;
  containerCode: string | null;
  timeEnd: Date;
  timeStart: Date;
  idSubItem: number;
  idPriority: number;
  idUserStatus: number;
  userDate: Date;
  comment: string;
  idPlanItem: number;
  isLocked: boolean;
  options?: PlanItemCreateRequestOptions;
}

export interface PlanGridOperationChange {
  oldTimeStart: Date;
  oldTimeEnd: Date;
  timeChange: {
    timeEnd?: Date;
    timeStart?: Date
  };
  operation: PlanGridOperation | PlannedEventSimple;
  changeOrigin: OperationChangeOriginEnum;
  planItemId?: number;
}

export enum OperationChangeOriginEnum {
  ContainerGrid,
  InfoDialog,
  ItemGrid
}

export const planGridOperationPriorities = [
    { ID: 0, Name: 'Normalna' },
    { ID: 1, Name: 'Nizka' },
    { ID: 2, Name: 'Visoka' }
  ];

  export const planGridOperationExecution = [
  { ID: 1, Name: 'Planiran' },
  { ID: 2, Name: 'V izvajanju' },
  { ID: 3, Name: 'Končan' },
  { ID: 4, Name: 'V zastoju' },
  { ID: 5, Name: 'Preklican' },
  { ID: 6, Name: 'V niansiranju' }
];

export function getplanGridOperationExecutionColor(id) {
  if (id === 2) {
    return '#ccfbcc';
  } else if (id === 3) {
    return '#d6d6d6';
  } else if (id === 5) {
    return '#ff8383';
  } else if (id === 4) {
    return '#b1b1ff';
  } else if (id === 6) {
    return '#fbe8cc';
  }
}

export function getplanGridOperationPriorityColor(id) {
  if (id === 2) {
    return '#ff8383';
  }
}
