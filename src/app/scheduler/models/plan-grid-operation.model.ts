import { translate } from '../../shared/app-component-base';
import { PlanItemCreateRequestOptions, PlanItemStatusEnum, PlannedEventSimple } from './event.model';
import { PlanContainerGrid } from './plan-container-grid.model';
import { PreplanItem } from './preplanitem.dto';

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
  status: number;
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
  idPlanItemStatus: number;
  planItemSequence: number;
}

export class PlanGridOperationHelper {
  static createFromPrePlanItem(preplanItem: PreplanItem, start: Date, end: Date, idContainer: number) {
    return {
      timeEnd: end,
      timeStart: start,
      idContainer: idContainer,
      idPrePlanItem: preplanItem.id,
      idSubItem: preplanItem.subItem.id
    } as PlanGridOperation;
  }

  static sort(a: PlanContainerGrid, b: PlanContainerGrid) {
    if (a.operation.planItemSequence && !b.operation.planItemSequence) {
      return 1;
    }
    if (!a.operation.planItemSequence && b.operation.planItemSequence) {
      return -1;
    }
    if (!a.operation.planItemSequence && !b.operation.planItemSequence) {
      return 0;
    }
    if (a.operation.planItemSequence > b.operation.planItemSequence) {
      return 1;
    }
    if (a.operation.planItemSequence < b.operation.planItemSequence) {
      return -1;
    }
    return 0;
  }
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

export function getPlanGridOperationExecutionStatuses(){
  return [
    { ID: 1, Name: translate('PlanItemStatus1') },
    { ID: 2, Name: translate('PlanItemStatus2') },
    { ID: 3, Name: translate('PlanItemStatus3') },
    { ID: 4, Name: translate('PlanItemStatus4') },
    { ID: 5, Name: translate('PlanItemStatus5') },
    { ID: 6, Name: translate('PlanItemStatus6') }
  ];
}



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

export function getplanGridOperationStatusColor(id) {
  if (id === PlanItemStatusEnum.Running) {
      return '#ccfbcc';
    } else if (id === PlanItemStatusEnum.Finished) {
      return '#d6d6d6';
    } else if (id === PlanItemStatusEnum.Break) {
      return '#b1b1ff';
    }
  }


export function getplanGridOperationPriorityColor(id) {
  if (id === 2) {
    return '#ff8383';
  }
}
