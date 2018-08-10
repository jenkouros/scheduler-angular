import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable, observable } from '../../../../../node_modules/rxjs';
import { SubCalendar, Calendar } from '../../models/calendar.model';

import * as fromStore from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sub-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <app-subcalendar-item [subCalendars]="(subCalendars$ | async)"
  (create)="onCreate($event)"
  (editing)="onEditing($event)"
  (remove)="confirmDelete($event)">
  </app-subcalendar-item>

  <app-sub-calendar-item></app-sub-calendar-item>

  <app-sub-calendar-delete-popup
  [subCalendar]="subCalendar"
  [visible]="(isDeletePopupVisible$ |async)"
  (confirm)="onConfirmRemove($event)"
  (cancel)="onCancelRemove()">
  </app-sub-calendar-delete-popup>

  `
})
export class SubCalendarComponent implements OnInit {
  @Input()
  calendar: Calendar;
  subCalendars$: Observable<SubCalendar[]>;
  isDeletePopupVisible$: Observable<boolean>;
  subCalendar: SubCalendar | null;
  constructor(private store: Store<fromStore.WorkTimeState>) {}

  ngOnInit() {
    this.subCalendars$ = this.store.select(
      fromStore.getSubCalendars(this.calendar.id)
    );
    this.isDeletePopupVisible$ = this.store.select(
      fromStore.getDeleteSubCalendarPopupVisibility
    );
  }
  confirmDelete(subCalendar: SubCalendar) {
    this.subCalendar = subCalendar;
    this.store.dispatch(new fromStore.SubCalendarDeletePopupVisible(true));
  }

  onConfirmRemove(subCalendar: SubCalendar) {
    if (subCalendar) {
      this.store.dispatch(new fromStore.RemoveSubCalendar(subCalendar));
      this.subCalendar = null;
    }
  }

  onCancelRemove() {
    this.subCalendar = null;
    this.store.dispatch(new fromStore.SubCalendarDeletePopupVisible(false));
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
