import { SubItemContainerServer } from './preplanitem.servermodel';

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
    comment: string;
    itemCode: string;
    itemName: string;
    subItemCode: string;
    subItemName: string;
    timeStartPreparation: Date;
    timeStart: Date;
    timeEnd: Date;
    title: string;
    isLocked: boolean;
    allowedContainers: SubItemContainerServer[];
    sequencePlanItems: PlannedEventSimpleServer[];
}

export interface PlannedEventSimpleServer {
    idPrePlanItem: number;
    code: string;
    name: string;
    timeStartPreparation: Date | null;
    timeEnd: Date | null;
    containerCode: string | null;
}
