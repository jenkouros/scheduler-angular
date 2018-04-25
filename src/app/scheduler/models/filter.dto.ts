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
        result.values = filterServer.values.map(v =>
            new FilterValue(v.id, v.name));
        return result;
    }


}

export class FilterValue implements FilterValueServer {
    constructor(
        public id: number,
        public name: string) {}
}
