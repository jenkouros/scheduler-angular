import { Component, Output, EventEmitter, SimpleChanges, OnChanges, Input } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calendar-generate',
  templateUrl: './calendar-generate.component.html',
  styleUrls: ['./calendar-generate.component.css']
})
export class CalendarGenerateComponent implements OnChanges {
  exists = false;
  header: string;
  date = new Date();

  @Input()
  visible: boolean;
  @Output()
  create = new EventEmitter<Date>();
  @Output()
  cancel = new EventEmitter<boolean>();

  form = this.fb.group({
    timeStart: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  get timeStartControl() {
    return this.form.get('timeStart') as FormControl;
  }

  get timeStartControlInvalid() {
    return this.timeStartControl.hasError('required');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.exists = false;
    this.form.reset();
    this.form.patchValue({ timeStart: new Date() });
    this.header = 'Uveljavi koledar';
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
      this.create.emit(value.timeStart);
    }
  }

  onCancel() {
    this.cancel.emit(false);
  }
}
