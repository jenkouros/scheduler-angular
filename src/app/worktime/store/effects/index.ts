import { CalendarsEffects } from './calendars.effect';
import { SubCalendarsEffects } from './subcalendars.effect';
import { TimeTablesEffects } from './timetables.effect';

export const effects: any[] = [
  CalendarsEffects,
  SubCalendarsEffects,
  TimeTablesEffects
];

export * from './calendars.effect';
export * from './subcalendars.effect';
export * from './timetables.effect';
