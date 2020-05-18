import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { AppComponentBase } from '../../app-component-base';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent extends AppComponentBase {
  @ViewChild(DxPopupComponent, { static:false }) popup: DxPopupComponent;

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
    super();
    this.onHidding = this.onHidding.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
  }


  init(e) {
    e.component.registerKeyHandler('enter', event => {
      if (this.visible) {
        if (this.confirmCallback) {
          this.confirmCallback();
        }
      }
    });
  }

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
