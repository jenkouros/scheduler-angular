import { CalendarsComponent } from './calendars/calendars.component';
import { SubCalendarComponent } from './sub-calendar/sub-calendar.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleEventComponent } from './schedule-detail/schedule-event/schedule-event.component';
import { SubCalendarItemComponent } from './sub-calendar/sub-calendar-item/sub-calendar-item.component';

export const containers: any[] = [
  SubCalendarComponent,
  CalendarsComponent,
  ScheduleDetailComponent,
  ScheduleEventComponent,
  SubCalendarItemComponent
];

export * from './calendars/calendars.component';
export * from './sub-calendar/sub-calendar.component';
export * from './schedule-detail/schedule-detail.component';
export * from './schedule-detail/schedule-event/schedule-event.component';
export * from './sub-calendar/sub-calendar-item/sub-calendar-item.component';
