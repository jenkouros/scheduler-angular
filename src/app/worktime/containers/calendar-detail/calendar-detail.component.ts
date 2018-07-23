import { Component, OnInit } from '@angular/core';
import {
  faCalendarAlt,
  faTrash,
  faEdit,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { TimeTableType, TimeTable } from '../../models/timetable.model';
import * as fromStore from '../../store';
import { Calendar } from '../../models/calendar.model';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-calendar-detail',
  template: `
  <app-schedule-toolbar
    [selectedCalendar]="calendar$ | async"
    (selectedAction)="onSelected($event)"
    [selectedCommand]="selectedCommand"
    [selectedCalendar]="calendar">
  </app-schedule-toolbar>
   `
})
/*
<app-calendar *ngIf="selectedCommand==='calendar'"></app-calendar>
  <app-schedule-tab *ngIf="selectedCommand==='schedule'"
    [timeTablesTypes]="timeTablesTypes"
    [timeTables]="(timetables$ | async)">
  </app-schedule-tab>
*/
export class CalendarDetailComponent implements OnInit, OnDestroy {
  selectedCommand: string;
  calendar$: Observable<Calendar>;

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
  private selectedCalendarSubscription: Subscription;
  selectedCalendar: Calendar;
  constructor(
    private store: Store<fromStore.WorkTimeState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.calendar$ =
    console.log('ngOnInit scheduler');
    this.store.select(fromStore.getCalendarsSelectedOld).subscribe(calendar => {
      console.log('caledar', calendar);
    });
    console.log('route', this.route);
    if (this.route) {
      console.log('route', this.route);
      this.calendar$ = this.route.params.pipe(
        switchMap(params => {
          // console.log(params);
          return this.store.select(
            fromStore.getCalendarById(params.calendarId)
          );
        })
      );
    }
  }

  onSelected(command: string) {
    console.log(command);
    this.selectedCommand = command;
    switch (command) {
      // calendar events
      /*
      case 'calendar': {

        break;
      }
      */
      case 'schedule': {
        // this.store.dispatch(new fromStore.LoadTimeTables(this.calendar.id));
        this.timetables$ = this.store.pipe(select(fromStore.getTimeTables));
        console.log('selectedcalendar', this.selectedCalendar);
        // this.router.navigate([`timetables/1/details`]);
        break;
      }
      case 'timetable': {
        this.router.navigate(['timetables']);
      }
    }
  }

  ngOnDestroy(): void {
    // this.selectedCalendarSubscription.unsubscribe();
  }
}
