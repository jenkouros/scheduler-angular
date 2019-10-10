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
}

export interface PlanItemCreateRequest {
    idPrePlanItem: number;
    idContainer: number;
    timePreparationStart: Date | string;
    timeExecutionStart: Date | string;
    timeExecutionEnd: Date | string;
    comment?: string;
    options?: PlanItemCreateRequestOptions;
}

export interface PlanItemCreateRequestOptions {
    enablePlanningOnAllWorkplaces?: boolean;
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
        result.planItems = serverData.planItems.map(PlannedEvent.fromServer);
        result.notWorkingHoursEvents = serverData.notWorkingHoursEvents.map(PlanSchedule.fromServer);
        return result;
    }
}

export class PlannedEvent {
    PARALLEL_SEQUENCE_ALLOWED = environment.parallelOperations;
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
    linkedPlanItems: PlannedEventSimple[];
    isLocked: boolean;
    isInNotWorkingHours: boolean;
    isPlanned: boolean;
    preplanItem: PreplanItem | null;
    startDate: Date;
    endDate: Date;
    itemTypeShortName: string | null;
    extensionDurationInMinutes: number | null;

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
                lastEnd = this.PARALLEL_SEQUENCE_ALLOWED
                    ? planItem.timeStartPreparation
                    : planItem.timeEnd;
            }
        }
        return false;
    }


    // SETTINGS !!!! planItem.timeStartPreparation or planItem.timeEnd
    get linkedItemSequenceWarning(): boolean {
        if (!this.linkedPlanItems || this.linkedPlanItems.length < 1) {
            return false;
        }
        const childItem = this.linkedPlanItems[this.linkedPlanItems.length - 1];
        const parentItem = this.sequencePlanItems[0];
        if (!childItem.timeEnd || !parentItem.timeStartPreparation) {
            return false;
        }
        return new Date(childItem.timeEnd).getTime() > new Date(parentItem.timeStartPreparation).getTime();
    }

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
        isPlanned: boolean = true
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
        result.itemCode = event.itemCode;
        result.itemName = event.itemName;
        result.articleCode = event.articleCode;
        result.articleName = event.articleName;
        result.subItemCode = event.subItemCode;
        result.subItemName = event.subItemName;
        result.timeStartPreparation = new Date(event.timeStartPreparation);
        result.timeStartExecution = new Date(event.timeStart);
        result.timeEndExecution = new Date(event.timeEnd);
        result.title = event.title;
        result.containers = event.allowedContainers.map(SubItemContainer.fromServer);
        result.isPlanned = true;
        result.isLocked = event.isLocked;
        result.sequencePlanItems = event.sequencePlanItems.map(PlannedEventSimple.fromServer);
        result.linkedPlanItems = event.linkedPlanItems.map(PlannedEventSimple.fromServer);
        result.isInNotWorkingHours = event.isInNotWorkingHours;
        result.color = colorMapper(event.idPlanItemStatus);
        result.manufacturedQuantity = event.manufacturedQuantity;
        result.manufactureStartTime = event.manufactureStartTime;
        result.itemTypeShortName = event.itemTypeShortName;
        result.extensionDurationInMinutes = event.extensionDurationInMinutes;
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
}

export class PlannedEventSimple {
    idPrePlanItem: number;
    code: string;
    name: string;
    timeStartPreparation: Date | null;
    timeEnd: Date | null;
    containerCode: string | null;

    static fromServer(data: PlannedEventSimpleServer) {
        const result = new PlannedEventSimple();
        result.code = data.code;
        result.name = data.name;
        result.idPrePlanItem = data.idPrePlanItem;
        result.containerCode = data.containerCode;
        result.timeStartPreparation = data.timeStartPreparation;
        result.timeEnd = data.timeEnd;
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
    Canceled = 8
}

export enum PlanItemProgressEnum {
    Unknown = 1,
    OnTime = 2,
    Late = 3,
    NotFinished = 4
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


