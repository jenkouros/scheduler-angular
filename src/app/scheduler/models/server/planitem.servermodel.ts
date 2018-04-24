import { ProductServer, MeasurementUnitServer } from './shared.servermodel';

export interface PlanItemServer {
    idPlanItem: number;
    code: string;
    quantity: number; // celotna kolicina
    quantityBatch: number; // kolicina sarze
    quantityPlanned: number; // ze planirana kolicina
    measurementUnit: MeasurementUnitServer;
    product: ProductServer;
    limitDateFrom: Date;
    limitDateTo: Date;
}

export interface PlanItemHierarchyServer {
    idPlanItem: number;
    alternatives: PlanItemHierarchyAlternativeServer[];
}

export interface PlanItemHierarchyAlternativeServer {
    id: number;
    name: string;
    code: string;
    planSubItems: PlanSubItemServer[];
}

export interface PlanSubItemServer {
    name: string;
    code: string;
    normativeTimeMachine: number;
    normativeTimePreparation: number;
    normativeTimeWorker: number;
    sequence: number;
    planable: boolean;
    quantity: number;
}

export interface PlanItemFilterServer {
    id: number;
    values: string[];
}
