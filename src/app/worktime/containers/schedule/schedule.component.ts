import { Component, OnInit } from '@angular/core';
import {
  faCalendarAlt,
  faTrash,
  faEdit,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { TimeTableType, TimeTable } from '../../models/timetable.model';
import * as fromStore from '../../store';
import { select } from '@ngrx/store';
import { Calendar } from '../../models/calendar.model';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-schedule',
  template: `
  <app-schedule-toolbar
    (selectedAction)="onSelected($event)"
    [selectedCommand]="selectedCommand"
    [selectedCalendar]="calendar">
  </app-schedule-toolbar>
  <app-calendar *ngIf="selectedCommand==='calendar'"></app-calendar>
    <app-schedule-tab *ngIf="selectedCommand==='schedule'"
    [timeTablesTypes]="timeTablesTypes"
    [timeTables]="(timetables$ | async)">
  </app-schedule-tab>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {
  selectedCommand: string;
  // calendar$: Observable<Calendar>;
  calendar: Calendar;
  timetables$: Observable<TimeTable[]>;

  timeTablesTypes: TimeTableType[] = [
    {
      id: 1,
      name: 'Urnik',
      template: 'customTemplate'
    },
    {
      id: 2,
      name: 'Osnovni urnik'
    },
    {
      id: 3,
      name: 'Dodatni delovni čas'
    },
    {
      id: 4,
      name: 'Nedelovni čas'
    } /*, {
      id: 5,
      name: 'Urnik izjem',
      template: 'customTemplate'
    }*/
  ];
  private selectedCalendarSubscription: Subscription;

  constructor(
    private store: Store<fromStore.WorkTimeState>,
    private router: Router
  ) {}

  ngOnInit() {
    // this.calendar$ =
    console.log('ngOnInit');
    this.selectedCalendarSubscription = this.store
      .pipe(select(fromStore.getCalendarsSelected))
      .subscribe(calendar => {
        if (calendar) {
          this.calendar = calendar;
          console.log(this.calendar);
          this.onSelected('calendar');
        }
      });
  }

  onSelected(command: string) {
    // console.log(command);
    this.selectedCommand = command;
    switch (command) {
      // calendar events
      /*
      case 'calendar': {

        break;
      }
      */
      case 'schedule': {
        this.store.dispatch(new fromStore.LoadTimeTables(this.calendar.id));
        this.timetables$ = this.store.pipe(select(fromStore.getTimeTables));
        break;
      }
      case 'timetable': {
        this.router.navigate(['worktime']);
      }
    }
  }

  ngOnDestroy(): void {
    this.selectedCalendarSubscription.unsubscribe();
  }
}
