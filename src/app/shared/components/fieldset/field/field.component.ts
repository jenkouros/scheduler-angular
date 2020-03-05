import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  @Input() label: string | null;
  @Input() value: string | null;
  @Input() isStatic = false;
  @HostBinding('class.dx-field') hostClass = true;
  constructor() { }

  ngOnInit() {
  }

}
