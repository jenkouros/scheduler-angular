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

import { RRule } from 'rrule';
import { RecurrenceRule } from '../../../../helpers/recurrenceRule.helper';
import { SubCalendar } from '../../../../models/calendar.model';
import { first } from '../../../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-schedule-event-popup',
  templateUrl: './schedule-event-popup.component.html',
  styleUrls: ['./schedule-event-popup.component.css']
})
export class ScheduleEventPopupComponent implements OnChanges {
  @Input()
  subCalendar: SubCalendar;
  @Input()
  timetable: TimeTable;
  @Input()
  visible: boolean;
  @Output()
  create = new EventEmitter<TimeTable>();
  @Output()
  update = new EventEmitter<TimeTable>();
  @Output()
  cancel = new EventEmitter<boolean>();

  exists = false;
  header: string;
  repetition = 1;
  selectedDays: number[] = [];
  repetitionVisible = false;
  repeatingVisible = true;

  form = this.fb.group({
    name: ['', Validators.required],
    timeStart: ['', Validators.required],
    timeEnd: ['', Validators.required],
    timetableType: ['', Validators.required],
    repetitions: [{ value: '', disabled: true }],
    repeating: [''],
    frequency: ['']
  });

  // code lists
  timetableTypes: { key: number; name: string }[] = [
    { key: 1, name: 'Delovni' },
    { key: 2, name: 'Nedelovni' }
  ];

  repeatings: { key: boolean; name: string }[] = [
    { key: false, name: 'Se ne ponavlja' },
    { key: true, name: 'Se ponavlja' }
  ];
  frequencyItems: { key: number; name: string }[] = [
    { key: 1, name: 'Dan' },
    { key: 2, name: 'Teden' }
  ];
  days: string[] = ['P', 'T', 'S', 'Č', 'P', 'S', 'N'];

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
      this.form.patchValue({ repetitions: 1 });
      this.form.patchValue({
        timetableType: this.timetableTypes[this.timetable.idTimeTableType - 1]
          .key
      });
      // calendar rules
      const rules = RecurrenceRule.Parse(this.timetable.recurrenceRule);
      this.patchRules(rules);
    } else {
      this.selectedDays = [];
      this.form.patchValue({ timetableType: this.timetableTypes[0].key });
      this.form.patchValue({ repeating: false });
      this.form.patchValue({ repetitions: 1 });
      this.form.patchValue({ frequency: this.frequencyItems[0].key });
    }
    this.header = this.exists ? 'Urejanje dogodka' : 'Kreiranje dogodka';
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
    const rrule = this.getRecurrentString();
    const { value } = this.form;

    if (this.validToConfirm()) {
      if (!this.exists) {
        // create
        const event = {
          id: 0,
          idSubCalendar: this.subCalendar.id,
          name: value.name,
          description: '',
          timeStart: value.timeStart,
          timeEnd: value.timeEnd,
          idTimeTableType: value.timetableType,
          recurrenceRule: rrule
        };
        this.create.emit(event);
      } else {
        // update
        const event = {
          ...this.timetable,
          name: value.name,
          timeStart: value.timeStart,
          timeEnd: value.timeEnd,
          idTimeTableType: value.timetableType,
          recurrenceRule: rrule
        };
        this.update.emit(event);
      }
    }
  }

  patchRules(rules: any) {
    this.form.patchValue({ repeating: false });
    if (rules) {
      this.form.patchValue({ repeating: true });
      if (rules.freq) {
        this.form.patchValue({
          frequency: this.frequencyItems[rules.freq - 1].key
        });
      }
      if (rules.byweekday) {
        this.selectedDays = rules.byweekday.map(d => d.weekday);
        this.repetitionVisible = true;
      }
    }
  }
  getRecurrentString() {
    const repeating = this.repeatingControl.value;

    // se ene ponavlja
    if (!repeating) {
      return null;
    }
    const freq = this.frequencyControl.value;
    const byweekday = this.selectedDays.sort((a, b) => a - b);
    const rule = new RRule({
      freq,
      byweekday
    });
    return rule.toString();
  }

  onCancel() {
    this.cancel.emit(false);
  }

  popupVisibility(popupVisible: boolean) {
    this.cancel.emit(popupVisible);
  }

  frequencyChanged(event: any) {
    this.repetitionVisible = event.value === this.frequencyItems[1].key;
  }

  repeatingChanged(event: any) {
    this.repeatingVisible = event.value;
  }

  selectDay(key: number) {
    if (this.isSelected(key)) {
      // const { [key]: removed, ...days } = this.byDayEntities;
      const index = this.selectedDays.indexOf(key);
      if (index !== -1) {
        this.selectedDays = [...this.selectedDays.filter(item => item !== key)];
      }
    } else {
      this.selectedDays = [...this.selectedDays, key];
    }

    // mark as touched
    this.form.markAsTouched();
  }

  isSelected(key: number): boolean {
    const isSelected = this.selectedDays.find((k: number) => k === key);

    return isSelected !== undefined;
  }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }
  get timeStartControl() {
    return this.form.get('timeStart') as FormControl;
  }
  get timeEndControl() {
    return this.form.get('timeEnd') as FormControl;
  }
  get repetitionControl() {
    return this.form.get('repetition') as FormControl;
  }
  get frequencyControl() {
    return this.form.get('frequency') as FormControl;
  }

  get repeatingControl() {
    return this.form.get('repeating') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.invalid; // && this.descriptionControl.touched;
  }
  get timeStartControlInvalid() {
    return this.timeStartControl.hasError('required'); // && this.timeStartControl.touched
  }
  get timeEndControlInvalid() {
    return this.timeEndControl.hasError('required'); // && this.timeEndControl.touched
  }
}
