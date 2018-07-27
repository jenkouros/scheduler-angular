import { Component, OnInit, AfterViewInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { DxDateBoxComponent } from 'devextreme-angular';
import * as moment from 'moment';

@Component({
  selector: 'app-datebox',
  templateUrl: './datebox.component.html',
  styleUrls: ['./datebox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateboxComponent),
      multi: true
    }
  ]
})
export class DateboxComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild(DxDateBoxComponent) dateBox: DxDateBoxComponent;
  @Input() date = new Date();
  @Input() type = 'date';
  @Input() max: Date | undefined = undefined;
  @Input() min: Date | undefined = undefined;
  @Output() change = new EventEmitter<Date>();

  invalidDateFormatMessage = 'Neveljaven format datuma';

  propagateChange = (_: any) => {};

  constructor(@Inject(LOCALE_ID) private localId) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.change.emit(this.date);
  }

  dateChanged(date) {
    console.log(date);
    this.change.emit(date);
    this.propagateChange(date);
  }

  // Use this method if you allow user input change... Invalid date input change is not sync with visual change interface
  // onChanged(e): void {
  //   if (!this.dateBox.isValid) {
  //     if (this.dateBox.validationError.message !== this.invalidDateFormatMessage) {
  //       const changedDate = moment(e.srcElement.value, 'L LT', this.localId);
  //       if (changedDate.isValid) {
  //         this.dateChanged(changedDate.toDate());
  //         return;
  //       }
  //     }
  //     this.dateChanged(NaN);
  //   }

  // }

  writeValue(obj: any): void {
    if (obj) {
      this.date = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }

}
