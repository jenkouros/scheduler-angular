import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faCalendarAlt,
  faTrash,
  faEdit,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
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

  // PREVENT ERROR
  enabled = true;
  deleteSchedule() {}

  constructor(private router: Router) {}

  ngOnInit() {
    this.selectedCommand = 'calendar';
    console.log('selectedCommand', this.selectedCalendar);
  }

  onSelected(action: string) {
    console.log(`timetables/${this.selectedCalendar.id}/˘{action}`);
    this.router.navigate([`timetables/${this.selectedCalendar.id}/${action}`]);
    this.selectedAction.emit(action);
  }
}
