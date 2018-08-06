import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SubCalendar, SelectedContainers } from '../../models/calendar.model';
import { TimeTable, TimeTableType } from '../../models/timetable.model';

import * as fromStore from '../../store';
import { Container } from '../../../scheduler/models/container.dto';

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
        (remove)="onRemove($event)"
        (select)=onSelected($event)
      ></app-schedule-events>
    </div>
  </div>
  <div *ngIf="!isSubCalendarSelected">TODO: komponenta za obvestilo, da je treba izbrati urnik</div>
  `
})
export class ScheduleDetailComponent implements OnInit {
  timetables$: Observable<TimeTable[]>;
  avalableContainers$: Observable<Container[]>;
  selectedContainers$: Observable<Container[]>;
  selectedSubCalendar$: Observable<SubCalendar>;
  isSubCalendarSelected = false;

  constructor(private store: Store<fromStore.WorkTimeState>) {}

  ngOnInit() {
    this.selectedSubCalendar$ = this.store.pipe(
      select(fromStore.getSubCalendarsSelected)
    );
    this.timetables$ = this.store.pipe(select(fromStore.getTimeTables));
    this.selectedContainers$ = this.store.pipe(
      select(fromStore.getSelectedContainers)
    );
    this.avalableContainers$ = this.store.pipe(
      select(fromStore.getAvalableContainers)
    );

    this.selectedSubCalendar$.subscribe(item => {
      this.isSubCalendarSelected = item ? item.id > 0 : false;
    });
  }

  addToSelected(selected: SelectedContainers) {
    this.store.dispatch(new fromStore.AddToSelectedContainers(selected));
  }

  removeFromSelected(selected: SelectedContainers) {
    console.log(selected);
    this.store.dispatch(new fromStore.RemoveFromSelectedContainers(selected));
  }

  onAdd(openPopup: boolean) {
    console.log(openPopup);
    this.store.dispatch(new fromStore.TimeTablePopupVisible(openPopup));
  }

  onRemove(timetable: TimeTable) {
    console.log('remove');
    this.store.dispatch(new fromStore.RemoveTimeTable(timetable));
  }

  onSelected(id: number) {
    this.store.dispatch(new fromStore.SelectTimeTable(id));
    this.store.dispatch(new fromStore.TimeTablePopupVisible(true));
  }
}
