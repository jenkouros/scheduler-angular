import { CalendarsGuard } from './calendar.guard';
import { CalendarExistsGuard } from './calendar-exists.guard';
import { TimeTablesGuard } from './timetables.guard';

export const guards: any[] = [CalendarsGuard, CalendarExistsGuard, TimeTablesGuard];

export * from './calendar.guard';
export * from './calendar-exists.guard';
export * from './timetables.guard';
