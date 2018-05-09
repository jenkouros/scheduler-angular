import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { visitSiblingRenderNodes } from '@angular/core/src/view/util';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  private visibleValue = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() title: string;

  get visible() {
    return this.visibleValue;
  }

  @Input() set visible(visible: boolean) {
    this.visibleValue = visible;
    this.visibleChange.emit(this.visibleValue);
  }



  @Input() hasConfirmBtn = true;
  @Input() hasCancelBtn = true;
  // @Input() hasScrollView = true;
  @Input() confirmCallback: () => void;
  @Input() cancelCallback: () => void;



  constructor() { }

  ngOnInit() {
  }

}
