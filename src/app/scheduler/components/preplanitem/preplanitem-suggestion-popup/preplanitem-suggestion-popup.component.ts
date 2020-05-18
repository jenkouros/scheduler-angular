// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { PreplanitemUiState } from '../../../models/preplanItem.store';
// import { PlannedEvent } from '../../../models/event.model';

// @Component({
//   selector: 'app-preplanitem-suggestion-popup',
//   templateUrl: './preplanitem-suggestion-popup.component.html',
//   styleUrls: ['./preplanitem-suggestion-popup.component.css']
// })
// export class PreplanitemSuggestionPopupComponent implements OnInit {
//   @Input() preplanItemUiState: PreplanitemUiState | null;
//   @Input() planSuggestedItems: PlannedEvent[] | null;
//   @Output() hideDeletePreplanSuggestionPopup = new EventEmitter();

//   constructor() {
//     this.onHidePreplanSuggestionPopup = this.onHidePreplanSuggestionPopup.bind(this);
//     this.onConfirmPreplanSuggestionPopup = this.onConfirmPreplanSuggestionPopup.bind(this);
//   }

//   ngOnInit() {
//     // alert('234' + this.preplanItemUiState);
//   }

//   onHidePreplanSuggestionPopup() {
//     // this.hideDeletePreplanSuggestionPopup.emit();
//   }

//   onConfirmPreplanSuggestionPopup() {
//     alert('234' + this.preplanItemUiState);
//     // if (this.preplanItemUiState !== null &&
//     //   this.preplanItemUiState.idDeleteItemBatchCandidate !== null) {
//     //     this.deleteBatch.emit(this.preplanItemUiState.idDeleteItemBatchCandidate);
//     //     this.onHideDeleteBatchPopup();
//     //   }

//   }
// }
