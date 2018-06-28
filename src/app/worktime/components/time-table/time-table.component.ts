import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from '../../models/calendar.model';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  checkIcon = faCheck;

  @Input() scheduleData: any;
  @Input() selected: boolean;

  @Output() selectSchedule = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onSelectShedule(item: Calendar) {
    this.selectSchedule.emit(item.id);
  }

  logEvent(eventName) {
    console.log(eventName);
  }
}
