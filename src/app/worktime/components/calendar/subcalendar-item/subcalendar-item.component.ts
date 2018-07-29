import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubCalendar } from '../../../models/calendar.model';
import calendar from '../../../../../../node_modules/devextreme/ui/calendar';

@Component({
  selector: 'app-subcalendar-item',
  templateUrl: './subcalendar-item.component.html',
  styleUrls: ['./subcalendar-item.component.css']
})
export class SubCalendarItemComponent implements OnInit {
  @Input() subCalendars: SubCalendar[];
  @Output() create = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  addSchedule(event: any) {
    this.create.emit(event.target.value);
  }
}
