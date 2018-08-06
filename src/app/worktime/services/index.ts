import { CalendarsService } from './calendars.service';
import { TimeTablesService } from './timetables.service';
import { ContainersService } from './containers.service';

// notify
import { NotifyService } from '../../shared/services/notify.service';

export const services: any[] = [
  CalendarsService,
  TimeTablesService,
  ContainersService,
  NotifyService
];

export * from './calendars.service';
export * from './timetables.service';
export * from './containers.service';

export * from '../../shared/services/notify.service';
