import { Component, OnInit, Input } from '@angular/core';
import { PreplanItem } from '../../../models/preplanitem.dto';
import { faTrash, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
@Component({
  selector: 'app-pre-planitem-item',
  templateUrl: './pre-planitem-item.component.html',
  styleUrls: ['./pre-planitem-item.component.css']
})
export class PrePlanitemItemComponent implements OnInit {
  @Input() preplanitem: PreplanItem;
  calendarIcon = faCalendarAlt;
  deleteIcon = faTrash;
  isDeleteBatchPopupVisible = false;
  constructor(private store: Store<fromStore.SchedulerState>) {
    this.closeDeleteBatchPopup = this.closeDeleteBatchPopup.bind(this);
    this.confirmDeleteBatchPopup = this.confirmDeleteBatchPopup.bind(this);
  }

  ngOnInit() {
  }


  closeDeleteBatchPopup() {
    this.isDeleteBatchPopupVisible = false;
  }

  confirmDeleteBatchPopup() {
    this.store.dispatch(new fromStore.DeleteItemBatch(this.preplanitem.itemBatch.idItemBatch));
  }

  showDeleteBatchPopup() {
    this.isDeleteBatchPopupVisible = true;
  }

  reselectContainers() {
    this.store.dispatch(new fromStore.ReselectContainers(this.preplanitem.containers.map(i => i.container.id)));
  }

}
