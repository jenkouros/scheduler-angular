import { FilterServer, FilterValueServer } from './server/filter.servermodel';

export class Filter implements FilterServer {
    sequence: number;
    name: string;
    id: number;
    type: string;
    values: FilterValue[];

    static fromServer(filterServer: FilterServer) {
        const result = new Filter();
        result.id = filterServer.id;
        result.name = filterServer.name;
        result.sequence = filterServer.sequence;
        result.type = filterServer.type;
        if (filterServer.values) {
            result.values = filterServer.values.map(v =>
                FilterValue.create(v.id, v.name));
        }
        return result;
    }


}

export class FilterValue implements FilterValueServer {
    id: number;
    name: string;

    static create (id: number, name: string) {
        const result = new FilterValue();
        result.name = name;
        result.id = id;
        return result;
    }
}
