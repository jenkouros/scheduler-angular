import {
    PlanItemHierarchyServer,
    PlanItemServer,
    PlanSubItemServer,
    PlanItemHierarchyAlternativeServer } from './server/planitem.servermodel';
import { MeasurementUnit, Product } from './shared.dto';


export class PlanItem implements PlanItemServer {
    idItem: number;
    code: string;
    quantity: number; // celotna kolicina
    quantityBatch: number; // kolicina sarze
    quantityPlanned: number; // ze planirana kolicina
    measurementUnit: MeasurementUnit;
    article: Product;
    limitDateFrom: Date;
    limitDateTo: Date;

    static fromServer(planItemServer: PlanItemServer) {
        const result = new PlanItem();
        result.code = planItemServer.code;
        result.idItem = planItemServer.idItem;
        result.quantity = planItemServer.quantity;
        result.quantityBatch = planItemServer.quantityBatch;
        result.quantityPlanned = planItemServer.quantityPlanned;
        result.measurementUnit = MeasurementUnit.fromServer(planItemServer.measurementUnit);
        result.article = Product.fromServer(planItemServer.article);
        result.limitDateFrom = planItemServer.limitDateFrom;
        result.limitDateTo = planItemServer.limitDateTo;
        return result;
    }
}

export class PlanItemHierarchy {
    idPlanItem: number;
    alternatives: PlanItemHierarchyAlternative[];

    static fromServer(serverData: PlanItemHierarchyServer) {
        const result = new PlanItemHierarchy();
        result.idPlanItem = serverData.id;
        result.alternatives = serverData.alternatives.map(a => PlanItemHierarchyAlternative.fromServer(a));
        return result;
    }
}

export class PlanItemHierarchyAlternative {
    id: number;
    name: string;
    code: string;
    planSubItems: PlanSubItem[];

    static fromServer(serverData: PlanItemHierarchyAlternativeServer) {
        const result = new PlanItemHierarchyAlternative();
        result.id = serverData.id;
        result.name = serverData.name;
        result.code = serverData.code;
        result.planSubItems = serverData.subItems.map(i => PlanSubItem.fromServer(i));
        return result;
    }
}

export class PlanSubItem {
    name: string;
    code: string;
    normativeTimeMachine: number;
    normativeTimePreparation: number;
    normativeTimeWorker: number;
    sequence: number;
    planable: boolean;
    quantity: number;

    static fromServer(planSubItemServer: PlanSubItemServer) {
        const result = new PlanSubItem();
        result.name = planSubItemServer.name;
        result.code = planSubItemServer.code;
        result.normativeTimeMachine = planSubItemServer.defaultExecutionNormative;
        result.normativeTimePreparation = planSubItemServer.defaultPreparationtNormative;
        // result.normativeTimeWorker = planSubItemServer.normativeTimeWorker;
        result.sequence = planSubItemServer.sequenceNumber;
        result.planable = planSubItemServer.isPlanable;
        result.quantity = planSubItemServer.defaultQuantity;
        return result;
    }
}
