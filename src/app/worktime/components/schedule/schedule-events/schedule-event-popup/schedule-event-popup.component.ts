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

import { WEEKLY, DAILY } from '../../../../models/calendar.model';
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
  repetition = 1;
  selectedDays: string[] = [];
  repetitionVisible = false;
  form = this.fb.group({
    name: ['zzz', Validators.required],
    timeStart: ['', Validators.required],
    timeEnd: ['', Validators.required],
    repetition: ['1'],
    frequency: [WEEKLY]
  });

  frequencyItems: { key: string; name: string }[] = [
    { key: DAILY, name: 'dan' },
    { key: WEEKLY, name: 'teden' }
    // { key: 'MONTH', name: 'mesec' },
    // { key: 'YEAR', name: 'leto' }
  ];
  dayNames: string[] = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  /*
  byDay: StringKeyValue[] = [
    { key: '1', name: 'MO' },
    { key: '2', name: 'TU' },
    { key: '3', name: 'WE' },
    { key: '4', name: 'TH' },
    { key: '5', name: 'FR' },
    { key: '6', name: 'SA' },
    { key: '0', name: 'SU' }
  ];

  byDayEntities: { [key: string]: StringKeyValue } = this.byDay.reduce(
    (entities: { [key: string]: StringKeyValue }, day: StringKeyValue) => {
      return {
        ...entities,
        [day.key]: day
      };
    },
    {}
  );

  dayEntitiy: { [key: number]: StringKeyValue };
*/
  constructor(private fb: FormBuilder) {
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.exists = false;
    this.form.reset();
    if (this.timetable && this.timetable.id) {
      this.exists = true;
      this.form.patchValue({ frequency: WEEKLY });
      this.form.patchValue(this.timetable);
      this.selectedDays = ['MO'];
    } else {
      this.form.patchValue({ repetition: 1 });
      this.form.patchValue({ frequency: WEEKLY });
    }
    this.header = this.exists ? 'Urejanje dogodka' : 'Kreiranje dogodka';
  }

  onSubmit() {
    const rrule = this.getRecurrentString();
    console.log(rrule);
  }

  getRecurrentString() {
    const freq = ''; // this.frequencyControl.value;
    console.log(this.repetitionControl);
    return `FREQ=${freq}`;
  }

  onCancel() {
    this.cancel.emit(false);
  }

  popupVisibility(popupVisible: boolean) {
    this.cancel.emit(popupVisible);
  }

  frequencyChanged(event: any) {
    this.repetitionVisible = event.value === WEEKLY;
  }

  repetitionChanged(event: any) {
    const rep = event.value;
    let name = 'teden';
    if (rep >= 2) {
      name = rep > 2 ? 'tedni' : 'tedna';
    }
    const index = this.frequencyItems.findIndex(i => i.key === WEEKLY);
    this.frequencyItems[index].name = name;
    this.frequencyControl.patchValue({ frequency: WEEKLY });
    this.form.patchValue({ frequency: WEEKLY });
  }

  selectDay(key: string) {
    const isSelected = this.isSelected(key);
    if (isSelected) {
      // const { [key]: removed, ...days } = this.byDayEntities;
      const index = this.selectedDays.indexOf(key);
      if (index !== -1) {
        this.selectedDays = [...this.selectedDays.filter(item => item !== key)];
      }
    } else {
      this.selectedDays = [...this.selectedDays, key];
    }
    /*
    const day = this.byDayEntities[key];
    this.dayEntitiy = {
      ...this.dayEntitiy,
      [day.key]: day
    };
    */
    console.log(this.selectedDays);
  }

  isSelected(key: string): boolean {
    if (!this.selectedDays) {
      return false;
    }
    const isSelected = this.selectedDays.find(k => k === key);
    return !!isSelected;
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
  get repetitionControl() {
    return this.form.get('repetition') as FormControl;
  }
  get frequencyControl() {
    return this.form.get('frequency') as FormControl;
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

export interface StringKeyValue {
  key: string;
  name: string;
}
