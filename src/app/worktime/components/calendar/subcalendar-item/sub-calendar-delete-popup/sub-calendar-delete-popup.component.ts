import {
  Component,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-sub-calendar-delete-popup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sub-calendar-delete-popup.component.html',
  styleUrls: ['./sub-calendar-delete-popup.component.css']
})
export class SubCalendarDeletePopupComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<boolean>();
  @Output()
  cancel = new EventEmitter<boolean>();
  @Input()
  visible: boolean;

  constructor() {
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  ngOnInit() {}
  onConfirm() {
    this.confirm.emit(true);
  }

  onCancel() {
    this.cancel.emit(false);
  }
}
