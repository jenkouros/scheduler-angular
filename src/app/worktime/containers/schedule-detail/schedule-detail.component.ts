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
    <app-schedule-tab
    [timeTablesTypes]="timeTablesTypes"
    [timeTables]="(timetables$ | async)">
  </app-schedule-tab>
  `
})
export class ScheduleDetailComponent implements OnInit {
  calendar: Calendar;
  timetables$: Observable<TimeTable[]>;
  timeTablesTypes: TimeTableType[] = [
    {
      id: 0,
      name: 'Urnik',
      template: 'customTemplate'
    },
    {
      id: 1,
      name: 'Osnovni urnik'
    },
    {
      id: 2,
      name: 'Dodatni delovni čas'
    },
    {
      id: 3,
      name: 'Nedelovni čas'
    } /*, {
      id: 5,
      name: 'Urnik izjem',
      template: 'customTemplate'
    }*/
  ];
  constructor(
    private store: Store<fromStore.WorkTimeState>,
    private router: Router
  ) {}

  ngOnInit() {
    // this.store.dispatch(new fromStore.LoadTimeTables(this.calendar.id));
    this.timetables$ = this.store.pipe(select(fromStore.getTimeTables));
  }
}
