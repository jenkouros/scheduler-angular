import { Component, OnInit } from '@angular/core';
import { TimeTableType, TimeTable } from '../../models/timetable.model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-schedule-tab',
  templateUrl: './schedule-tab.component.html',
  styleUrls: ['./schedule-tab.component.css']
})
export class ScheduleTabComponent implements OnInit {
  timeTableEvent: TimeTable;
  constructor() {}

  @Input() timeTables: TimeTable[];
  @Input() timeTablesTypes: TimeTableType[];

  ngOnInit() {
    console.log(this.timeTablesTypes);
  }

  onEdit(timeTableEvent: TimeTable) {
    this.timeTableEvent = timeTableEvent;
    console.log(timeTableEvent);
  }
}
