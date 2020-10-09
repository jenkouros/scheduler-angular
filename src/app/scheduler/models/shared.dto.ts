import { ProductServer, MeasurementUnitServer } from './server/shared.servermodel';

export class Product implements ProductServer {
    id: number;
    code: string;
    name: string;

    static fromServer(productServer: ProductServer) {
        const result = new Product();
        result.id = productServer.id;
        result.code = productServer.code;
        result.name = productServer.name;
        return result;
    }
}

export class MeasurementUnit implements MeasurementUnitServer {
    name: string;
    code: string;

    static fromServer(measurementUnitServer: MeasurementUnitServer) {
        const result = new MeasurementUnit();
        result.code = measurementUnitServer.code;
        result.name = measurementUnitServer.name;
        return result;
    }
}

export interface GridStoreConfiguration {
    loadUrl: string;
    loadParams?: Object;
    key?: string;
    reloadDate?: Date;
    errorHandler?: any;
}
