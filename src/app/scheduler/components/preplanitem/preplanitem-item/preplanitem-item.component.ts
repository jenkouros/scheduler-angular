import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PreplanItem } from '../../../models/preplanitem.dto';
import { faTrash, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'app-preplanitem-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './preplanitem-item.component.html',
  styleUrls: ['./preplanitem-item.component.css']
})
export class PrePlanitemItemComponent extends AppComponentBase implements OnInit {
  @Input() preplanitem: PreplanItem;
  @Input() groupColorNumber: number;
  @Output() reselectContainers = new EventEmitter<number[]>();
  @Output() showDeleteBatchPopup = new EventEmitter<number>();
  @Output() prePlanItemPlanSuggestion = new EventEmitter<number>();

  calendarIcon = faCalendarAlt;
  deleteIcon = faTrash;

  constructor() {
        super();
    }

  ngOnInit() {
  }

  onShowDeleteBatchPopup() {
    this.showDeleteBatchPopup.emit(this.preplanitem.itemBatch.idItemBatch);
  }

  onReselectContainers() {
    this.reselectContainers.emit(this.preplanitem.containers.map(i => i.container.id));
  }

  onPrePlanItemPlanSuggestion() {
    this.prePlanItemPlanSuggestion.emit(this.preplanitem.id);
  }
}
