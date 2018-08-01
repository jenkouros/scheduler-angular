import { CalendarsComponent } from './calendars/calendars.component';
import { SubCalendarComponent } from './sub-calendar/sub-calendar.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleEventComponent } from './schedule-detail/schedule-event/schedule-event.component';

export const containers: any[] = [
  SubCalendarComponent,
  CalendarsComponent,
  ScheduleDetailComponent,
  ScheduleEventComponent
];

export * from './calendars/calendars.component';
export * from './sub-calendar/sub-calendar.component';
export * from './schedule-detail/schedule-detail.component';
export * from './schedule-detail/schedule-event/schedule-event.component';
