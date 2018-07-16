import { Component, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Output } from '@angular/core';
import { PreplanitemUiState } from '../../../models/preplanItem.store';
import { Input } from '@angular/core';

@Component({
  selector: 'app-preplanitem-delete-popup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './preplanitem-delete-popup.component.html',
  styleUrls: ['./preplanitem-delete-popup.component.css']
})
export class PreplanitemDeletePopupComponent implements OnInit {
  @Output() deleteBatch = new EventEmitter<number>();
  @Output() hideDeleteBatchPopup = new EventEmitter();
  @Input() preplanItemUiState: PreplanitemUiState | null;

  constructor() {
    this.onHideDeleteBatchPopup = this.onHideDeleteBatchPopup.bind(this);
    this.onConfirmDeleteBatchPopup = this.onConfirmDeleteBatchPopup.bind(this);
  }

  ngOnInit() {
  }

  popupVisibilityChanged(show: boolean) {
    if (!show && this.preplanItemUiState !== null &&
      this.preplanItemUiState.isDeletePopupVisible) {
      this.onHideDeleteBatchPopup();
    }
  }

  onHideDeleteBatchPopup() {
    this.hideDeleteBatchPopup.emit();
  }

  onConfirmDeleteBatchPopup() {
    if (this.preplanItemUiState !== null &&
      this.preplanItemUiState.idDeleteItemBatchCandidate !== null) {
        this.deleteBatch.emit(this.preplanItemUiState.idDeleteItemBatchCandidate);
        this.onHideDeleteBatchPopup();
      }

  }


}
