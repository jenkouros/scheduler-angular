import { Component, OnInit, Input } from '@angular/core';
import { Observable, observable } from '../../../../../node_modules/rxjs';
import { SubCalendar, Calendar } from '../../models/calendar.model';

import * as fromStore from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sub-calendar',
  template: `
  <app-subcalendar-item [subCalendars]="(subCalendars$ | async)"
  (create)="onCreate($event)"
  (editing)="onEditing($event)"
  (remove)="onRemove($event)">
  </app-subcalendar-item>
  <app-sub-calendar-item></app-sub-calendar-item>
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
    console.log('remove subcalnedar');
  }

  onCreate(name: string) {
    const sCalendar: SubCalendar = {
      id: 0,
      idCalendar: this.calendar.id,
      name
    };
    this.store.dispatch(new fromStore.CreateSubCalendar(sCalendar));
  }

  onEditing(subCalendar: SubCalendar) {
    this.store.dispatch(new fromStore.SelectEditSubCalendar(subCalendar.id));
    this.store.dispatch(new fromStore.SubCalendarPopupVisible(true));
  }

  onCancel(timetable: SubCalendar) {
    this.store.dispatch(new fromStore.DeSelectEditSubCalendar());
    this.store.dispatch(new fromStore.SubCalendarPopupVisible(false));
  }

  onUpdate(subCalendar: SubCalendar) {
    this.store.dispatch(new fromStore.UpdateSubCalendar(subCalendar));
  }
}
