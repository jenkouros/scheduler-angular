import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Calendar, SubCalendar } from '../../../models/calendar.model';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { select } from '../../../../../../node_modules/@ngrx/store';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css']
})
export class CalendarItemComponent implements OnInit {
  @Input() calendar: Calendar;

  @Output() select = new EventEmitter<Calendar>();
  @Output() remove = new EventEmitter<Calendar>();
  @Output() createSchedule = new EventEmitter<SubCalendar>();

  editIcon = faEdit;
  deleteIcon = faTrash;
  constructor() {}

  ngOnInit() {
    console.log(this.calendar);
  }

  addSchedule() {}

  onRemove(calendar: Calendar) {
    this.remove.emit(calendar);
  }

  onSelect() {
    this.select.emit(this.calendar);
  }

  onCreateSchedule(name: string) {
    this.createSchedule.emit({ id: 0, idCalendar: this.calendar.id, name });
  }
}
