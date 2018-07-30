import { Component, OnInit, Input } from '@angular/core';
import { TimeTable } from '../../models/timetable.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() timeTables: TimeTable[];

  exists = false;
  constructor() {}

  ngOnInit() {}
}
