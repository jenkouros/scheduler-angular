import { PlannedEventServer, PlannedEventSimpleServer } from '../models/server/plannedevent.servermodel';
import { PreplanItem } from './preplanitem.dto';
import { SubItemContainerServer } from './server/preplanitem.servermodel';
import { SubItemContainer } from './subitem.dto';

export interface ContainerEvents {
    events: PlannedEvent[];
    dateFrom: Date;
    dateTo: Date;
}

export class PlannedEvent {
    id: number;
    idPrePlanItem: number;
    idPlan: number;
    containerId: number;
    idSubItemContainer: number;
    idPlanItemStatus: number;
    quantity: number;
    unitQuantity: string;
    description: string;
    itemCode: string;
    itemName: string;
    subItemCode: string;
    subItemName: string;
    timeStartPreparation: Date;
    startDate: Date;
    endDate: Date;
    title: string;
    containers: SubItemContainer[];
    sequencePlanItems: PlannedEventSimple[];
    isLocked: boolean;
    isPlanned: boolean;
    preplanItem: PreplanItem | null;

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
        title: string, description: string, subItemName: string,
        startDate: Date,
        endDate: Date,
        subItemContainers: SubItemContainer[],
        // preplanItem: PreplanItem | null = null,
        isPlanned: boolean = true
    ) {
        const result = new PlannedEvent();
        result.idPrePlanItem = idPrePlanItem;
        result.containerId = idContainer;
        result.title = title;
        result.subItemName = subItemName;
        result.description = description;
        result.startDate = startDate;
        result.endDate = endDate;
        result.containers = subItemContainers;
        // result.preplanItem = preplanItem;
        result.isPlanned = isPlanned;
        result.isLocked = false;
        return result;
    }

    static fromServer(event: PlannedEventServer): PlannedEvent {
        const result = new PlannedEvent();
        result.id = event.idPlanItem;
        result.idPrePlanItem = event.idPrePlanItem;
        result.idPlan = event.idPlan;
        result.containerId = event.idContainer;
        result.idSubItemContainer = event.idSubItemContainer;
        result.idPlanItemStatus = event.idPlanItemStatus;
        result.quantity = event.quantity;
        result.unitQuantity = event.unitQuantity;
        result.description = event.comment;
        result.itemCode = event.itemCode;
        result.itemName = event.itemName;
        result.subItemCode = event.subItemCode;
        result.subItemName = event.subItemName;
        result.timeStartPreparation = event.timeStartPreparation;
        result.startDate = event.timeStart;
        result.endDate = event.timeEnd;
        result.title = event.title;
        result.containers = event.allowedContainers.map(SubItemContainer.fromServer);
        result.isPlanned = true;
        result.isLocked = event.isLocked;
        result.sequencePlanItems = event.sequencePlanItems.map(PlannedEventSimple.fromServer);

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

export interface PlanItemsLoadRequest {
    fromDate: Date;
    toDate: Date;
    containerIds: number[];
}


