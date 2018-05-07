import { SubItemContainerServer } from './preplanitem.servermodel';

export interface PlannedEventServer {
    idPlanItem: number;
    idContainer: number;
    title: string;
    comment: string;
    timeStartPreparation: Date;
    timeEnd: Date;
    containers: SubItemContainerServer[];
}
