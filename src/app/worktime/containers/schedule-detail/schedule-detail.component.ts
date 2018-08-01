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
  <div>
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
        (select)=onSelected($event)
      ></app-schedule-events>
    </div>
</div>
  `,
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {
  timetables$: Observable<TimeTable[]>;
  avalableContainers$: Observable<Container[]>;
  selectedContainers$: Observable<Container[]>;
  selectedSubCalendar$: Observable<SubCalendar>;

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
  }

  removeFromSelected(ids: number[]) {}

  addToSelected(selected: SelectedContainers) {
    console.log(selected);
    this.store.dispatch(new fromStore.AddToSelectedContainers(selected));
  }

  onAdd(openPopup: boolean) {
    console.log(openPopup);
    this.store.dispatch(new fromStore.TimeTablePopupVisible(openPopup));
  }

  onSelected(id: number) {
    this.store.dispatch(new fromStore.SelectTimeTable(id));
    this.store.dispatch(new fromStore.TimeTablePopupVisible(true));
  }
}
