import { CalendarsService } from './calendars.service';
import { TimeTablesService } from './timetables.service';
import { ContainersService } from './containers.service';

export const services: any[] = [
  CalendarsService,
  TimeTablesService,
  ContainersService
];

export * from './calendars.service';
export * from './timetables.service';
export * from './containers.service';
