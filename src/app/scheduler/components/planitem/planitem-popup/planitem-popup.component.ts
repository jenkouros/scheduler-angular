import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PlanItemHierarchyViewModel } from '../../../models/planitem.viewmodel';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { PlanItemHierarchyAlternative } from '../../../models/planitem.dto';
import * as fromStore from '../../../store';
import { Store } from '@ngrx/store';
import { PreplanItemRequest } from '../../../models/preplanitem.dto';
import { CreatePreplanItems } from '../../../store';

@Component({
  selector: 'app-planitem-popup',
  templateUrl: './planitem-popup.component.html',
  styleUrls: ['./planitem-popup.component.css']
})
export class PlanitemPopupComponent implements OnInit {
  selectedPlanItemHierarchy: PlanItemHierarchyViewModel | null;
  alternatives: PlanItemHierarchyAlternative[];
  selectedAlternativeId: number | null = null;
  popupVisible = false;

  @ViewChild('f') signupForm: NgForm;
  formModel: PreplanItemRequest = new PreplanItemRequest();

  constructor(private store: Store<fromStore.SchedulerState>) {
    this.onConfirm = this.onConfirm.bind(this);
    this.hidePlanInfo = this.hidePlanInfo.bind(this);
  }

  ngOnInit() {
    this.store.select(fromStore.getPlanItemUiState).subscribe(uiState => {
      this.popupVisible = uiState.popupOpened;
    });

    this.store.select(fromStore.getSelectedPlanItemHierarchy).subscribe(hierarchy => {
      this.selectedPlanItemHierarchy = hierarchy;
      this.formModel.batchQuantity = hierarchy ? hierarchy.planItem.quantityBatch : 0;
      this.formModel.batchCount = hierarchy ? Math.floor(hierarchy.planItem.quantity / hierarchy.planItem.quantityBatch) : 1;
      this.alternatives = hierarchy
        ? hierarchy.planItemHierarchy.alternatives
        : [];
      this.selectedAlternativeId = this.alternatives.length > 0 ? this.alternatives[0].id : null;
    });
  }

  selectAlternative(alternativeId: number) {
    this.selectedAlternativeId = alternativeId;
  }

  getSelectedAlternative() {
    return this.alternatives.find(i => i.id === this.selectedAlternativeId);
  }

  hidePlanInfo() {
    this.store.dispatch(new fromStore.HidePlanItemPopup());
  }
  onConfirm() {
    if (this.signupForm.valid) {
      this.signupForm.ngSubmit.emit();
      this.hidePlanInfo();
    }
  }

  onSubmit() {
    this.formModel.batchQuantity = this.signupForm.value.batchData.quantity;
    this.formModel.batchCount = this.signupForm.value.batchData.numberOfBatches;
    this.formModel.idAlternative = <number>this.selectedAlternativeId;

    this.store.dispatch(new CreatePreplanItems(this.formModel));
  }



}
