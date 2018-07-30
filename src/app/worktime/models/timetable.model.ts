import { Container } from '../../scheduler/models/container.dto';

export interface Schedule {
  subCalendar: number;
  selectedContainers: Container[];
  unselectedContainers: Container[];
  timeTables: TimeTable[];
}

export interface TimeTable {
  id: number;
  idCalendar: number;
  idTimeTableType: number;
  name: string;
  description: string;
  timeStart: Date;
  timeEnd: Date;
  recurrenceRule: string;
}

export interface TimeTableType {
  id: number;
  name: string;
  template?: string;
}
