import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DxPopupComponent } from '../../../../../node_modules/devextreme-angular';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @ViewChild(DxPopupComponent) popup: DxPopupComponent;
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
    this.hidePopup = this.hidePopup.bind(this);
  }

  ngOnInit() {
  }

  // hide() {
  //   this.visible = false;
  // }
  hidePopup() {
    this.visible = false;
    this.popup.instance.hide();
  }

  onHidding() {
    if (this.cancelCallback) {
      this.cancelCallback();
    }
  }

}
