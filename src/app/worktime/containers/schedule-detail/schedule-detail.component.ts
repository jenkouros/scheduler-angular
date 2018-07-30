import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Calendar } from '../../models/calendar.model';
import { TimeTable, TimeTableType } from '../../models/timetable.model';

import * as fromStore from '../../store';

@Component({
  selector: 'app-schedule-detail',
  template: `
    <app-schedule
    [timeTables]="(timetables$ | async)">
  </app-schedule>
  `
})
export class ScheduleDetailComponent implements OnInit {
  calendar: Calendar;
  timetables$: Observable<TimeTable[]>;

  constructor(private store: Store<fromStore.WorkTimeState>) {}

  ngOnInit() {
    // this.store.dispatch(new fromStore.LoadTimeTables(this.calendar.id));
    this.timetables$ = this.store.pipe(select(fromStore.getTimeTables));
  }
}
