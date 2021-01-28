import { ContainerServer } from './container.servermodel';
import { MeasurementUnitServer, ProductServer } from './shared.servermodel';

export interface ItemServer {
    idItem: number;
    code: string;
    name: string;
    quantity: number; // celotna kolicina
    quantityBatch: number; // kolicina sarze
    // quantityPlanned: number; // ze planirana kolicina
    itemProgresses: ItemProgressServer[];
    measurementUnit: MeasurementUnitServer;
    article: ProductServer;
    limitDateFrom: Date;
    limitDateTo: Date;
    importDate: Date;
    fillingItems: string[];
    connectedOrders: { code: string, articleCode: string }[];
    itemStatusLog: ItemStatusLog;
    // planItemStatuses: PlanItemStatusServer[];
}

// export interface PlanItemStatusServer {
//     idPreplanItem: number;
//     idPlanItem: number;
//     name: string;
//     idStatus: number;
//     sequenceNumber: number;
// }

export interface ItemStatusLog {
  planItemName: string;
  idPlanItemStatus: number;
}

export interface ItemProgressServer {
    idPlan: number;
    quantityPlanned: number;
}

export interface ItemBasicServer {
  code: string;
  id: number;
}

export interface ItemHierarchyServer {
    id: number;
    code: string;
    alternatives: ItemHierarchyAlternativeServer[];
    quantity: number;
    quantityBatch: number;
    measurementUnit: MeasurementUnitServer;
}

export interface ItemHierarchyAlternativeServer {
    id: number;
    name: string;
    code: string;
    subItems: SubItemServer[];
}

export interface SubItemServer {
    id: number;
    name: string;
    code: string;
    defaultExecutionNormativeInMinutes: number;
    defaultPreparationtNormativeInMinutes: number;
    // normativeTimeWorker: number;
    sequenceNumber: number;
    isPlanable: boolean;
    defaultQuantity: number;
    containers: ContainerServer[];
}

export interface PlanItemFilterServer {
    id: number;
    values: string[];
}
