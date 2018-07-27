import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Calendar } from '../../models/calendar.model';

@Component({
  selector: 'app-calendar-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

  <form [formGroup]="form">
  <div class="dx-fieldset">
    <div class="dx-fieldset-header">Urejanje urnika</div>
        <app-field label="Naziv urnika">
          <dx-text-box placeholder="Naziv urnika..."
            formControlName="description"
            [(isValid)]="!descriptionControlInvalid">
          </dx-text-box>
          <p class="help-block" *ngIf="descriptionControlInvalid">
            Vnesite naziv urnika.
          </p>
        </app-field>
        <app-field label="Začetek urnika">
          <dx-date-box type="date" formControlName="timeStart"
          [isValid]="!timeStartControlInvalid"></dx-date-box>
        </app-field>
        <app-field label="Konec urnika">
          <app-datebox type="datetime" formControlName="timeEnd"
          [isValid]="!timeEndControlInvalid"
          ></app-datebox>
        </app-field>
        <ng-content></ng-content>

        <div class="actions">
        <button disabled
            type="button"
            class="btn btn-danger"
            *ngIf="exists"
            (click)="removeTimeTable(form)">
            Briši urnik
          </button>

          <button
            type="button"
            class="btn btn-success"
            *ngIf="!exists"
            [disabled]="!isformValid()"
            (click)="createTimeTable(form)">
            Kreiraj urnik
          </button>

          <button
            type="button"
            class="btn btn-success"
            *ngIf="exists"
            [disabled]="!canUpdate()"
            (click)="updateTimeTable(form)">
            Shrani urnik
          </button>

        </div>
      </div>
  </form>

  `,
  styleUrls: ['./calendar-form.component.css']
})
export class CalendarFormComponent implements OnChanges {
  exists = false;
  date = new Date();
  @Input() calendar: Calendar;
  @Output() create = new EventEmitter<Calendar>();
  @Output() update = new EventEmitter<Calendar>();
  @Output() remove = new EventEmitter<Calendar>();

  form = this.fb.group({
    description: ['', Validators.required],
    timeStart: ['', Validators.required],
    timeEnd: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

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
    if (this.calendar && this.calendar.id) {
      this.exists = true;
      this.form.patchValue(this.calendar);
    }
  }

  createTimeTable(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }

  updateTimeTable(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.calendar, ...value });
    }
  }

  removeTimeTable(form: FormGroup) {
    const { value, valid, touched } = form;
    this.update.emit({ ...this.calendar, ...value });
  }

  isformValid(): boolean {
    const { valid } = this.form;

    return valid;
  }

  canUpdate(): boolean {
    const { valid, touched } = this.form;

    return valid && touched;
  }
}
