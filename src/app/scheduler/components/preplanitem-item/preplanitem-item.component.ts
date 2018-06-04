import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PreplanItem } from '../../models/preplanitem.dto';
import { faTrash, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-preplanitem-item',
  templateUrl: './preplanitem-item.component.html',
  styleUrls: ['./preplanitem-item.component.css']
})
export class PrePlanitemItemComponent implements OnInit {
  @Input() preplanitem: PreplanItem;
  @Output() reselectContainers = new EventEmitter<number[]>();
  @Output() deleteBatch = new EventEmitter<number>();

  calendarIcon = faCalendarAlt;
  deleteIcon = faTrash;
  isDeleteBatchPopupVisible = false;

  constructor() {
    this.onCloseDeleteBatchPopup = this.onCloseDeleteBatchPopup.bind(this);
    this.onConfirmDeleteBatchPopup = this.onConfirmDeleteBatchPopup.bind(this);
  }

  ngOnInit() {
  }

  onCloseDeleteBatchPopup() {
    this.isDeleteBatchPopupVisible = false;
  }

  onConfirmDeleteBatchPopup() {
    this.deleteBatch.emit(this.preplanitem.itemBatch.idItemBatch);
    this.onCloseDeleteBatchPopup();
  }

  onShowDeleteBatchPopup() {
    this.isDeleteBatchPopupVisible = true;
  }

  onReselectContainers() {
    this.reselectContainers.emit(this.preplanitem.containers.map(i => i.container.id));
  }

}
