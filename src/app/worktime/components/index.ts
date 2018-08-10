import {
  CalendarItemComponent,
  CalendarFormComponent,
  SubCalendarItemComponent,
  SubCalendarPopupComponent,
  SubCalendarDeletePopupComponent
} from './calendar';
import { WorktimeComponent } from './worktime.component';
import { ScheduleContainersComponent } from './schedule/schedule-containers/schedule-containers.component';
import { ScheduleEventsComponent } from './schedule/schedule-events/schedule-events.component';
import { ScheduleEventPopupComponent } from './schedule/schedule-events/schedule-event-popup/schedule-event-popup.component';
import { ContainersListComponent } from './containers-list/containers-list.component';
import { ScheduleDeletePopupComponent } from './schedule/schedule-events/schedule-delete-popup/schedule-delete-popup.component';

export const components: any[] = [
  CalendarItemComponent,
  WorktimeComponent,
  CalendarFormComponent,
  SubCalendarItemComponent,
  ScheduleContainersComponent,
  ScheduleEventsComponent,
  ScheduleEventPopupComponent,
  ContainersListComponent,
  SubCalendarPopupComponent,
  SubCalendarDeletePopupComponent,
  ScheduleDeletePopupComponent
];

export * from './calendar';
export * from './worktime.component';
export * from './schedule/schedule-containers/schedule-containers.component';
export * from './schedule/schedule-events/schedule-events.component';
export * from './schedule/schedule-events/schedule-event-popup/schedule-event-popup.component';
export * from './containers-list/containers-list.component';
export * from './schedule/schedule-events/schedule-delete-popup/schedule-delete-popup.component';
