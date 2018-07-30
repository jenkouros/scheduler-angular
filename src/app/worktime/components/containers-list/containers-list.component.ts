import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeTable } from '../../models/timetable.model';

@Component({
  selector: 'app-containers-list',
  templateUrl: './containers-list.component.html',
  styleUrls: ['./containers-list.component.css']
})
export class ContainersListComponent implements OnInit {
  @Input() dataSource: TimeTable[];
  @Input() header: string;
  @Output() selected = new EventEmitter<number[]>();

  dataSource1: TimeTable[] = [
    {
      id: 1,
      description: '111111',
      idCalendar: 1,
      idTimeTableType: 1,
      name: 'sdfsd',
      timeStart: new Date(),
      timeEnd: new Date(),
      recurrenceRule: 'sdsd'
    },
    {
      id: 2,
      description: '2222222',
      idCalendar: 1,
      idTimeTableType: 1,
      name: 'sdfsd',
      timeStart: new Date(),
      timeEnd: new Date(),
      recurrenceRule: 'sdsd'
    }
  ];
  constructor() {}

  ngOnInit() {}

  onSelected(item: any) {
    if (item.selectedRowKeys) {
      console.log(item);
      this.selected.emit(item.selectedRowKeys);
    }
  }
}
