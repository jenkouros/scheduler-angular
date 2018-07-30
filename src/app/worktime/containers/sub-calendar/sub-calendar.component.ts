import { Component, OnInit, Input } from '@angular/core';
import { Observable } from '../../../../../node_modules/rxjs';
import { SubCalendar, Calendar } from '../../models/calendar.model';

import * as fromStore from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sub-calendar',
  template: `
  <app-subcalendar-item [subCalendars]="(subCalendars$ | async)"
  (create)="onCreate($event)"
  (remove)="onRemove($event)"
  (select)="onSelect($event)">
  </app-subcalendar-item>
  `
})
export class SubCalendarComponent implements OnInit {
  @Input() calendar: Calendar;
  subCalendars$: Observable<SubCalendar[]>;
  constructor(private store: Store<fromStore.WorkTimeState>) {}

  ngOnInit() {
    this.subCalendars$ = this.store.select(
      fromStore.getSubCalendars(this.calendar.id)
    );
  }

  onRemove(subCalendar: SubCalendar) {
    this.store.dispatch(new fromStore.RemoveSubCalendar(subCalendar));
  }

  onCreate(name: string) {
    const sCalendar: SubCalendar = {
      id: 0,
      idCalendar: this.calendar.id,
      name
    };
    this.store.dispatch(new fromStore.CreateSubCalendar(sCalendar));
  }

  onSelect(subCalendar: SubCalendar) {
    this.store.dispatch(new fromStore.SelectSubCalendar(subCalendar.id));
  }
}
