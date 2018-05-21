import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-datebox',
  templateUrl: './datebox.component.html',
  styleUrls: ['./datebox.component.css']
})
export class DateboxComponent implements OnInit {
  @Input() date = new Date();
  constructor() { }

  ngOnInit() {
  }

}
