import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-length',
  templateUrl: './page-length.component.html',
  styleUrls: ['./page-length.component.css']
})
export class PageLengthComponent implements OnInit {
  @Input() items = [1, 5, 10, 15, 25, 50, 100];
  @Output() change = new EventEmitter<number>();
  @Input() default: number;
  selected: number;
  constructor() { }

  ngOnInit() {
    this.selected = this.default || 15;
    this.onChange();
  }

  onChange() {
    this.change.emit(this.selected);
  }

}
