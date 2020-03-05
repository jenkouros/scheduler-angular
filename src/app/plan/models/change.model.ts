export interface SimulationState {
  idPlan: number;
  timeStart?: Date;
  timeEnd?: Date;
  idSubItem?: number;
  code?: string;
  codeName?: string;
  container?: string;
  containerName?: string;
  batchNumber?: string;
}

export interface Simulation {
  original: SimulationState;
  simulation: SimulationState;
  changeStatus: SimulationChangeStatus;
}

export enum SimulationChangeStatus {
  Moved = 1,
  Added = 2,
  Removed = 3
}
