import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeTable } from '../../../models/timetable.model';

@Component({
  selector: 'app-schedule-events',
  templateUrl: './schedule-events.component.html',
  styleUrls: ['./schedule-events.component.css']
})
export class ScheduleEventsComponent implements OnInit {
  @Input() dataSource: TimeTable[];
  @Output() editItem = new EventEmitter<number>();
  @Output() selectItem = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  onSelectItem(item: TimeTable) {
    if (item) {
      this.selectItem.emit(item.id);
    }
  }

  onEditItem(item: TimeTable) {
    if (item) {
      this.editItem.emit(item.id);
    }
  }
}
