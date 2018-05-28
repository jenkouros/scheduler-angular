import { Container } from './container.dto';
import { PreplanitemServer, PreplanitemBasicServer, SubItemContainerServer } from './server/preplanitem.servermodel';
import { MeasurementUnit, Product } from './shared.dto';
import { SubItem } from './item.dto';
import { SubItemContainer } from './subitem.dto';
import { ItemBatch } from './itembatch.dto';

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
    subItem: SubItem;
    itemBatch: ItemBatch;

    static fromServer(serverData: PreplanitemServer) {
        const result = new PreplanItem();
        result.id = serverData.idPrePlanItem;
        result.quantity = serverData.quantity;
        result.unit = MeasurementUnit.fromServer(serverData.unit);
        result.item = PreplanItemBasicData.fromServer(serverData.item);
        result.containers = serverData.containers.map(c => SubItemContainer.fromServer(c));
        result.subItem = SubItem.fromServer(serverData.subItem);
        result.itemBatch = ItemBatch.fromServer(serverData.itemBatch);
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

