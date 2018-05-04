import { ContainerServer } from './container.servermodel';
import { MeasurementUnitServer, ProductServer } from './shared.servermodel';
import { PlanSubItemServer } from './planitem.servermodel';

export interface PreplanitemServer {
    idPrePlanItem: number;
    quantity: number;
    unit: MeasurementUnitServer;
    containers: SubItemContainerServer[];
    item: PreplanitemBasicServer;
    subItem: PlanSubItemServer;
}

export interface PreplanitemBasicServer {
    id: number;
    code: string;
    name: string;
    limitDateFrom: Date;
    limitDateTo: Date;
    product: ProductServer;
}

export interface SubItemContainerServer {
    idSubItemContainer: number;
    container: ContainerServer;
    isDefault: boolean;
    quantity: number;
    unitQuantity: string;
    executionNormative: number;
    unitExecutionNormative: string;
    preparationNormative: number;
    unitPreparationNormative: string;
}
