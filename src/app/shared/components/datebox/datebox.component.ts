import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

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
  @Input() date = new Date();
  @Input() type = 'date';
  @Input() isValid = true;
  @Output() change = new EventEmitter<Date>();

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.change.emit(this.date);
  }

  dateChanged(date: Date) {
    this.change.emit(date);
    this.propagateChange(date);
  }

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
