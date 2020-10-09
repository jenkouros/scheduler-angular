import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.css']
})
export class FieldsetComponent implements OnInit {
  @Input() header: string | null;
  @HostBinding('class.dx-fieldset') hostClass = true;
  @Input() actionTitle: string;
  @Input() actionType = 'Normal';
  @Output() actionClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onActionClick() {
    this.actionClick.emit();
  }

}
