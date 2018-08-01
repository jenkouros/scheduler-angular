import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { TimeTable } from '../../../../models/timetable.model';
import {
  FormBuilder,
  Validators,
  FormControl
} from '../../../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-schedule-event-popup',
  templateUrl: './schedule-event-popup.component.html',
  styleUrls: ['./schedule-event-popup.component.css']
})
export class ScheduleEventPopupComponent implements OnChanges {
  @Input() timetable: TimeTable;
  @Input() visible: boolean;
  @Output() create = new EventEmitter<TimeTable>();
  @Output() update = new EventEmitter<TimeTable>();
  @Output() cancel = new EventEmitter<boolean>();

  exists = false;
  header: string;

  form = this.fb.group({
    name: ['', Validators.required],
    timeStart: ['', Validators.required],
    timeEnd: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.exists = false;
    this.form.reset();
    if (this.timetable && this.timetable.id) {
      this.exists = true;
      this.form.patchValue(this.timetable);
    }
    this.header = this.exists ? 'Urejanje dogodka' : 'Kreiranje dogodka';
  }

  onSubmit() {}

  onCancel() {
    this.cancel.emit(false);
  }

  popupVisibility(popupVisible: boolean) {
    this.cancel.emit(popupVisible);
  }

  get descriptionControl() {
    return this.form.get('name') as FormControl;
  }
  get timeStartControl() {
    return this.form.get('timeStart') as FormControl;
  }
  get timeEndControl() {
    return this.form.get('timeEnd') as FormControl;
  }

  get descriptionControlInvalid() {
    return this.descriptionControl.invalid; // && this.descriptionControl.touched;
  }
  get timeStartControlInvalid() {
    return this.timeStartControl.hasError('required'); // && this.timeStartControl.touched
  }
  get timeEndControlInvalid() {
    return this.timeEndControl.hasError('required'); // && this.timeEndControl.touched
  }
}
