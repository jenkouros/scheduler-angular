import { PlannedEventServer, PlannedEventSimpleServer, PlanItemResponseServer } from '../models/server/plannedevent.servermodel';
import { PreplanItem } from './preplanitem.dto';
import { SubItemContainerServer } from './server/preplanitem.servermodel';
import { SubItemContainer } from './subitem.dto';
import { PlanSchedule } from './planschedule.dto';

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
    fixPlanItem?: boolean;
    planItemMoveStatus: PlanItemMoveStatusEnum;
}

export interface PlanItemCreateRequest {
    idPrePlanItem: number;
    idContainer: number;
    timePreparationStart: Date | string;
    timeExecutionStart: Date | string;
    timeExecutionEnd: Date | string;
    comment?: string;
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
    id: number;
    idPrePlanItem: number;
    idPlan: number;
    idItemBatch: number;
    containerId: number;
    idSubItemContainer: number;
    idPlanItemStatus: number;
    quantity: number;
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
    isLocked: boolean;
    isInNotWorkingHours: boolean;
    isPlanned: boolean;
    preplanItem: PreplanItem | null;
    startDate: Date;
    endDate: Date;

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
                lastEnd = planItem.timeEnd;
            }
        }
        return false;
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
        result.timeStartPreparation = event.timeStartPreparation;
        result.timeStartExecution = event.timeStart;
        result.timeEndExecution = event.timeEnd;
        result.title = event.title;
        result.containers = event.allowedContainers.map(SubItemContainer.fromServer);
        result.isPlanned = true;
        result.isLocked = event.isLocked;
        result.sequencePlanItems = event.sequencePlanItems.map(PlannedEventSimple.fromServer);
        result.isInNotWorkingHours = event.isInNotWorkingHours;

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



