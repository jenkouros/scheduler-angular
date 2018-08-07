import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Container } from '../../../../scheduler/models/container.dto';
import {
  SubCalendar,
  SelectedContainers
} from '../../../models/calendar.model';

@Component({
  selector: 'app-schedule-containers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-containers.component.html',
  styleUrls: ['./schedule-containers.component.css']
})
export class ScheduleContainersComponent implements OnInit {
  @Input() selectedSubCalendar: SubCalendar;
  @Input() avalableContainers: Container[];
  @Input() selectedContainers: Container[];

  @Output() add = new EventEmitter<SelectedContainers>();
  @Output() remove = new EventEmitter<SelectedContainers>();

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
    this.remove.emit({
      id: this.selectedSubCalendar.id,
      containersIds: this.toRemoveContainers
    });
  }

  onAddItems() {
    this.add.emit({
      id: this.selectedSubCalendar.id,
      containersIds: this.toAddContainers
    });
  }
}
