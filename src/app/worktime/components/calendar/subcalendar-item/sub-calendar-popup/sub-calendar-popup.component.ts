import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { SubCalendar } from '../../../../models/calendar.model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sub-calendar-popup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sub-calendar-popup.component.html',
  styleUrls: ['./sub-calendar-popup.component.css']
})
export class SubCalendarPopupComponent implements OnChanges {
  @Input()
  subCalendar: SubCalendar;
  @Input()
  visible: boolean;
  @Output()
  update = new EventEmitter<SubCalendar>();
  @Output()
  cancel = new EventEmitter<boolean>();

  exists = false;
  header: string;
  repetition = 1;
  selectedDays: number[] = [];
  repetitionVisible = false;
  repeatingVisible = true;

  form = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.exists = false;
    this.form.reset();
    if (this.subCalendar && this.subCalendar.id) {
      this.exists = true;

      this.form.patchValue(this.subCalendar);
    }
    this.header = this.exists ? 'Urejanje urnika' : 'Kreiranje urnika';
  }

  validToConfirm() {
    const { valid, touched } = this.form;
    if (!this.exists) {
      return valid;
    } else {
      return touched && valid;
    }
  }

  onSubmit() {
    const { value } = this.form;
    if (this.validToConfirm()) {
      if (this.exists) {
        // update
        this.update.emit({ ...this.subCalendar, ...value });
      }
    }
  }

  onCancel() {
    this.cancel.emit(false);
  }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.invalid; // && this.descriptionControl.touched;
  }
}
