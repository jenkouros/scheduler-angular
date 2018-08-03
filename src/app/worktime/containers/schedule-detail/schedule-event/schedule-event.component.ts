import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TimeTable } from '../../../models/timetable.model';

import * as fromStore from '../../../store';
import { SubCalendar } from '../../../models/calendar.model';

@Component({
  selector: 'app-schedule-event',
  template: `
    <app-schedule-event-popup
      [subCalendar]="(selectedSubCalendar$ | async)"
      [timetable]="(selectedTimetable$ | async)"
      [visible]="(visible$ | async)"
      (create)="onCreate($event)"
      (update)="onUpdate($event)"
      (cancel)="onCancel($event)">
    </app-schedule-event-popup>
  `
})
export class ScheduleEventComponent implements OnInit {
  selectedTimetable$: Observable<TimeTable>;
  visible$: Observable<boolean>;
  selectedSubCalendar$: Observable<SubCalendar>;

  constructor(private store: Store<fromStore.WorkTimeState>) {}

  ngOnInit() {
    this.visible$ = this.store.pipe(
      select(fromStore.getTimeTablePopupVisibility)
    );
    this.selectedTimetable$ = this.store.pipe(
      select(fromStore.getTimeTableSelected)
    );
    this.selectedSubCalendar$ = this.store.pipe(
      select(fromStore.getSubCalendarsSelected)
    );
  }

  onCreate(timetable: TimeTable) {
    this.store.dispatch(new fromStore.CreateTimeTable(timetable));
  }
  onUpdate(timetable: TimeTable) {
    this.store.dispatch(new fromStore.UpdateTimeTable(timetable));
  }

  onCancel(timetable: TimeTable) {
    this.store.dispatch(new fromStore.DeSelectTimeTable());
    this.store.dispatch(new fromStore.TimeTablePopupVisible(false));
  }
}
