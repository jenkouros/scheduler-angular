import { PlannedEventServer, PlannedEventSimpleServer, PlanItemResponseServer } from '../models/server/plannedevent.servermodel';
import { PreplanItem } from './preplanitem.dto';
import { SubItemContainerServer } from './server/preplanitem.servermodel';
import { SubItemContainer } from './subitem.dto';
import { PlanSchedule } from './planschedule.dto';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { TimeHelper } from '../helpers/time.helper';

export interface ContainerEvents {
    events: PlannedEvent[];
    notWorkingHoursEvents: PlanSchedule[];
    dateFrom: Date;
    dateTo: Date;
}

export interface PlanItemsLoadRequest {
    fromDate: Date;
    toDate: Date;
    containerIds: number[];
}

export interface PlanItemPutRequest {
    idPlanItem: number;
    idContainer: number;
    timePreparationStart: Date | string;
    timeExecutionStart?: Date | string;
    timeExecutionEnd: Date | string;
    comment?: string;
    options?: PlanItemPutRequestOptions;
    planItemMoveStatus: PlanItemMoveStatusEnum;
}

export interface PlanItemPutRequestOptions {
    fixPlanItem?: boolean;
    ignoreStatusLimitation?: boolean;
    enablePlanningOnAllWorkplaces?: boolean;
    skipNonWorkingTimeMove?: boolean;
    snapFurtherItems?: boolean;
    isUserDurationChange?: boolean;
}

export interface PlanItemCreateRequest {
    idPrePlanItem: number;
    idContainer: number;
    timePreparationStart: Date | string;
    timeExecutionStart: Date | string;
    timeExecutionEnd: Date | string;
    comment?: string;
    idPriority?: number;
    idUserStatus?: number;
    userDate?: Date | string;
    options?: PlanItemCreateRequestOptions;
}

export interface PlanItemCreateRequestOptions extends PlanItemPutRequestOptions {
    // enablePlanningOnAllWorkplaces?: boolean;
}

export interface PlannedEventMove {
    idPlanItem: number;
    idPrePlanItem: number;
    idContainer: number;
    timeStart: Date;
    timeEnd: Date;
    planItemMoveStatus: PlanItemMoveStatusEnum;
}

export interface PlannedEventNotWorkingHoursMove {
    extendPlanItem: PlannedEventMove;
    movePlanItem: PlannedEventMove;
}

export class PlanItemGetRequest {
    timeStart: Date | string;
    timeEnd: Date | string;
    idPlan: number;
    containers: number[];
}

export class PlanItemsGetResponse {
    planItems: PlannedEvent[];
    notWorkingHoursEvents: PlanSchedule[];

    static fromServer(serverData: PlanItemResponseServer) {
        const result = new PlanItemsGetResponse();
        const planItems = serverData.planItems.map(PlannedEvent.fromServer).map(PlannedEvent.getVirtualLinkedPlanItems);
        result.planItems = [].concat.apply([], planItems); // serverData.planItems.map(PlannedEvent.fromServer);
        result.notWorkingHoursEvents = serverData.notWorkingHoursEvents.map(PlanSchedule.fromServer);
        return result;
    }
}

export class PlannedEvent {
    settings: any;
    // PARALLEL_SEQUENCE_ALLOWED = environment.parallelOperations;
    id: number;
    idPrePlanItem: number;
    idPlan: number;
    idItemBatch: number;
    containerId: number;
    idSubItemContainer: number;
    idPlanItemStatus: number;
    quantity: number;
    manufacturedQuantity: number;
    manufactureStartTime: Date | null;
    unitQuantity: string;
    description: string;
    itemId: number;
    itemCode: string;
    itemName: string;
    articleCode: string;
    articleName: string;
    subItemCode: string;
    subItemName: string;
    // timeStartPreparation: Date;
    timeStartExecution: Date;
    // timeEndExecution: Date;
    title: string;
    containers: SubItemContainer[];
    sequencePlanItems: PlannedEventSimple[];
    // linkedPlanItems: PlannedEventSimple[];
    linkedItem: LinkedItemModel;
    parentLinkedItems: LinkedItemModel[];
    isLocked: boolean;
    isInNotWorkingHours: boolean;
    isPlanned: boolean;
    preplanItem: PreplanItem | null;
    startDate: Date;
    endDate: Date;
    itemTypeShortName: string | null;
    extensionDurationInMinutes: number | null;
    showParentVirtualPlanItem: boolean;

    options: PlanItemPutRequestOptions;
    color: string;

    get timeEndExecution() {
        return this.endDate;
    }
    set timeEndExecution(newValue) {
        this.endDate = newValue;
    }
    get timeStartPreparation() {
        return this.startDate;
    }
    set timeStartPreparation(newValue) {
        this.startDate = newValue;
    }

    get operationDuration() {
      return ((this.timeEndExecution.getTime() - this.timeStartPreparation.getTime()) / 60000)
        - (this.extensionDurationInMinutes || 0);
    }

    get operationDurationString() {
      return TimeHelper.convertMinutesIntoString(this.operationDuration);
    }


    // SETTINGS !!!! planItem.timeStartPreparation or planItem.timeEnd
    get sequenceWarning(): boolean {
        if (!this.sequencePlanItems) {
            return false;
        }

        let lastEnd: Date | null = null;
        for (const planItem of this.sequencePlanItems) {
            if (lastEnd && planItem.timeStartPreparation && planItem.timeStartPreparation < lastEnd) {
                return true;
            }
            if (planItem.timeEnd) { // if planned
                lastEnd = environment.parallelOperations || planItem.allowParallelPlan
                    ? planItem.timeStartPreparation
                    : planItem.timeEnd;
            }
        }
        return false;
    }


    // SETTINGS !!!! planItem.timeStartPreparation or planItem.timeEnd
    get linkedItemSequenceWarning(): boolean {
        if (!this.linkedItem || this.linkedItem.linkedPlanItems.length < 1) {
            return false;
        }

        let linkedPlanItem: PlannedEventSimple | null = null;
        for (let i = this.linkedItem.linkedPlanItems.length - 1; i >= 0; i--) {
          if (this.linkedItem.linkedPlanItems[i].timeEnd &&
                (linkedPlanItem === null ||
                (new Date((linkedPlanItem as any).timeEnd).getTime() <
                  new Date(this.linkedItem.linkedPlanItems[i].timeEnd as any).getTime())
              )) {
                linkedPlanItem = this.linkedItem.linkedPlanItems[i];
              }
        }

        let parentItem: PlannedEventSimple | null = null;
        for (let i = 0; i < this.sequencePlanItems.length; i++) {
            if (this.sequencePlanItems[i].timeStartPreparation && (parentItem === null ||
                new Date((parentItem as any).timeStartPreparation).getTime() >
                new Date(this.sequencePlanItems[i].timeStartPreparation as any).getTime() )) {
                    parentItem = this.sequencePlanItems[i];
            }
        }

        if (linkedPlanItem === null || parentItem === null
          || !linkedPlanItem.timeEnd || !parentItem.timeStartPreparation) {
            return false;
        }
        return new Date(linkedPlanItem.timeEnd).getTime() > new Date(parentItem.timeStartPreparation).getTime();
    }


    // get linkedItemSequenceWarning(): boolean {
    //     if (!this.linkedPlanItems || this.linkedPlanItems.length < 1) {
    //         return false;
    //     }

    //     let childItem: PlannedEventSimple | null = null;
    //     for (let i = this.linkedPlanItems.length - 1; i >= 0; i--) {
    //         if (this.linkedPlanItems[i].timeEnd && (childItem === null ||
    //             new Date((childItem as any).timeEnd).getTime() <
    //             new Date(this.linkedPlanItems[i].timeEnd as any).getTime() )) {
    //                 childItem = this.linkedPlanItems[i];
    //         }
    //     }

    //     let parentItem: PlannedEventSimple | null = null;
    //     for (let i = 0; i < this.sequencePlanItems.length; i++) {
    //         if (this.sequencePlanItems[i].timeStartPreparation && (parentItem === null ||
    //             new Date((parentItem as any).timeStartPreparation).getTime() >
    //             new Date(this.sequencePlanItems[i].timeStartPreparation as any).getTime() )) {
    //                 parentItem = this.sequencePlanItems[i];
    //         }
    //     }

    //     if (childItem === null || parentItem === null
    //       || !childItem.timeEnd || !parentItem.timeStartPreparation) {
    //         return false;
    //     }
    //     return new Date(childItem.timeEnd).getTime() > new Date(parentItem.timeStartPreparation).getTime();
    // }

    get statusDescription() {
        switch (this.idPlanItemStatus) {
            case PlanItemStatusEnum.Running: return 'V izvajanju';
            case PlanItemStatusEnum.Finished: return 'Zaključen';
            case PlanItemStatusEnum.Canceled: return 'Preklican';
            case PlanItemStatusEnum.Planned: return 'Planiran';
            case PlanItemStatusEnum.Scheduled: return 'Planiran';
        }
        return '-';
    }

    get progressEnum() {
        const currentDate = new Date();

        if (new Date(this.timeEndExecution).getTime() < currentDate.getTime() &&
            this.idPlanItemStatus < PlanItemStatusEnum.Finished) {
                return PlanItemProgressEnum.NotFinished;
            }

        if (this.manufacturedQuantity !== null) { // if(kosovna)
            if (this.idPlanItemStatus === PlanItemStatusEnum.Running) {
                const selectedSubItemContainer = this.selectedSubItemContainer;
                if (!selectedSubItemContainer) {
                    return PlanItemProgressEnum.Unknown;
                }
                let duration = moment(new Date()).diff(moment(new Date(this.timeStartExecution)), 'm');
                duration = Math.max(duration, 0);
                const normativeTimeForPiece = selectedSubItemContainer.executionNormative / selectedSubItemContainer.quantity;

                if ( (duration / normativeTimeForPiece) > this.manufacturedQuantity )  {
                    return PlanItemProgressEnum.Late;
                } else {
                    return PlanItemProgressEnum.OnTime;
                }
            }
        }

        if (new Date(this.timeStartPreparation).getTime() < currentDate.getTime() &&
            this.idPlanItemStatus !== PlanItemStatusEnum.Running) {
            return PlanItemProgressEnum.Late;
        }

        return PlanItemProgressEnum.Unknown;
    }

    get selectedSubItemContainer() {
        return this.idSubItemContainer
            ? this.containers.find(i => i.idSubItemContainer === this.idSubItemContainer)
            : undefined;
    }

    static createFromPreplanitem(idPrePlanItem: number,
        idContainer: number,
        title: string,
        description: string,
        subItemName: string,
        startPreparationDate: Date,
        startExecutionDate: Date,
        endExecutionDate: Date,
        subItemContainers: SubItemContainer[],
        quantity: number,
        unitQuantity: string,
        // preplanItem: PreplanItem | null = null,
        isPlanned: boolean = true,
        allowParallel: boolean = false
    ) {
        const result = new PlannedEvent();
        result.idPrePlanItem = idPrePlanItem;
        result.containerId = idContainer;
        result.title = title;
        result.subItemName = subItemName;
        result.description = description;
        result.timeStartPreparation = startPreparationDate;
        result.timeStartExecution = startExecutionDate;
        result.timeEndExecution = endExecutionDate;
        result.containers = subItemContainers;
        result.quantity = quantity;
        result.unitQuantity = unitQuantity;
        result.isPlanned = isPlanned;
        result.isLocked = false;
        // result.PARALLEL_SEQUENCE_ALLOWED = environment.parallelOperations || allowParallel;

        return result;
    }

    static fromServer(event: PlannedEventServer): PlannedEvent {
        const result = new PlannedEvent();
        result.id = event.idPlanItem;
        result.idPrePlanItem = event.idPrePlanItem;
        result.idPlan = event.idPlan;
        result.idItemBatch = event.idItemBatch;
        result.containerId = event.idContainer;
        result.idSubItemContainer = event.idSubItemContainer;
        result.idPlanItemStatus = event.idPlanItemStatus;
        result.quantity = event.quantity;
        result.unitQuantity = event.unitQuantity;
        result.description = event.comment;
        result.itemId = event.itemId;
        result.itemCode = event.itemCode;
        result.itemName = event.itemName;
        result.articleCode = event.articleCode;
        result.articleName = event.articleName;
        result.subItemCode = event.subItemCode;
        result.subItemName = event.subItemName;
        result.timeStartPreparation = new Date(event.timeStartPreparation);
        result.timeStartExecution = new Date(event.timeStart);
        result.timeEndExecution = new Date(event.timeEnd);
        // const test = moment(event.timeEnd, 'MM/DD/YYYY HH:mm:ss');
        result.title = event.title;
        result.containers = event.allowedContainers.map(SubItemContainer.fromServer);
        result.isPlanned = true;
        result.isLocked = event.isLocked;
        result.sequencePlanItems = event.sequencePlanItems.map(PlannedEventSimple.fromServer);
        result.showParentVirtualPlanItem = event.showParentVirtualPlanItem;
        if (event.linkedItem) {
          result.linkedItem = new LinkedItemModel();
          result.linkedItem.batchNumber = event.linkedItem.batchNumber;
          result.linkedItem.idItem = event.linkedItem.idItem;
          result.linkedItem.idItemBatch = event.linkedItem.idItemBatch;
          result.linkedItem.itemCode = event.linkedItem.itemCode;
          result.linkedItem.startDate = new Date(event.linkedItem.startDate);
          result.linkedItem.endDate = new Date(event.linkedItem.endDate);
          result.linkedItem.linkedPlanItems = event.linkedItem.linkedPlanItems.map(PlannedEventSimple.fromServer);
        }
        if (event.parentLinkedItems) {
          result.parentLinkedItems = event.parentLinkedItems.map(parentLinkedItem => {
            const model = new LinkedItemModel();
            model.batchNumber = parentLinkedItem.batchNumber;
            model.idItem = parentLinkedItem.idItem;
            model.idItemBatch = parentLinkedItem.idItemBatch;
            model.itemCode = parentLinkedItem.itemCode;
            model.startDate = new Date(parentLinkedItem.startDate);
            model.endDate = new Date(parentLinkedItem.endDate);
            model.linkedPlanItems = parentLinkedItem.linkedPlanItems.map(PlannedEventSimple.fromServer);
            return model;
          });
        }
        // result.linkedPlanItems = event.linkedPlanItems.map(PlannedEventSimple.fromServer);
        result.isInNotWorkingHours = event.isInNotWorkingHours;
        result.color = colorMapper(event.idPlanItemStatus);
        result.manufacturedQuantity = event.manufacturedQuantity;
        result.manufactureStartTime = event.manufactureStartTime;
        result.itemTypeShortName = event.itemTypeShortName;
        result.extensionDurationInMinutes = event.extensionDurationInMinutes;
        // result.PARALLEL_SEQUENCE_ALLOWED = event.allowParallelPlan;
        return result;


        // return new PlannedEvent(
        //     event.idPlanItem,
        //     event.idContainer,
        //     event.title,
        //     event.comment,
        //     event.timeStartPreparation,
        //     event.timeEnd,
        //     [...event.containers]);
    }

    static getVirtualLinkedPlanItems(planItem: PlannedEvent): PlannedEvent[] {
      const result = [planItem];
      if (planItem.showParentVirtualPlanItem && planItem.parentLinkedItems && planItem.parentLinkedItems.length > 0) {
        planItem.parentLinkedItems.forEach(element => {

          result.push(PlannedEvent.createVirtualPlanItem(element, planItem));
        });
      }

      return result;
    }

    static createVirtualPlanItem(linkedModel: LinkedItemModel, planItem: PlannedEvent) {
      const virtualItem = new PlannedEvent();
      virtualItem.startDate = linkedModel.startDate;
      virtualItem.timeStartPreparation = linkedModel.startDate;
      virtualItem.endDate = linkedModel.endDate;
      virtualItem.subItemCode = planItem.itemName;
      // virtualItem.subItemName = linkedModel.itemCode;
      virtualItem.title = 'Virtual';
      virtualItem.containerId = planItem.containerId;
      virtualItem.articleCode = 'Virtual';
      virtualItem.articleName = 'Virtual';
      virtualItem.itemCode = linkedModel.itemCode;
      virtualItem.itemName = linkedModel.itemCode;
      virtualItem.idPlanItemStatus = PlanItemStatusEnum.Virtual;
      return virtualItem;
    }


}

export class PlannedEventSimple {
    idPrePlanItem: number;
    code: string;
    name: string;
    timeStartPreparation: Date | null;
    timeEnd: Date | null;
    containerCode: string | null;
    containerId: number | null;
    allowParallelPlan: boolean;
    idPlanItem: number | null;
    idSubItem: number;
    options?: PlanItemCreateRequestOptions;

    static fromServer(data: PlannedEventSimpleServer) {
        const result = new PlannedEventSimple();
        result.code = data.code;
        result.name = data.name;
        result.idPrePlanItem = data.idPrePlanItem;
        result.containerCode = data.containerCode;
        result.timeStartPreparation = data.timeStartPreparation
          ? new Date(data.timeStartPreparation) : null;
        result.timeEnd = data.timeEnd
          ? new Date(data.timeEnd) : null;
        result.allowParallelPlan = data.allowParallelPlan;
        result.containerId = data.containerId;
        result.idPlanItem = data.idPlanItem;
        return result;
    }
}

export enum PlanItemMoveStatusEnum {
    Unchanged = 1,
    Added = 2,
    Removed = 3,
    Moved = 4,
    ExtendedForNotWorkingHours = 5
}

export enum PlanItemStatusEnum {
    Scheduled = 1,
    WaitingForArticles = 2,
    NoArticles = 3,
    ArticlesPrepared = 4,
    Planned = 5,
    Running = 6,
    Finished = 7,
    Canceled = 8,
    Virtual = 99
}

export enum PlanItemProgressEnum {
    Unknown = 1,
    OnTime = 2,
    Late = 3,
    NotFinished = 4
}

export enum LinkedItemRelationEnum {
  Parent = 1,
  Child = 2
}

export class LinkedItemModel {
  idItem: number;
  idItemBatch: number;
  itemCode: string;
  batchNumber: number;
  linkedPlanItems: PlannedEventSimple[];
  startDate: Date;
  endDate: Date;
}

export interface PlanItemSearch {
    planItemName: string;
    planItemCode: string;
    itemName: string;
    articleName: string;
    articleCode: string;
    containerCode: string;
    containerName: string;
    containerId: number;
    timeStartPreparation: Date;
    timeStart: Date;
    timeEnd: Date;
    quantity: number;
    statusName: string;
}

function colorMapper(planItemStatus: PlanItemStatusEnum) {
    switch (planItemStatus) {
        case PlanItemStatusEnum.Running:
            return '#6cb56c';
        case PlanItemStatusEnum.Finished:
            return '#8b8c8c';
        case PlanItemStatusEnum.Canceled:
            return '#d41140';
    }
    return '#337ab7';
}


