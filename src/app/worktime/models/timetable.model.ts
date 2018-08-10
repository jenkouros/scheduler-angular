import { Container } from '../../scheduler/models/container.dto';
import { ContainerServer } from '../../scheduler/models/server/container.servermodel';

export interface ScheduleServer {
  subCalendar: number;
  selectedContainers: ContainerServer[];
  unselectedContainers: ContainerServer[];
  timeTables: TimeTable[];
}

export class Schedule {
  subCalendar: number;
  selectedContainers: Container[];
  unselectedContainers: Container[];
  timeTables: TimeTable[];

  static fromServer(containerServer: ScheduleServer): Schedule {
    const result = new Schedule();
    result.subCalendar = containerServer.subCalendar;
    result.selectedContainers = containerServer.selectedContainers.map(item =>
      Container.fromServer(item)
    );
    result.unselectedContainers = containerServer.unselectedContainers.map(
      item => Container.fromServer(item)
    );
    result.timeTables = containerServer.timeTables;
    return result;
  }
}

export interface TimeTable {
  id: number;
  idSubCalendar: number;
  idTimeTableType: number;
  name: string;
  description: string;
  timeStart: Date;
  timeEnd: Date;
  recurrenceRule: string | null;
}

export interface TimeTableType {
  id: number;
  name: string;
  template?: string;
}
