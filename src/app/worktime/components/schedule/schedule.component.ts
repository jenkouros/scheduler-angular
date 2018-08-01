import { Component, OnInit, Input } from '@angular/core';
import { TimeTable } from '../../models/timetable.model';
import { Container } from '../../../scheduler/models/container.dto';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() timeTables: TimeTable[];
  @Input() avalableContainers: Container[];
  @Input() selectedContainers: Container[];

  exists = false;
  constructor() {}

  ngOnInit() {
    console.log('app-schedule', this.timeTables);
  }
}
