import { ProductServer, MeasurementUnitServer } from './shared.servermodel';
import { SubItemContainerServer } from './preplanitem.servermodel';

export interface ItemServer {
    idItem: number;
    code: string;
    name: string;
    quantity: number; // celotna kolicina
    quantityBatch: number; // kolicina sarze
    quantityPlanned: number; // ze planirana kolicina
    measurementUnit: MeasurementUnitServer;
    article: ProductServer;
    limitDateFrom: Date;
    limitDateTo: Date;
}

export interface ItemHierarchyServer {
    id: number;
    code: string;
    alternatives: ItemHierarchyAlternativeServer[];
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
}

export interface PlanItemFilterServer {
    id: number;
    values: string[];
}
