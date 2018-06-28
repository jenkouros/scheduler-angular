import { ContainerServer } from './server/container.servermodel';

export class Container {
    id: number;
    code: string;
    name: string;
    get displayExpression() {
        return `${this.code} ${this.name}`;
    }

    static fromServer(containerServer: ContainerServer): Container {
        const result = new Container();
        result.name = containerServer.name;
        result.id = containerServer.idContainer;
        result.code = containerServer.code;

        return result;
    }
}
