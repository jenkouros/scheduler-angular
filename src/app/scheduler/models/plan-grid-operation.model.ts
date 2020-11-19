import { translate } from '../../shared/app-component-base';
import { PlanItemCreateRequestOptions, PlannedEventSimple } from './event.model';

export interface ItemExecutionStatus {
  operationName: string;
  status: number;
}

export interface LinkedItemExecutionStatus {
  status: number;
}

export interface ParentLinkedItemStatus {
  status: number;
  containerCode: string;
}

export interface PlanGridOperation {
  itemExecutionStatus: ItemExecutionStatus;
  linkedItemExecutionStatus: LinkedItemExecutionStatus;
  parentLinkedItemStatus: ParentLinkedItemStatus;
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
    { ID: 0, Name: translate('normal') },
    { ID: 1, Name: translate('low') },
    { ID: 2, Name: translate('high') }
  ];

  export const planGridOperationExecution = [
  { ID: 1, Name: translate('PlanItemStatus1') },
  { ID: 2, Name: translate('PlanItemStatus2') },
  { ID: 3, Name: translate('PlanItemStatus3') },
  { ID: 4, Name: translate('PlanItemStatus4') },
  { ID: 5, Name: translate('PlanItemStatus5') },
  { ID: 6, Name: translate('PlanItemStatus6') }
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
