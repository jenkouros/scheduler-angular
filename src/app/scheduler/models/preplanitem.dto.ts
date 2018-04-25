import { Container } from './container.dto';
import { PreplanitemServer, PreplanitemBasicServer, SubItemContainerServer } from './server/preplanitem.servermodel';

export class PreplanItemRequest {
    idAlternative: number;
    batchCount: number;
    batchQuantity: number;
}

export class PreplanItem {
    id: number;
    quantity: number;
    containers: SubItemContainer[];
    item: PreplanItemBasicData;

    static fromServer(serverData: PreplanitemServer) {
        const result = new PreplanItem();
        result.id = serverData.idPrePlanItem;
        result.quantity = serverData.quantity;
        result.item = PreplanItemBasicData.fromServer(serverData.item);
        result.containers = serverData.containers.map(c => SubItemContainer.fromServer(c));
        return result;
    }
}

export class PreplanItemBasicData {
    id: number;
    code: string;
    name: string;
    limitDateFrom: Date;
    limitDateTo: Date;

    static fromServer(serverData: PreplanitemBasicServer) {
        const result = new this();
        result.code = serverData.code;
        result.id = serverData.id;
        result.name = serverData.name;
        result.limitDateFrom = serverData.limitDateFrom;
        result.limitDateTo = serverData.limitDateTo;
        return result;
    }
}

export class SubItemContainer {
    idSubItemContainer: number;
    container: Container;
    isDefault: boolean;
    quantity: number;
    executionNormative: number;
    preparationNormative: number;

    static fromServer(serverData: SubItemContainerServer) {
        const result = new this();
        result.idSubItemContainer = serverData.idSubItemContainer;
        result.container = Container.fromServer(serverData.container);
        result.isDefault = serverData.isDefault;
        result.quantity = serverData.quantity;
        result.executionNormative = serverData.executionNormative;
        result.preparationNormative = serverData.preparationNormative;
        return result;
    }
}
