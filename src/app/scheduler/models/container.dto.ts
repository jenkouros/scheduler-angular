import { ContainerServer, ContainerStatusServer } from './server/container.servermodel';

export class ContainerSettings {
  allowParalellWorkWithinContainer: boolean;
  allowParalellWorkWithinItem: boolean;
}

export class ContainerStatus {
  idContainerStatus: number;
  code: string;
  name: string;
  color: string;

  static fromServer(server: ContainerStatusServer): ContainerStatus {
    const result = new ContainerStatus();
    result.idContainerStatus = server.idContainerStatus;
    result.name = server.name;
    result.code = server.code;
    result.color = server.color;

    return result;
  }
}

export class Container {
    id: number;
    comment: string;
    idContainerStatus: number;
    code: string;
    name: string;
    containerSettings: ContainerSettings;
    get displayExpression() {
        return `${this.code} ${this.name}`;
    }

    static fromServer(containerServer: ContainerServer): Container {
        const result = new Container();
        result.name = containerServer.name;
        result.id = containerServer.idContainer;
        result.code = containerServer.code;
        result.comment = containerServer.comment;
        result.idContainerStatus = containerServer.idContainerStatus;
        if (containerServer.settings) {
          result.containerSettings = new ContainerSettings();
          result.containerSettings.allowParalellWorkWithinContainer = containerServer.settings.allowParalellWorkWithinContainer;
          result.containerSettings.allowParalellWorkWithinItem = containerServer.settings.allowParalellWorkWithinItem;
        }
        return result;
    }
}


