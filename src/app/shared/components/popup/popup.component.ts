import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Output() visibilityChanged = new EventEmitter<boolean>();
  @Input() title: string;
  @Input() visible = false;

  @Input() hasConfirmBtn = true;
  @Input() hasCancelBtn = true;
  @Input() validToConfirm: boolean | null = null;
  // @Input() hasScrollView = true;
  @Input() confirmCallback: () => void;
  @Input() cancelCallback: () => void;
  @Input() height: any = () => window.innerHeight * 0.8;
  @Input() width: any = () => window.innerWidth * 0.8;

  constructor() {
    // this.hide = this.hide.bind(this);
    this.onHidding = this.onHidding.bind(this);
  }

  ngOnInit() {
    if (!this.cancelCallback) {
      this.cancelCallback = this.onHidding;
    }
  }

  // hide() {
  //   this.visible = false;
  // }

  onHidding() {
    this.visibilityChanged.emit(false);
  }

}
