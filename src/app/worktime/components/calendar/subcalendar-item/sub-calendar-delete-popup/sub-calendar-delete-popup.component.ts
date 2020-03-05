import {
  Component,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { SubCalendar } from '../../../../models/calendar.model';

@Component({
  selector: 'app-sub-calendar-delete-popup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sub-calendar-delete-popup.component.html',
  styleUrls: ['./sub-calendar-delete-popup.component.css']
})
export class SubCalendarDeletePopupComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<SubCalendar>();
  @Output()
  cancel = new EventEmitter<boolean>();
  @Input()
  visible: boolean;
  @Input()
  subCalendar: SubCalendar | null;

  constructor() {
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  ngOnInit() {}
  onConfirm() {
    if (this.subCalendar) {
      this.confirm.emit(this.subCalendar);
    }
  }

  onCancel() {
    this.cancel.emit(false);
  }
}
