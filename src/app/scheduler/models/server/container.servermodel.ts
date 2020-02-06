export interface ContainerServer {
    idContainer: number;
    code: string;
    name: string;
    settings: ContainerSettingsServer;
}

export interface ContainerSettingsServer {
  allowParalellWorkWithinContainer: boolean;
  allowParalellWorkWithinItem: boolean;
}

