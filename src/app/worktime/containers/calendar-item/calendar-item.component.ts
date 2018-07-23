import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../../../node_modules/rxjs';
import { Calendar } from '../../models/calendar.model';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-calendar-item',
  template: `
  <app-calendar-form
  [calendar]  = "calendar$ | async"
  (create)= "onCreate($event)"
  (update)= "onUpdate($event)"
  (remove)= "onRemove($event)"
  >
  </ app-calendar-form>
  `,
  styleUrls: ['./calendar-item.component.css']
})
export class CalendarItemComponent implements OnInit {
  calendar$: Observable<Calendar>;

  constructor(private store: Store<fromStore.WorkTimeState>) {}

  ngOnInit() {
    console.log('CalendarItemComponent');
    this.calendar$ = this.store.select(fromStore.getCalendarsSelected);
  }

  onCreate(calendar: Calendar) {
    this.store.dispatch(new fromStore.CreateCalendar(calendar));
  }

  onUpdate(calendar: Calendar) {
    this.store.dispatch(new fromStore.UpdateCalendar(calendar));
  }

  onRemove(calendar: Calendar) {
    this.store.dispatch(new fromStore.RemoveCalendar(calendar));
  }
}
