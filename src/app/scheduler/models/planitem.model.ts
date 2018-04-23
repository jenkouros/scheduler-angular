import { Product, MeasurementUnit } from './shared.model';

export interface PlanItem {
    idPlanItem: number;
    code: string;
    quantity: number; // celotna kolicina
    quantityBatch: number; // kolicina sarze
    quantityPlanned: number; // ze planirana kolicina
    measurementUnit: MeasurementUnit;
    product: Product;
    limitDateFrom: Date;
    limitDateTo: Date;
    // planSubItems: { [alternativeId: number]: PlanSubItem[] }[];
}

export interface PlanItemHierarchy {
    idPlanItem: number;
    alternatives: PlanItemHierarchyAlternative[];
}

export interface PlanItemHierarchyAlternative {
    id: number;
    name: string;
    code: string;
    planSubItems: PlanSubItem[];
}

export interface PlanSubItem {
    name: string;
    code: string;
    normativeTimeMachine: number;
    normativeTimePreparation: number;
    normativeTimeWorker: number;
    sequence: number;
    planable: boolean;
    quantity: number;
}

export interface PlanItemFilter {
    id: number;
    values: string[];
}
