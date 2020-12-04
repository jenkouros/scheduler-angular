import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { appSettings } from '../../../../../environments/environment';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { FormValidators } from '../../../../shared/validators/form.validators';
import { ItemHierarchyAlternative } from '../../../models/item.dto';
import { ItemUIState } from '../../../models/item.store';
import { ItemHierarchyViewModel } from '../../../models/item.viewmodel';
import { PreplanItemRequest } from '../../../models/preplanitem.dto';

@Component({
  selector: 'app-item-popup',
  templateUrl: './item-popup.component.html',
  styleUrls: ['./item-popup.component.css']
})
export class ItemPopupComponent extends AppComponentBase implements OnChanges {
  @Input() uiState: ItemUIState | null;
  visible = false;
  @Input() itemHierarchy: ItemHierarchyViewModel | null;
  @Output() close = new EventEmitter();
  @Output() createPreplanItems = new EventEmitter<PreplanItemRequest>();

  settings = appSettings;
  createPreplanItemsForm: FormGroup;
  alternatives: ItemHierarchyAlternative[] = [];

  constructor(private fb: FormBuilder) {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.hideItemInfo = this.hideItemInfo.bind(this);
    this.initForm();
  }

  initForm() {
    this.createPreplanItemsForm = this.fb.group({
      batchQuantity: ['', Validators.required],
      batchCount: ['', Validators.required],
      idAlternative: ['', [Validators.required, FormValidators.noEmptyValue]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.itemHierarchy) {
      this.alternatives = this.itemHierarchy.itemHierarchy.alternatives;

      this.createPreplanItemsForm.patchValue({
        batchQuantity: this.itemHierarchy.itemHierarchy.quantityBatch,
        batchCount: Math.max(1,
          Math.ceil(this.itemHierarchy.itemHierarchy.quantity / Math.max(this.itemHierarchy.itemHierarchy.quantityBatch, 1))),
        idAlternative: this.itemHierarchy.itemHierarchy.alternatives.length > 0
          ? this.itemHierarchy.itemHierarchy.alternatives[0].id
          : ''
      });
    }
    if (this.uiState && this.visible !== this.uiState.popupOpened) {
      this.visible = this.uiState.popupOpened;
    }
  }

  get alternativeIdControl() {
    return this.createPreplanItemsForm.get('idAlternative') as FormControl;
  }
  get batchQuantityControl() {
    return this.createPreplanItemsForm.get('batchQuantity') as FormControl;
  }
  get batchCountControl() {
    return this.createPreplanItemsForm.get('batchCount') as FormControl;
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
      this.hideItemInfo();
    }
  }

  hideItemInfo() {
    this.close.emit();
    this.createPreplanItemsForm.reset();
  }

  onSubmit() {
    const { value, valid } = this.createPreplanItemsForm;
    if (valid) {
      this.createPreplanItems.emit(value);
      this.hideItemInfo();
    } else {
      this.markFormControlsAsTouched();
    }
  }

  markFormControlsAsTouched() {
    Object.keys(this.createPreplanItemsForm.controls).forEach(field => {
      const control = this.createPreplanItemsForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

}
