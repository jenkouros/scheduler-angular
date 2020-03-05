import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SubCalendar, SelectedContainers } from '../../models/calendar.model';
import { TimeTable } from '../../models/timetable.model';

import * as fromStore from '../../store';
import { Container } from '../../../scheduler/models/container.dto';
import { AppComponentBase } from '../../../shared/app-component-base';

@Component({
  selector: 'app-schedule-detail',
  template: `
  <div *ngIf="isSubCalendarSelected">
    <div>
      <app-schedule-containers
      [selectedSubCalendar]="(selectedSubCalendar$ |async)"
      [avalableContainers]="(avalableContainers$ | async)"
      [selectedContainers]="(selectedContainers$ | async)"
      (add)="addToSelected($event)"
      (remove)="removeFromSelected($event)"
      ></app-schedule-containers>
    </div>
    <div>
      <app-schedule-events
        [timeTables]="(timetables$ | async)"
        (add)=onAdd($event)
        (remove)="onConfirmBeforeRemove($event)"
        (select)=onSelected($event)
      ></app-schedule-events>
    </div>
  </div>
  <div *ngIf="!isSubCalendarSelected">
    <div class="alert alert-primary" role="alert">
    {{ translate('Choose_Calendar_ForView') }}
    </div>
  </div>

  <app-schedule-delete-popup
  [timetable]="timetable"
  [visible]="(isDeletePopupVisible$ |async)"
  (confirm)="onConfirmRemove($event)"
  (cancel)="onCancelRemove()">
  </app-schedule-delete-popup>
  `
})
export class ScheduleDetailComponent extends AppComponentBase implements OnInit {
  timetables$: Observable<TimeTable[]>;
  avalableContainers$: Observable<Container[]>;
  selectedContainers$: Observable<Container[]>;
  selectedSubCalendar$: Observable<SubCalendar>;
  isDeletePopupVisible$: Observable<boolean>;
  isSubCalendarSelected = false;
  timetable: TimeTable | null;

  constructor(private store: Store<fromStore.WorkTimeState>) {
    super();
  }

  ngOnInit() {
    this.selectedSubCalendar$ = this.store.pipe(select(fromStore.getSubCalendarsSelected));
    this.timetables$ = this.store.pipe(select(fromStore.getTimeTables));
    this.selectedContainers$ = this.store.pipe(select(fromStore.getSelectedContainers));
    this.avalableContainers$ = this.store.pipe(select(fromStore.getAvalableContainers));

    this.selectedSubCalendar$.subscribe(item => {
      this.isSubCalendarSelected = item ? item.id > 0 : false;
    });
    this.isDeletePopupVisible$ = this.store.select(fromStore.getDeleteTimeTablePopupVisibility);
  }

  addToSelected(selected: SelectedContainers) {
    this.store.dispatch(new fromStore.AddToSelectedContainers(selected));
  }

  removeFromSelected(selected: SelectedContainers) {
    // console.log(selected);
    this.store.dispatch(new fromStore.RemoveFromSelectedContainers(selected));
  }

  onAdd(openPopup: boolean) {
    // console.log(openPopup);
    this.store.dispatch(new fromStore.TimeTablePopupVisible(openPopup));
  }
  onConfirmBeforeRemove(timetable: TimeTable) {
    this.timetable = timetable;
    this.store.dispatch(new fromStore.TimeTableDeletePopupVisible(true));
  }
  onCancelRemove() {
    this.timetable = null;
    this.store.dispatch(new fromStore.TimeTableDeletePopupVisible(false));
  }
  onConfirmRemove(timetable: TimeTable) {
    if (timetable) {
      this.store.dispatch(new fromStore.RemoveTimeTable(timetable));
      this.timetable = null;
    }
  }

  onSelected(id: number) {
    this.store.dispatch(new fromStore.SelectTimeTable(id));
    this.store.dispatch(new fromStore.TimeTablePopupVisible(true));
  }
}
