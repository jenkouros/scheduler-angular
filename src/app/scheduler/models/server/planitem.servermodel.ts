import { ProductServer, MeasurementUnitServer } from './shared.servermodel';

export interface PlanItemServer {
    idItem: number;
    code: string;
    quantity: number; // celotna kolicina
    quantityBatch: number; // kolicina sarze
    quantityPlanned: number; // ze planirana kolicina
    measurementUnit: MeasurementUnitServer;
    article: ProductServer;
    limitDateFrom: Date;
    limitDateTo: Date;
}

export interface PlanItemHierarchyServer {
    id: number;
    code: string;
    alternatives: PlanItemHierarchyAlternativeServer[];
}

export interface PlanItemHierarchyAlternativeServer {
    id: number;
    name: string;
    code: string;
    subItems: PlanSubItemServer[];
}

export interface PlanSubItemServer {
    id: number;
    name: string;
    code: string;
    defaultExecutionNormative: number;
    defaultPreparationtNormative: number;
    // normativeTimeWorker: number;
    sequenceNumber: number;
    isPlanable: boolean;
    defaultQuantity: number;
}

export interface PlanItemFilterServer {
    id: number;
    values: string[];
}
