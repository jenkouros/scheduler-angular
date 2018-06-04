import {
    ItemHierarchyServer,
    ItemServer,
    SubItemServer,
    ItemHierarchyAlternativeServer } from './server/item.servermodel';
import { MeasurementUnit, Product } from './shared.dto';
import { SubItemContainer } from './subitem.dto';


export class Item {
    idItem: number;
    code: string;
    name: string;
    quantity: number; // celotna kolicina
    quantityBatch: number; // kolicina sarze
    quantityPlanned: number; // ze planirana kolicina
    measurementUnit: MeasurementUnit;
    article: Product;
    limitDateFrom: Date;
    limitDateTo: Date;

    static fromServer(planItemServer: ItemServer) {
        const result = new Item();
        result.code = planItemServer.code;
        result.name = planItemServer.name;
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

export class ItemHierarchy {
    idPlanItem: number;
    codePlanItem: string;
    alternatives: ItemHierarchyAlternative[];

    static fromServer(serverData: ItemHierarchyServer) {
        const result = new ItemHierarchy();
        result.idPlanItem = serverData.id;
        result.codePlanItem = serverData.code;
        result.alternatives = serverData.alternatives.map(a => ItemHierarchyAlternative.fromServer(a));
        return result;
    }
}

export class ItemHierarchyAlternative {
    id: number;
    name: string;
    code: string;
    planSubItems: SubItem[];

    static fromServer(serverData: ItemHierarchyAlternativeServer) {
        const result = new ItemHierarchyAlternative();
        result.id = serverData.id;
        result.name = serverData.name;
        result.code = serverData.code;
        result.planSubItems = serverData.subItems.map(i => SubItem.fromServer(i));
        return result;
    }
}

export class SubItem {
    id: number;
    name: string;
    code: string;
    normativeTimeMachine: number;
    normativeTimePreparation: number;
    normativeTimeWorker: number;
    sequence: number;
    planable: boolean;
    quantity: number;

    static fromServer(planSubItemServer: SubItemServer) {
        const result = new SubItem();
        result.id = planSubItemServer.id;
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
