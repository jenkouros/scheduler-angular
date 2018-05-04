import { Container } from './container.dto';
import { PreplanitemServer, PreplanitemBasicServer, SubItemContainerServer } from './server/preplanitem.servermodel';
import { MeasurementUnit, Product } from './shared.dto';
import { PlanSubItem } from './planitem.dto';

export class PreplanItemRequest {
    idAlternative: number;
    batchCount: number;
    batchQuantity: number;
}

export class PreplanItem {
    id: number;
    quantity: number;
    unit: MeasurementUnit;
    containers: SubItemContainer[];
    item: PreplanItemBasicData;
    subItem: PlanSubItem;

    static fromServer(serverData: PreplanitemServer) {
        const result = new PreplanItem();
        result.id = serverData.idPrePlanItem;
        result.quantity = serverData.quantity;
        result.unit = MeasurementUnit.fromServer(serverData.unit);
        result.item = PreplanItemBasicData.fromServer(serverData.item);
        result.containers = serverData.containers.map(c => SubItemContainer.fromServer(c));
        result.subItem = PlanSubItem.fromServer(serverData.subItem);
        return result;
    }
}

export class PreplanItemBasicData {
    id: number;
    code: string;
    name: string;
    limitDateFrom: Date;
    limitDateTo: Date;
    product: Product;

    static fromServer(serverData: PreplanitemBasicServer) {
        const result = new this();
        result.code = serverData.code;
        result.id = serverData.id;
        result.name = serverData.name;
        result.limitDateFrom = serverData.limitDateFrom;
        result.limitDateTo = serverData.limitDateTo;
        result.product = Product.fromServer(serverData.product);
        return result;
    }
}

export class SubItemContainer {
    idSubItemContainer: number;
    container: Container;
    isDefault: boolean;
    quantity: number;
    unitQuantity: string;
    executionNormative: number;
    unitExecutionNormative: string;
    preparationNormative: number;
    unitPreparationNormative: string;

    static fromServer(serverData: SubItemContainerServer) {
        const result = new this();
        result.idSubItemContainer = serverData.idSubItemContainer;
        result.container = Container.fromServer(serverData.container);
        result.isDefault = serverData.isDefault;
        result.quantity = serverData.quantity;
        result.unitQuantity = serverData.unitQuantity;
        result.executionNormative = serverData.executionNormative;
        result.unitExecutionNormative = serverData.unitExecutionNormative;
        result.preparationNormative = serverData.preparationNormative;
        result.unitPreparationNormative = serverData.unitPreparationNormative;
        return result;
    }
}
