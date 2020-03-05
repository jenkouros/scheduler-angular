import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Calendar } from '../../../models/calendar.model';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'app-calendar-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <app-popup height="auto" width="600px"
  [visible]="visible"
  [cancelCallback]="onCancel"
  [confirmCallback]="onSubmit"
  [title] = "header"
  >
    <form [formGroup]="form">
      <div class="dx-fieldset">
        <app-field label="{{translate('Scheduler_Name')}}">
          <dx-text-box placeholder="{{translate('Scheduler_Name_Dots')}}"
            formControlName="description"
            [isValid]="!descriptionControlInvalid">
          </dx-text-box>
          <p class="help-block" *ngIf="descriptionControlInvalid">
          {{translate('Input_Scheduler_Name')}}
          </p>
        </app-field>
        <app-field label="{{translate('Scheduler_Start')}}">
          <dx-date-box type="date" formControlName="timeStart"
          [isValid]="!timeStartControlInvalid"></dx-date-box>
        </app-field>
        <app-field label="{{translate('Scheduler_End')}}">
          <dx-date-box type="date" formControlName="timeEnd"
          [isValid]="!timeEndControlInvalid"
          ></dx-date-box>
        </app-field>
      </div>
    </form>
  </app-popup>
  `,
  styleUrls: ['./calendar-form.component.css']
})
export class CalendarFormComponent extends AppComponentBase implements OnChanges {
  exists = false;
  header: string;
  date = new Date();

  @Input()
  calendar: Calendar;
  @Input()
  visible: boolean;
  @Output()
  create = new EventEmitter<Calendar>();
  @Output()
  update = new EventEmitter<Calendar>();
  // @Output() remove = new EventEmitter<Calendar>();
  @Output()
  cancel = new EventEmitter<boolean>();

  form = this.fb.group({
    description: ['', Validators.required],
    timeStart: ['', Validators.required],
    timeEnd: ['', Validators.required],
    subCalendars: []
  });

  constructor(private fb: FormBuilder) {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  get descriptionControl() {
    return this.form.get('description') as FormControl;
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

  ngOnChanges(changes: SimpleChanges) {
    this.exists = false;
    this.form.reset();
    if (this.calendar && this.calendar.id) {
      this.exists = true;
      this.form.patchValue(this.calendar);
    }
    this.header = this.exists ? this.translate('Calendar_Editing') : this.translate('Calendar_Creating');
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
      if (!this.exists) {
        // create
        this.create.emit(value);
      } else {
        // update
        this.update.emit({ ...this.calendar, ...value });
      }
    }
  }

  updateTimeTable(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.calendar, ...value });
    }
  }
  /*
  removeTimeTable(form: FormGroup) {
    const { value, valid, touched } = form;
    this.update.emit({ ...this.calendar, ...value });
  }
*/
  isformValid(): boolean {
    const { valid } = this.form;

    return valid;
  }

  canUpdate(): boolean {
    const { valid, touched } = this.form;

    return valid && touched;
  }

  onCancel() {
    this.cancel.emit(false);
  }

  popupVisibility(popupVisible: boolean) {
    this.cancel.emit(popupVisible);
  }
}
