import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Plan } from '../../models';

@Component({
  selector: 'app-plan-delete-popup',
  templateUrl: './plan-delete-popup.component.html',
  styleUrls: ['./plan-delete-popup.component.css']
})
export class PlanDeletePopupComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<Plan>();
  @Output()
  cancel = new EventEmitter<boolean>();
  @Input()
  visible: boolean;
  @Input()
  plan: Plan | null;

  constructor() {
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  ngOnInit() {}

  onConfirm() {
    if (this.plan) {
      this.confirm.emit(this.plan);
    }
  }

  onCancel() {
    this.cancel.emit(false);
  }
}
