import { Component, OnInit, Input } from '@angular/core';
import { SubCalendar } from '../../../models/calendar.model';
import { Observable } from 'rxjs';
import * as fromStore from '../../../store';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-sub-calendar-item',
  template: `
  <app-sub-calendar-popup
  [subCalendar]="(editingSubCalendar$ | async)"
  [visible]="(visible$ | async)"
  (update)="onUpdate($event)"
  (cancel)="onCancel($event)"
  >
  </app-sub-calendar-popup>
  `
})
export class SubCalendarItemComponent implements OnInit {
  editingSubCalendar$: Observable<SubCalendar>;
  visible$: Observable<boolean>;

  constructor(private store: Store<fromStore.WorkTimeState>) {}

  ngOnInit() {
    this.editingSubCalendar$ = this.store.select(
      fromStore.getSubCalendarsEditSelected
    );

    this.visible$ = this.store.select(fromStore.getSubCalendarPopupVisibility);
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
