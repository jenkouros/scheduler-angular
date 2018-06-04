import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datebox',
  templateUrl: './datebox.component.html',
  styleUrls: ['./datebox.component.css']
})
export class DateboxComponent implements OnInit, AfterViewInit {
  @Input() date = new Date();
  @Input() type = 'date';
  @Output() change = new EventEmitter<Date>();
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.change.emit(this.date);
  }

  dateChanged(date: Date) {
    this.change.emit(date);
  }

}
