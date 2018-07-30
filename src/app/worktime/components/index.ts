import {
  CalendarItemComponent,
  CalendarFormComponent,
  SubCalendarItemComponent
} from './calendar';
import { WorktimeComponent } from './worktime.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleContainersComponent } from './schedule/schedule-containers/schedule-containers.component';
import { ScheduleEventsComponent } from './schedule/schedule-events/schedule-events.component';
import { ScheduleEventPopupComponent } from './schedule/schedule-events/schedule-event-popup/schedule-event-popup.component';

export const components: any[] = [
  CalendarItemComponent,
  WorktimeComponent,
  CalendarFormComponent,
  ScheduleComponent,
  SubCalendarItemComponent,
  ScheduleContainersComponent,
  ScheduleEventsComponent,
  ScheduleEventPopupComponent
];

export * from './calendar';
export * from './worktime.component';
export * from './schedule/schedule.component';
export * from './schedule/schedule-containers/schedule-containers.component';
export * from './schedule/schedule-events/schedule-events.component';
export * from './schedule/schedule-events/schedule-event-popup/schedule-event-popup.component';
