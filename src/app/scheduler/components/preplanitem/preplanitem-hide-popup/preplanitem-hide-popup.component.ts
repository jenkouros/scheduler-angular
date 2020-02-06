import { AppComponentBase } from '../../../../shared/app-component-base';
import { Component, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Output } from '@angular/core';
import { PreplanitemUiState } from '../../../models/preplanItem.store';
import { Input } from '@angular/core';

@Component({
  selector: 'app-preplanitem-hide-popup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './preplanitem-hide-popup.component.html',
  styleUrls: ['./preplanitem-hide-popup.component.css']
})
export class PreplanitemHidePopupComponent extends AppComponentBase implements OnInit {
  @Output() hidePreplanItem = new EventEmitter<number>();
  @Output() hidePreplanItemHidePopup = new EventEmitter();
  @Input() preplanItemUiState: PreplanitemUiState | null;

  constructor() {
    super();
    this.onHidePreplanItemHidePopup = this.onHidePreplanItemHidePopup.bind(this);
    this.onConfirmHidePreplanItemPopup = this.onConfirmHidePreplanItemPopup.bind(this);
  }

  ngOnInit() {
  }

  popupVisibilityChanged(show: boolean) {
    if (!show && this.preplanItemUiState !== null &&
      this.preplanItemUiState.isHidePreplanItemPopupVisible) {
      this.onHidePreplanItemHidePopup();
    }
  }

  onHidePreplanItemHidePopup() {
    this.hidePreplanItemHidePopup.emit();
  }

  onConfirmHidePreplanItemPopup() {
    if (this.preplanItemUiState !== null &&
      this.preplanItemUiState.idPreplanItemHideCandidate !== null) {
        this.hidePreplanItem.emit(this.preplanItemUiState.idPreplanItemHideCandidate);
        this.onHidePreplanItemHidePopup();
      }

  }


}
