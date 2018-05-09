import { SubItemContainerServer } from './preplanitem.servermodel';

export interface PlannedEventServer {
    idPlanItem: number;
    idContainer: number;
    title: string;
    subItemCode: string;
    subItemName: string;
    comment: string;
    timeStartPreparation: Date;
    timeEnd: Date;
    allowedContainers: SubItemContainerServer[];
}
