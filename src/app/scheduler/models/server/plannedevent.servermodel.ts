import { SubItemContainerServer } from './preplanitem.servermodel';
import { PlanScheduleServer } from './planschedule.servermodel';


export interface PlanItemResponseServer {
    planItems: PlannedEventServer [];
    notWorkingHoursEvents: PlanScheduleServer[];
}

export interface PlannedEventServer {
    idPlanItem: number;
    idPrePlanItem: number;
    idPlan: number;
    idItemBatch: number;
    idContainer: number;
    idSubItemContainer: number;
    idPlanItemStatus: number;
    quantity: number;
    unitQuantity: string;
    manufacturedQuantity: number;
    manufactureStartTime: Date;
    comment: string;
    itemCode: string;
    itemName: string;
    articleCode: string;
    articleName: string;
    subItemCode: string;
    subItemName: string;
    timeStartPreparation: Date;
    timeStart: Date;
    timeEnd: Date;
    title: string;
    isLocked: boolean;
    isInNotWorkingHours: boolean;
    allowedContainers: SubItemContainerServer[];
    sequencePlanItems: PlannedEventSimpleServer[];
    linkedPlanItems: PlannedEventSimpleServer[];
    itemTypeShortName: string | null;
    extensionDurationMin: number | null;
}

export interface PlannedEventSimpleServer {
    idPrePlanItem: number;
    code: string;
    name: string;
    timeStartPreparation: Date | null;
    timeEnd: Date | null;
    containerCode: string | null;
}
