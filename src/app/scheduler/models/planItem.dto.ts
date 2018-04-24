import {
    PlanItemHierarchyServer,
    PlanItemServer,
    PlanSubItemServer,
    PlanItemHierarchyAlternativeServer } from './server/planitem.servermodel';
import { MeasurementUnit, Product } from './shared.dto';


export class PlanItem implements PlanItemServer {
    idPlanItem: number;
    code: string;
    quantity: number; // celotna kolicina
    quantityBatch: number; // kolicina sarze
    quantityPlanned: number; // ze planirana kolicina
    measurementUnit: MeasurementUnit;
    product: Product;
    limitDateFrom: Date;
    limitDateTo: Date;

    static fromServer(planItemServer: PlanItemServer) {
        const result = new PlanItem();
        result.code = planItemServer.code;
        result.idPlanItem = planItemServer.idPlanItem;
        result.quantity = planItemServer.quantity;
        result.quantityBatch = planItemServer.quantityBatch;
        result.quantityPlanned = planItemServer.quantityPlanned;
        result.measurementUnit = MeasurementUnit.fromServer(planItemServer.measurementUnit);
        result.product = Product.fromServer(planItemServer.product);
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
        result.idPlanItem = serverData.idPlanItem;
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
        result.planSubItems = serverData.planSubItems.map(i => PlanSubItem.fromServer(i));
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
        result.normativeTimeMachine = planSubItemServer.normativeTimeMachine;
        result.normativeTimePreparation = planSubItemServer.normativeTimePreparation;
        result.normativeTimeWorker = planSubItemServer.normativeTimeWorker;
        result.sequence = planSubItemServer.sequence;
        result.planable = planSubItemServer.planable;
        result.quantity = planSubItemServer.quantity;
        return result;
    }
}
