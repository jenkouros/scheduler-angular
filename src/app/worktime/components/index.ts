import {
  CalendarItemComponent,
  CalendarFormComponent,
  SubCalendarItemComponent
} from './calendar';

import { ScheduleTabComponent } from './schedule-tab/schedule-tab.component';
import { ScheduleToolbarComponent } from './schedule-toolbar/schedule-toolbar.component';
import { WorktimeComponent } from './worktime.component';
import { TimetableEventComponent } from './timetable-event/timetable-event.component';
import { CalendarItemsComponent } from './calendar-items/calendar-items.component';

export const components: any[] = [
  CalendarItemComponent,
  ScheduleTabComponent,
  ScheduleToolbarComponent,
  WorktimeComponent,
  CalendarFormComponent,
  TimetableEventComponent,
  CalendarItemsComponent,
  SubCalendarItemComponent
];

export * from './calendar';
export * from './schedule-tab/schedule-tab.component';
export * from './schedule-toolbar/schedule-toolbar.component';
export * from './worktime.component';
export * from './timetable-event/timetable-event.component';
export * from './calendar-items/calendar-items.component';
