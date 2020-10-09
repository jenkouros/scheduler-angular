import { ContainerServer } from './server/container.servermodel';

export class ContainerSettings {
  allowParalellWorkWithinContainer: boolean;
  allowParalellWorkWithinItem: boolean;
}

export class Container {
    id: number;
    comment: string;
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
        if (containerServer.settings) {
          result.containerSettings = new ContainerSettings();
          result.containerSettings.allowParalellWorkWithinContainer = containerServer.settings.allowParalellWorkWithinContainer;
          result.containerSettings.allowParalellWorkWithinItem = containerServer.settings.allowParalellWorkWithinItem;
        }
        return result;
    }
}


