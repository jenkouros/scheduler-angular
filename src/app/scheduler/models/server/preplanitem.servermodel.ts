import { ContainerServer } from './container.servermodel';

export interface PreplanitemServer {
    idPrePlanItem: number;
    quantity: number;
    containers: SubItemContainerServer[];
    item: PreplanitemBasicServer;
}

export interface PreplanitemBasicServer {
    id: number;
    code: string;
    name: string;
    limitDateFrom: Date;
    limitDateTo: Date;
}

export interface SubItemContainerServer {
    idSubItemContainer: number;
    container: ContainerServer;
    isDefault: boolean;
    quantity: number;
    executionNormative: number;
    preparationNormative: number;
}
