import { Component, OnInit, Input, HostBinding } from '@angular/core';


@Component({
  selector: 'app-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.css']
})
export class FieldsetComponent implements OnInit {
  @Input() header: string | null;
  @HostBinding('class.dx-fieldset') hostClass = true;

  constructor() { }

  ngOnInit() {
  }

}
