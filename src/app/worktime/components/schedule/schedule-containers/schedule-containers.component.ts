import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TimeTable } from '../../../models/timetable.model';
import { Container } from '../../../../scheduler/models/container.dto';

@Component({
  selector: 'app-schedule-containers',
  templateUrl: './schedule-containers.component.html',
  styleUrls: ['./schedule-containers.component.css']
})
export class ScheduleContainersComponent implements OnInit {
  @Input() dataSource: TimeTable[];
  @Output() add = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  leftArrowIcon = faArrowLeft;
  rightArrowIcon = faArrowRight;
  toAddContainers: number[];
  toRemoveContainers: number[];
  isAddingEnabled = false;
  isRemovingEnabled = false;
  constructor() {}

  ngOnInit() {}

  onSelected(keys: number[]) {
    if (keys.length > 0) {
      this.toAddContainers = keys;
    }
    this.isAddingEnabled = keys.length > 0;
  }

  onDeSelected(keys: number[]) {
    if (keys.length > 0) {
      this.toRemoveContainers = keys;
    }
    this.isRemovingEnabled = keys.length > 0;
  }

  onRemoveItems(item: Container) {
    console.log(this.toRemoveContainers);
  }

  onAddItems() {
    console.log(this.toAddContainers);
  }
}
