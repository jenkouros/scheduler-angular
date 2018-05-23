import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { PlanItemHierarchyViewModel } from '../../../models/planitem.viewmodel';
import { NgForm, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { PlanItemHierarchyAlternative } from '../../../models/planitem.dto';
import { PreplanItemRequest } from '../../../models/preplanitem.dto';

@Component({
  selector: 'app-planitem-popup',
  templateUrl: './planitem-popup.component.html',
  styleUrls: ['./planitem-popup.component.css']
})
export class PlanitemPopupComponent implements OnChanges {
  @Input() visible = false;
  @Input() itemHierarchy: PlanItemHierarchyViewModel | null;
  @Output() close = new EventEmitter();
  @Output() createPreplanItems = new EventEmitter<PreplanItemRequest>();

  createPreplanItemsForm: FormGroup;
  alternatives: PlanItemHierarchyAlternative[] = [];

  constructor(private fb: FormBuilder) {
    this.onSubmit = this.onSubmit.bind(this);
    this.hidePlanInfo = this.hidePlanInfo.bind(this);
    this.initForm();
  }

  initForm() {
    this.createPreplanItemsForm = this.fb.group({
      batchQuantity: ['', Validators.required],
      batchCount: ['', Validators.required],
      idAlternative: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.itemHierarchy) {
      this.alternatives = this.itemHierarchy.planItemHierarchy.alternatives;

      this.createPreplanItemsForm.patchValue({
        batchQuantity: this.itemHierarchy.planItem.quantity,
        batchCount: 1,
        idAlternative: this.itemHierarchy.planItemHierarchy.alternatives.length > 0
          ? this.itemHierarchy.planItemHierarchy.alternatives[0].id
          : ''
      });
    }
  }

  get alternativeIdControl() {
    return this.createPreplanItemsForm.get('idAlternative') as FormControl;
  }

  selectAlternative(alternativeId: number) {
    this.createPreplanItemsForm.patchValue({
      idAlternative: alternativeId
    });
  }

  getSelectedAlternative() {
    return this.alternatives.find(i => i.id === this.alternativeIdControl.value);
  }

  popupVisibilityChanged(show: boolean) {
    if (!show) {
      this.hidePlanInfo();
    }
  }

  hidePlanInfo() {
    this.close.emit();
  }

  onSubmit() {
    const { value, valid } = this.createPreplanItemsForm;
    if (valid) {
      this.createPreplanItems.emit(value);
      this.hidePlanInfo();
    }
  }

}
