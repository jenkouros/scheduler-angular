import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DateValidators } from '../../../../shared/validators/date.validators';

@Component({
  selector: 'app-mass-lock-popup',
  templateUrl: './mass-lock-popup.component.html',
  styleUrls: ['./mass-lock-popup.component.css']
})
export class MassLockPopupComponent implements OnInit {
  containerIds: number[];
  visible = false;
  massLockForm: FormGroup;

  constructor(private store: Store<fromStore.SchedulerState>, private fb: FormBuilder) {
    this.confirmMassLock = this.confirmMassLock.bind(this);
    this.cancelMassLock = this.cancelMassLock.bind(this);
    this.initForm();
  }

  initForm() {
    const date = new Date();
    this.massLockForm = this.fb.group(
      {
        fromDate: [date, Validators.required],
        toDate: [date, Validators.required]
      },
      {
        validator: [
          DateValidators.minDate('toDate', 'fromDate')
        ]
      });
  }

  ngOnInit() {
    this.store.select(fromStore.getEventsUiState).subscribe(state => {
      this.containerIds = state.massLockPopup.massLockPopupContainers;
      this.visible = state.massLockPopup.visibility;
    });
  }

  // visibilityChanged(popupShow: boolean) {
  //   if (!popupShow) {
  //     this.store.dispatch(new fromStore.ToggleMassLockPopup({ containerIds: [], visibility: false }));
  //   }
  // }

  cancelMassLock() {
    this.store.dispatch(new fromStore.ToggleMassLockPopup({ containerIds: [], visibility: false }));
  }

  confirmMassLock() {
    const { value, valid } = this.massLockForm;

    if (!valid) {
      return;
    }

    this.store.dispatch(new fromStore.MassToggleEventsLock({
      containerIds: this.containerIds,
      fromDate: value.fromDate,
      toDate: value.toDate
    }));

    this.store.dispatch(new fromStore.ToggleMassLockPopup({ containerIds: [], visibility: false }));
  }

  get fromDate() {
    return this.massLockForm.get('fromDate') as FormControl;
  }

}
