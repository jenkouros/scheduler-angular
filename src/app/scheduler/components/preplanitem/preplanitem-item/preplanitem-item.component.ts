import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PreplanItem } from '../../../models/preplanitem.dto';
import { faTrash, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-preplanitem-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './preplanitem-item.component.html',
  styleUrls: ['./preplanitem-item.component.css']
})
export class PrePlanitemItemComponent implements OnInit {
  @Input() preplanitem: PreplanItem;
  @Input() groupColorNumber: number;
  @Output() reselectContainers = new EventEmitter<number[]>();
  @Output() showDeleteBatchPopup = new EventEmitter<number>();

  calendarIcon = faCalendarAlt;
  deleteIcon = faTrash;

  ngOnInit() {
  }

  onShowDeleteBatchPopup() {
    this.showDeleteBatchPopup.emit(this.preplanitem.itemBatch.idItemBatch);
  }

  onReselectContainers() {
    this.reselectContainers.emit(this.preplanitem.containers.map(i => i.container.id));
  }

}
