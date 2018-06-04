import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Input } from '@angular/core';

@Component({
  selector: 'app-mass-lock-popup',
  templateUrl: './mass-lock-popup.component.html',
  styleUrls: ['./mass-lock-popup.component.css']
})
export class MassLockPopupComponent implements OnInit {
  containerIds: number[];
  visible = false;
  dateTo: Date;
  dateFrom: Date;

  constructor(private store: Store<fromStore.SchedulerState>) {
    this.confirmMassLock = this.confirmMassLock.bind(this);
  }

  ngOnInit() {
    this.store.select(fromStore.getEventsUiState).subscribe(state => {
      this.containerIds = state.massLockPopup.massLockPopupContainers;
      this.visible = state.massLockPopup.visibility;
    });
  }

  visibilityChanged(popupShow: boolean) {
    if (!popupShow) {
      this.store.dispatch(new fromStore.ToggleMassLockPopup({ containerIds: [], visibility: false }));
    }
  }

  confirmMassLock() {
    this.store.dispatch(new fromStore.MassToggleEventsLock({
      containerIds: this.containerIds,
      fromDate: this.dateFrom,
      toDate: this.dateTo
    }));

    this.store.dispatch(new fromStore.ToggleMassLockPopup({ containerIds: [], visibility: false }));
  }

}
