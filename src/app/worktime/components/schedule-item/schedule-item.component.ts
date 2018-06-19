import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {


  checkIcon = faCheck;


  @Input() scheduleData: any;
  @Input() selected: boolean;
  @Output() selectSchedule = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  onSelectShedule() {
    this.selectSchedule.emit(this.scheduleData.id);
  }

}
