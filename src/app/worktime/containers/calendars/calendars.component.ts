import { Component, OnInit } from '@angular/core';
import { Calendar } from '../../models/calendar.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-calendars',
  template: `
  <dx-toolbar
    [items]="items"
  >
  </dx-toolbar>

  <app-calendar-items
  (editItem)="onEdit($event)"
  (selectItem)="onSelect($event)"
  [dataSource]="(calendars$ | async)">
  </app-calendar-items>
  `,
  styleUrls: ['./calendars.component.css']
})
export class CalendarsComponent implements OnInit {
  selectedId: number;
  items: any[];
  calendars$: Observable<Calendar[]>;

  constructor(
    private store: Store<fromStore.WorkTimeState>,
    private router: Router
  ) {
    this.items = [
      {
        location: 'before',
        locateInMenu: 'never',
        template: () => {
          return '<div class=\'toolbar-label\'>Urniki strojev</div>';
        }
      },
      {
        location: 'after',
        widget: 'dxButton',
        locateInMenu: 'never',

        options: {
          icon: 'plus',
          text: 'Dodaj',
          onClick: () => {
            this.router.navigate(['timetables/new']);
          }
        }
      }
    ];
  }

  ngOnInit() {
    this.calendars$ = this.store.select(fromStore.getAllCalendars);
    // this.store.dispatch(new fromStore.LoadCalendars());
  }

  onEdit(id: number) {
    this.selectedId = id;
    console.log('calendarId', id);
    this.store.dispatch(new fromStore.SelectCalendar(id));
    this.router.navigate([`timetables/edit/${id}`]);
  }
  onSelect(id: number) {
    this.selectedId = id;
    console.log('calendarId', id);
    this.store.dispatch(new fromStore.SelectCalendar(id));
    this.router.navigate([`timetables/${id}`]);
  }

  handleSelect(id: number) {
    this.selectedId = id;
    this.store.dispatch(new fromStore.SelectCalendar(id));
    this.router.navigate([`timetables/${id}`]);
  }
}
