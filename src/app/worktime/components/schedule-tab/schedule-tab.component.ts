import { Component, OnInit } from '@angular/core';
import { TimeTableType, TimeTable } from '../../models/timetable.model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-schedule-tab',
  templateUrl: './schedule-tab.component.html',
  styleUrls: ['./schedule-tab.component.css']
})
export class ScheduleTabComponent implements OnInit {
  constructor() {}
  @Input() timeTablesTypes: TimeTableType[];
  @Input() timeTables: TimeTable[];

  ngOnInit() {}
}
