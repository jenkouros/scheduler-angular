import {
  Component,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { TimeTable } from '../../../../models/timetable.model';

@Component({
  selector: 'app-schedule-delete-popup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-delete-popup.component.html',
  styleUrls: ['./schedule-delete-popup.component.css']
})
export class ScheduleDeletePopupComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<TimeTable>();
  @Output()
  cancel = new EventEmitter<boolean>();
  @Input()
  visible: boolean;
  @Input()
  timetable: TimeTable | null;

  constructor() {
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  ngOnInit() {}
  onConfirm() {
    if (this.timetable) {
      this.confirm.emit(this.timetable);
    }
  }

  onCancel() {
    this.cancel.emit(false);
  }
}
