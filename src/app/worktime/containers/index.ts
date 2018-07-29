import { CalendarsComponent } from './calendars/calendars.component';
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';

export const containers: any[] = [
  CalendarDetailComponent,
  CalendarsComponent,
  ScheduleDetailComponent
];

export * from './calendars/calendars.component';
export * from './schedule-detail/schedule-detail.component';
export * from './calendar-detail/calendar-detail.component';
