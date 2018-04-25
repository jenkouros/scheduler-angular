import { ContainerServer } from './server/container.servermodel';

export class Container implements ContainerServer {
    id: number;
    code: string;
    name: string;

    static fromServer(containerServer: ContainerServer) {
        const result = new Container();
        result.name = containerServer.name;
        result.id = containerServer.id;
        result.code = containerServer.code;
        return result;
    }
}
