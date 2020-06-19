import { appSettings } from './../../../../../../environments/environment.ecm360test';
import { ContainerSelect } from './../../../../models/container.viewmodel';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PlannedEvent, PlanItemPutRequestOptions } from '../../../../models/event.model';
import { SubItemContainer } from '../../../../models/subitem.dto';
import { Validators } from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { TimeHelper } from '../../../../helpers/time.helper';
import * as moment from 'moment';
import { DateValidators } from '../../../../../shared/validators/date.validators';
import { Subscription } from 'rxjs';
import { AppComponentBase } from '../../../../../shared/app-component-base';
import { startWith, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-plan-viewer-item-edit',
  templateUrl: './plan-viewer-item-edit.component.html',
  styleUrls: ['./plan-viewer-item-edit.component.css']
})

export class PlanViewerItemEditComponent extends AppComponentBase implements OnInit, OnChanges, OnDestroy {
  @Input() planItem: PlannedEvent | null;
  @Input() visible: false;
  @Input() containerSelect: ContainerSelect[];
  @Output() planItemUpdate = new EventEmitter<PlannedEvent>();
  @Output() planItemCreate = new EventEmitter<PlannedEvent>();
  @Output() popupClose = new EventEmitter();
  preparationStartSubscription: Subscription;
  executionStartSubscribtion: Subscription;
  executionEndSubscribtion: Subscription;

  planItemEditForm: FormGroup;
  preparationDuration = 0;
  executionDuration = 0;

  get containers(): {id: number, title: string}[] {
    if (appSettings.PlanItem_EnablePlanningOnAllWorkplaces) {
      return this.containerSelect.map(i => ({ id: i.id, title: i.displayExpression }));
    }

    return this.planItem
      ? this.planItem.containers.map(i => ({ id: i.container.id, title: i.container.displayExpression }))
      : [];
  }
  get selectedContainer(): SubItemContainer | undefined {
    if (!this.planItem || !this.planItem.containers) {
      return undefined;
    }
    const containerId = this.planItem ? this.planItem.containerId : -1;
    const subItemContainer = this.planItem.containers.find(i => i.container.id === containerId);
    if (subItemContainer) { return subItemContainer; }

    return this.planItem.containers[0];
    // return this.containers.find(i => i.container.id === containerId);
  }

  constructor(private fb: FormBuilder) {
    super();
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFormHide = this.onFormHide.bind(this);
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.planItem && this.planItem) {
      this.planItem = Object.assign(new PlannedEvent(), this.planItem);
      this.setForm(this.planItem);
    }
  }

  initForm() {
    this.planItemEditForm = this.fb.group(
      {
        idContainer: ['', Validators.required],
        preparationStartTime: ['', Validators.required],
        executionStartTime: ['', [Validators.required, DateValidators.validateDate]],
        executionEndTime: ['', Validators.required],
        isPreparationTimeLocked: [''],
        isExecutionTimeLocked: [''],
        preparationDuration: [''],
        executionDuration: [''],
        comment: [''],
        applyNonworkingTime: [false],
        snapForwardPlanItems: [true]
      },
      {
        validator: [
          DateValidators.maxDate('preparationStartTime', 'executionStartTime'),
          DateValidators.maxDate('executionStartTime', 'executionEndTime')
        ]
      });
  }

  setForm(planItem: PlannedEvent | null) {
    this.unsubscribe();
    this.planItemEditForm.reset();
    this.planItemEditForm.setValue({
      'idContainer': planItem ? planItem.containerId : '',
      'preparationStartTime': planItem ? new Date(planItem.timeStartPreparation) : new Date(),
      'executionStartTime': planItem ? new Date(planItem.timeStartExecution) : new Date(),
      'executionEndTime': planItem ? new Date(planItem.timeEndExecution) : new Date(),
      'isExecutionTimeLocked': false,
      'isPreparationTimeLocked': false,
      'preparationDuration': TimeHelper.convertMinutesIntoString(TimeHelper.getDateDiffInMinutes(
        new Date(planItem ? planItem.timeStartPreparation : new Date()),
        new Date(planItem ? planItem.timeStartExecution : new Date())
      )),
      'executionDuration': TimeHelper.convertMinutesIntoString(TimeHelper.getDateDiffInMinutes(
        new Date(planItem ? planItem.timeStartExecution : new Date()),
        new Date(planItem ? planItem.timeEndExecution : new Date())
      )),
      'comment': planItem ? planItem.description : '',
      'applyNonworkingTime': false,
      'snapForwardPlanItems': true
    });
    this.onFormChanges();
  }


  onFormChanges() {
    this.preparationStartSubscription = this.preparationStartTimeControl.valueChanges
      .subscribe(next => this.updatePreparationStartTime(next));

    this.executionStartSubscribtion = this.executionStartTimeControl.valueChanges
      .subscribe(next => this.updateExecutionStartTime(next));

    this.executionEndSubscribtion = this.executionEndTimeControl.valueChanges
      .subscribe(next => this.updateExecutionEndTime(next));

    this.isPreparationTimeLockedControl.valueChanges
      .subscribe(flag => {
        if (flag) {
          this.preparationDuration = TimeHelper.getDateDiffInMinutes(
            this.preparationStartTimeControl.value, this.executionStartTimeControl.value);
          if (isNaN(this.preparationDuration)) { this.preparationDuration = 0; }
        }
      });

    this.isExecutionTimeLockedControl.valueChanges
      .subscribe(flag => {
        if (flag) {
          this.executionDuration = TimeHelper.getDateDiffInMinutes(
            this.executionStartTimeControl.value, this.executionEndTimeControl.value);
          if (isNaN(this.executionDuration)) { this.executionDuration = 0; }
        }
      });
  }

  unsubscribe() {
    if (this.executionEndSubscribtion) {
      this.executionEndSubscribtion.unsubscribe();
    }
    if (this.executionStartSubscribtion) {
      this.executionStartSubscribtion.unsubscribe();
    }
    if (this.preparationStartSubscription) {
      this.preparationStartSubscription.unsubscribe();
    }
  }

  onFormSubmit() {
    const { value, valid } = this.planItemEditForm;

    if (!valid || !this.planItem) {
      return;
    }

    this.planItem.containerId = value.idContainer;
    this.planItem.timeStartPreparation = value.preparationStartTime;
    this.planItem.timeStartExecution = value.executionStartTime;
    this.planItem.timeEndExecution = value.executionEndTime;
    this.planItem.description = value.comment;
    this.planItem.options = {
      skipNonWorkingTimeMove: !value.applyNonworkingTime,
      snapFurtherItems: value.snapForwardPlanItems
    } as PlanItemPutRequestOptions;
    if (this.planItem.isPlanned) {
      this.planItemUpdate.emit(this.planItem);
    } else {
      this.planItemCreate.emit(this.planItem);
    }
    this.onFormHide();
  }

  onFormHide() {
    if (this.visible) {
      this.popupClose.emit();
    }

  }

  onPopupVisibilityChanged(show: boolean) {
    if (!show) {
      this.onFormHide();
    }
  }

  updatePreparationStartTime(date: Date) {
    if (this.isPreparationTimeLockedControl.value) {
      const timeExecutionStartCandidate = moment(this.preparationStartTimeControl.value)
        .add(/*this.selectedContainer ? this.selectedContainer.preparationNormative : 0*/
          this.preparationDuration, 'm').toDate();
      if (timeExecutionStartCandidate.getTime() !== this.executionStartTimeControl.value.getTime()) {
        this.planItemEditForm.patchValue({ 'executionStartTime': timeExecutionStartCandidate });
      }
    }
    this.updatePreparationDuration();
  }

  updateExecutionStartTime(date: Date) {
    if (this.isExecutionTimeLockedControl.value) {
      const timeExecutionEndCandidate = moment(this.executionStartTimeControl.value)
        .add(/*this.getExecutionNormative()*/ this.executionDuration, 'm').toDate();
      if (timeExecutionEndCandidate.getTime() !== this.executionEndTimeControl.value.getTime()) {
        this.planItemEditForm.patchValue({ 'executionEndTime': timeExecutionEndCandidate });
      } else {
        this.updateExecutionDuration();
      }
    } else {
      this.updateExecutionDuration();
    }

    if (this.isPreparationTimeLockedControl.value) {
      const timePreparationStartCandidate = moment(this.executionStartTimeControl.value)
        .subtract(/*this.selectedContainer ? this.selectedContainer.preparationNormative : 0*/
          this.preparationDuration, 'm').toDate();
      if (timePreparationStartCandidate.getTime() !== this.preparationStartTimeControl.value.getTime()) {
        this.planItemEditForm.patchValue({ 'preparationStartTime': timePreparationStartCandidate });
      }
    }
    this.updatePreparationDuration();
  }

  updateExecutionEndTime(date: Date) {
    if (this.isExecutionTimeLockedControl.value) {
      const timeExecutionStartCandidate = moment(this.executionEndTimeControl.value)
        .subtract(/*this.getExecutionNormative()*/ this.executionDuration , 'm').toDate();
      if (timeExecutionStartCandidate.getTime() !== this.executionStartTimeControl.value.getTime()) {
        this.planItemEditForm.patchValue({ 'executionStartTime': timeExecutionStartCandidate });
        this.updateExecutionDuration();
      }
    } else {
      this.updateExecutionDuration();
    }
  }

  getFormPreparationDuration() {
    return TimeHelper.getDateDiffInMinutes(this.preparationStartTimeControl.value,
      this.executionStartTimeControl.value);
  }

  getFormExecutionDuration() {
    return TimeHelper.getDateDiffInMinutes(this.executionStartTimeControl.value,
      this.executionEndTimeControl.value);
  }

  updatePreparationDuration() {
    this.planItemEditForm.patchValue({
      'preparationDuration': TimeHelper.convertMinutesIntoString(this.getFormPreparationDuration())
    });
  }
  updateExecutionDuration() {
    this.planItemEditForm.patchValue({
      'executionDuration': TimeHelper.convertMinutesIntoString(this.getFormExecutionDuration())
    });
  }
  getExecutionNormative() {
    const normativeQuantity = this.selectedContainer ? Math.max(this.selectedContainer.quantity, 1) : 1;

    return (this.planItem ? this.planItem.quantity : 0) *
      (this.selectedContainer ? this.selectedContainer.executionNormative / normativeQuantity : 0);
  }

  get preparationStartTimeControl() {
    return this.planItemEditForm.get('preparationStartTime') as FormControl;
  }
  get executionStartTimeControl() {
    return this.planItemEditForm.get('executionStartTime') as FormControl;
  }
  get executionEndTimeControl() {
    return this.planItemEditForm.get('executionEndTime') as FormControl;
  }
  get executionDurationControl() {
    return this.planItemEditForm.get('executionDuration') as FormControl;
  }
  get preparationDurationControl() {
    return this.planItemEditForm.get('preparationDuration') as FormControl;
  }
  get isExecutionTimeLockedControl() {
    return this.planItemEditForm.get('isExecutionTimeLocked') as FormControl;
  }
  get isPreparationTimeLockedControl() {
    return this.planItemEditForm.get('isPreparationTimeLocked') as FormControl;
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}

