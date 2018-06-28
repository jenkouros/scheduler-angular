import { Component, OnInit } from '@angular/core';
import { Calendar } from '../../models/calendar.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-time-tables',
  styleUrls: ['./time-tables.component.css'],
  template: `
  <dx-toolbar
    [items]="items"
  >
  </dx-toolbar>
  <div class="icon-bar" *ngFor="let calendar of (calendars$ | async)">
      <app-time-table
        [scheduleData]="calendar"
        (selectSchedule)="handleSelect($event)"
        [selected]="selectedId===calendar.id">
      </app-time-table>
  </div>
  `
})
export class TimeTablesComponent implements OnInit {
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
          onClick: () => {}
        }
      }
    ];
  }

  ngOnInit() {
    this.calendars$ = this.store.select(fromStore.getAllCalendars);
    this.store.dispatch(new fromStore.LoadCalendars());
  }

  handleSelect(id: number) {
    this.selectedId = id;
    this.store.dispatch(new fromStore.SelectCalendar(id));
    this.router.navigate(['worktime/schedule']);
  }
}
