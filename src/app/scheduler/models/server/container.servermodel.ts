export interface ContainerServer {
    idContainer: number;
    code: string;
    name: string;
    comment: string;
    settings: ContainerSettingsServer;
}

export interface ContainerSettingsServer {
  allowParalellWorkWithinContainer: boolean;
  allowParalellWorkWithinItem: boolean;
}

