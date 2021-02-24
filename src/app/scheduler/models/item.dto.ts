import { Container } from './container.dto';
import { ItemHierarchyAlternativeServer, ItemHierarchyServer, ItemProgressServer, ItemServer, SubItemServer } from './server/item.servermodel';
import { MeasurementUnit, Product } from './shared.dto';


export class Item {
    idItem: number;
    code: string;
    name: string;
    quantity: number; // celotna kolicina
    // quantityBatch: number; // kolicina sarze
    // quantityPlanned: number; ze planirana kolicina
    itemProgresses: ItemProgress[];
    measurementUnit: MeasurementUnit;
    article: Product;
    limitDateFrom: Date;
    limitDateTo: Date;
    importDate: Date;
    connectedOrders: { code: string, articleCode: string }[];
    // planItemStatuses: PlanItemStatus[];
    itemStatusLog: ItemStatusLog;
    static fromServer(planItemServer: ItemServer) {
      const result = new Item();
      result.connectedOrders = planItemServer.connectedOrders;
      result.code = planItemServer.code;
      result.name = planItemServer.name;
      result.idItem = planItemServer.idItem;
      result.quantity = planItemServer.quantity;
      // result.quantityBatch = planItemServer.quantityBatch;
      // result.quantityPlanned = planItemServer.quantityPlanned;
      result.itemProgresses = planItemServer.itemProgresses.map(ItemProgress.fromServer);
      result.measurementUnit = MeasurementUnit.fromServer(planItemServer.measurementUnit);
      result.article = Product.fromServer(planItemServer.article);
      // result.planItemStatuses = planItemServer.planItemStatuses
      //   ? planItemServer.planItemStatuses.map(PlanItemStatus.fromServer)
      //   : [];
      result.limitDateFrom = planItemServer.limitDateFrom;
      result.limitDateTo = planItemServer.limitDateTo;
      result.importDate = planItemServer.importDate;
      if (planItemServer.itemStatusLog) {
        const status = new ItemStatusLog();
        status.idPlanItemStatus = planItemServer.itemStatusLog.idPlanItemStatus;
        status.planItemName = planItemServer.itemStatusLog.planItemName;
        result.itemStatusLog = status;
      }
      return result;
    }
}

export class ItemProgress {
  idPlan: number;
  quantityPlanned: number;
  static fromServer(serverData: ItemProgressServer) {
    const result = new ItemProgress();
    result.idPlan = serverData.idPlan;
    result.quantityPlanned = serverData.quantityPlanned;
    return result;
  }
}

export class ItemStatusLog {
  planItemName: string;
  idPlanItemStatus: number;
}

// export class PlanItemStatus {
//   idPreplanItem: number;
//   idPlanItem: number;
//   name: string;
//   idStatus: number;
//   sequenceNumber: number;
//   static fromServer(serverData: PlanItemStatusServer) {
//     const result = new PlanItemStatus();
//     result.idPreplanItem = serverData.idPreplanItem;
//     result.idPlanItem = serverData.idPlanItem;
//     result.name = serverData.name;
//     result.idStatus = serverData.idStatus;
//     result.sequenceNumber = serverData.sequenceNumber;
//     return result;
//   }
// }

export class ItemHierarchy {
    idPlanItem: number;
    codePlanItem: string;
    alternatives: ItemHierarchyAlternative[];
    quantity: number;
    quantityBatch: number;
    measurementUnit: MeasurementUnit;

    static fromServer(serverData: ItemHierarchyServer) {
        const result = new ItemHierarchy();
        result.idPlanItem = serverData.id;
        result.codePlanItem = serverData.code;
        result.alternatives = serverData.alternatives.map(a => ItemHierarchyAlternative.fromServer(a));
        result.quantity = serverData.quantity;
        result.quantityBatch = serverData.quantityBatch;
        result.measurementUnit = MeasurementUnit.fromServer(serverData.measurementUnit);
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
    plannable: boolean;
    quantity: number;
    containers: Container[] | null;

    static fromServer(planSubItemServer: SubItemServer) {
        const result = new SubItem();
        result.id = planSubItemServer.id;
        result.name = planSubItemServer.name;
        result.code = planSubItemServer.code;
        result.normativeTimeMachine = planSubItemServer.defaultExecutionNormativeInMinutes;
        result.normativeTimePreparation = planSubItemServer.defaultPreparationtNormativeInMinutes;
        // result.normativeTimeWorker = planSubItemServer.normativeTimeWorker;
        result.sequence = planSubItemServer.sequenceNumber;
        result.plannable = planSubItemServer.isPlanable;
        result.quantity = planSubItemServer.defaultQuantity;
        result.containers = planSubItemServer.containers ? planSubItemServer.containers.map(Container.fromServer) : null;
        return result;
    }
}
