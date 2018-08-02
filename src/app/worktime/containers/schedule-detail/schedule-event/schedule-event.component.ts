import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TimeTable } from '../../../models/timetable.model';

import * as fromStore from '../../../store';

@Component({
  selector: 'app-schedule-event',
  template: `
    <app-schedule-event-popup
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

  constructor(private store: Store<fromStore.WorkTimeState>) {}

  ngOnInit() {
    this.visible$ = this.store.pipe(
      select(fromStore.getTimeTablePopupVisibility)
    );
    this.selectedTimetable$ = this.store.pipe(
      select(fromStore.getTimeTableSelected)
    );
  }

  onCreate(timetable: TimeTable) {}
  onUpdate(timetable: TimeTable) {}
  onRemove(timetable: TimeTable) {}

  onCancel(timetable: TimeTable) {
    this.store.dispatch(new fromStore.DeSelectTimeTable());
    this.store.dispatch(new fromStore.TimeTablePopupVisible(false));
  }
}
