import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterContentInit
} from '@angular/core';
import { Calendar } from '../../models/calendar.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { DxScrollViewComponent } from '../../../../../node_modules/devextreme-angular';

@Component({
  selector: 'app-calendars',
  template: `
  <div class="mx-2">
    <dx-toolbar [items]="items" class="mb-2 active">
    </dx-toolbar>
    <dx-scroll-view #scrollElement [height]="height">

        <app-calendar-item *ngFor="let calendar of  (calendars$ | async)"
        [calendar]="calendar"
        (remove)="onRemove($event)"
        (select)="onSelect($event)"
        >
        </app-calendar-item>

        <app-calendar-form
        [calendar]="(selectedCalendar$ | async)"
        [visible]="(visible$ | async)"
        (update)="onUpdate($event)"
        (create)="onCreate($event)"
        (cancel)="onCancel($event)"
        >
        </app-calendar-form>

     </dx-scroll-view>
  </div>
  `,
  styleUrls: ['./calendars.component.css']
})
export class CalendarsComponent implements OnInit, AfterContentInit {
  selectedId: number;
  selectedCalendar$: Observable<Calendar>;
  items: any[];
  calendars$: Observable<Calendar[]>;
  visible$: Observable<boolean>;
  height: number;

  @ViewChild(DxScrollViewComponent)
  scrollbar: DxScrollViewComponent;

  constructor(
    private store: Store<fromStore.WorkTimeState>,
    private router: Router
  ) {
    this.items = [
      {
        location: 'before',
        locateInMenu: 'never',
        template: () => {
          return '<div class=\'toolbar-label\'>Koledarji</div>';
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
            this.store.dispatch(new fromStore.DeSelectCalendar());
            this.store.dispatch(new fromStore.CalendarPopupVisible(true));
          }
        }
      }
    ];
  }
  ngAfterContentInit() {
    this.height =
      window.innerHeight -
      (<any>this.scrollbar).element.nativeElement.getBoundingClientRect().top -
      100;
  }

  getScrollHeight(elementRef: ElementRef) {
    return (
      window.innerHeight - elementRef.nativeElement.getBoundingClientRect().top
    );
  }

  ngOnInit() {
    this.calendars$ = this.store.select(fromStore.getAllCalendars);
    this.visible$ = this.store.select(fromStore.getCalendarPopupVisibility);
    this.selectedCalendar$ = this.store.select(fromStore.getCalendarsSelected);
  }

  onCancel(visible: boolean) {
    this.store.dispatch(new fromStore.CalendarPopupVisible(visible));
  }
  /*
  onEdit(id: number) {
    this.selectedId = id;
    console.log('calendarId', id);
    this.store.dispatch(new fromStore.SelectCalendar(id));
    // this.router.navigate([`timetables/edit/${id}`]);

  onSelect(id: number) {
    this.selectedId = id;
    console.log('calendarId', id);
    this.store.dispatch(new fromStore.SelectCalendar(id));
    this.router.navigate([`timetables/${id}`]);
  }
 }*/
  handleSelect(id: number) {
    this.selectedId = id;
    this.store.dispatch(new fromStore.SelectCalendar(id));
    this.router.navigate([`timetables/${id}`]);
  }

  onSelect(calendar: Calendar) {
    // this.selectedCalendar = { ...this.selectedCalendar, ...calendar };
    this.store.dispatch(new fromStore.SelectCalendar(calendar.id));
    this.store.dispatch(new fromStore.CalendarPopupVisible(true));
    // this.store.dispatch(new fromStore.UpdateCalendar(calendar));
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
