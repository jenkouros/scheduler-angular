import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faCalendarAlt,
  faTrash,
  faEdit,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import { Input } from '@angular/core';
import { Calendar } from '../../models/calendar.model';

@Component({
  selector: 'app-schedule-toolbar',
  templateUrl: './schedule-toolbar.component.html',
  styleUrls: ['./schedule-toolbar.component.css']
})
export class ScheduleToolbarComponent implements OnInit {
  deleteIcon = faTrash;
  viewIcon = faCalendarAlt;
  editIcon = faEdit;
  listIcon = faChevronLeft;
  selectedIcon = 'calendar';

  @Input() selectedCommand: string;
  @Input() selectedCalendar: Calendar;

  @Output() selectedAction = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  onSelected(action: string) {
    this.selectedAction.emit(action);
  }
}
