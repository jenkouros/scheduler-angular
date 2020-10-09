import * as ItemActions from './../../../store/actions/items.action';
import { ItemUIState } from './../../../models/item.store';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CreateSubItemInput } from './item-create.model';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { AppState } from '../../../../store/app.reducers';
import * as ItemSelectors from '../../../store/selectors/items.selectors';
import { Observable } from 'rxjs';
import { DxValidationGroupComponent } from 'devextreme-angular';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCreateComponent extends AppComponentBase implements OnInit {
  @ViewChild('targetGroup', {static: false}) validationGroup: DxValidationGroupComponent;
  sequenceNumber = 0;
  form: FormGroup;
  uiState$: Observable<ItemUIState>;

  constructor(private store: Store<AppState>) {
    super();
   }

  ngOnInit() {
    this.uiState$ = this.store.pipe(select(ItemSelectors.getItemUiState));

    this.setForm();

    this.close = this.close.bind(this);
    this.submitItem = this.submitItem.bind(this);
  }

  setForm() {
    this.form = new FormGroup({
      code: new FormControl('', Validators.required),
      subItems: new FormArray([this.createSubItemFormGroup({} as CreateSubItemInput)])
    });
  }

  addSubItem() {
    this.getSubItemFormArray().push(this.createSubItemFormGroup({} as CreateSubItemInput));
  }

  deleteSubItem(index) {
    this.getSubItemFormArray().removeAt(index);
  }

  getSubItemFormArray() {
    return this.form.get('subItems') as FormArray;
  }

  submitItem() {
    const formValue = this.form.value;
    formValue['name'] = formValue.code;
    this.store.dispatch(new ItemActions.CreateItem(formValue));
    this.close();
  }

  close() {
    this.store.dispatch(new ItemActions.HideCreateItemPopup());
    // this.form.reset();
    this.setForm();
    this.validationGroup.instance.reset();
  }

  private createSubItemFormGroup(subItem: CreateSubItemInput) {
    this.sequenceNumber++;
    return new FormGroup({
      code: new FormControl(subItem.code, Validators.required),
      name: new FormControl(subItem.name, Validators.required),
      sequenceNumber: new FormControl(this.sequenceNumber)
    });
  }

}
