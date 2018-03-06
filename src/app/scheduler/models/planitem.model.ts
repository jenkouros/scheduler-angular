import { Product, MeasurementUnit } from "./shared.model";

export interface PlanItem {
    id: number;
    code: string;
    quantity: number; // celotna kolicina
    quantityBatch: number; // kolicina sarze
    quantityPlanned: number; // ze planirana kolicina
    measurementUnit: MeasurementUnit;
    filters: { [id: number]: PlanItemFilter }[];
    product: Product;
    limitDateFrom: Date;
    limitDateTo: Date;
    planSubItems: { [alternativeId: number]: PlanSubItem[] }[];
}

export interface PlanSubItem extends PlanItem {
    normativeTimeMachine: number;
    normativeTimePreparation: number;
    normativeTimeWorker: number;
    sequence: number;
    planable: boolean;
}

export interface PlanItemFilter {
    id: number;
    values: string[];
}