import { CalendarsEffects } from './calendars.effect';
import { SubCalendarsEffects } from './subcalendars.effect';
import { TimeTablesEffects } from './timetables.effect';
import { ContainersEffects } from './containers.effect';

export const effects: any[] = [
  CalendarsEffects,
  SubCalendarsEffects,
  TimeTablesEffects,
  ContainersEffects
];

export * from './calendars.effect';
export * from './subcalendars.effect';
export * from './timetables.effect';
export * from './containers.effect';
