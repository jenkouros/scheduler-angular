import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubCalendar } from '../../../models/calendar.model';

@Component({
  selector: 'app-subcalendar-item',
  templateUrl: './subcalendar-item.component.html',
  styleUrls: ['./subcalendar-item.component.css']
})
export class SubCalendarItemComponent implements OnInit {
  @Input() subCalendars: SubCalendar[];
  @Output() create = new EventEmitter<string>();
  @Output() remove = new EventEmitter<SubCalendar>();
  @Output() select = new EventEmitter<SubCalendar>();
  constructor() {}

  ngOnInit() {}

  addSubCalendar(event: any) {
    this.create.emit(event.target.value);
  }

  removeSubCalendar(subCalendar: SubCalendar) {
    this.remove.emit(subCalendar);
  }

  selectSubCalendar(subCalendar: SubCalendar) {
    this.select.emit(subCalendar);
  }
}
