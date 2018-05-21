import { ItemBatchServer } from './server/itembatch.servermodel';

export class ItemBatch {
    idItemBatch: number;
    quantity: number;
    batchNumber: number;

    static fromServer(serverData: ItemBatchServer) {
        const result = new ItemBatch();
        result.batchNumber = serverData.batchNumber;
        result.idItemBatch = serverData.idItemBatch;
        result.quantity = serverData.quantity;
        return result;
    }
}
