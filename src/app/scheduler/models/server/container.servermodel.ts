export interface ContainerServer {
    idContainer: number;
    code: string;
    name: string;
    comment: string;
    idContainerStatus: number;
    settings: ContainerSettingsServer;
}

export interface ContainerStatusServer {
  idContainerStatus: number;
  code: string;
  name: string;
  color: string;
}

export interface ContainerSettingsServer {
  allowParalellWorkWithinContainer: boolean;
  allowParalellWorkWithinItem: boolean;
}

