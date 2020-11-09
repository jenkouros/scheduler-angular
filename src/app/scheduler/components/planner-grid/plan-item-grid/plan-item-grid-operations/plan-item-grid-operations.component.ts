import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppComponentBase } from '../../../../../shared/app-component-base';
import { PlanGridItem } from '../../../../models/plan-grid-item-model';
import { getplanGridOperationExecutionColor, getplanGridOperationPriorityColor, OperationChangeOriginEnum, PlanGridOperation, PlanGridOperationChange, planGridOperationExecution, planGridOperationPriorities } from '../../../../models/plan-grid-operation.model';
import * as PlanItemActions from '../../../../store/actions/events.action';
import * as PlanContainerGridActions from '../../../../store/actions/plan-container-grid.action';
import * as PlanContainerGridSelectors from '../../../../store/selectors/plan-container-grid.selectors';
import { AppState } from './../../../../../store/app.reducers';
import { OperationUpdateHelper } from './../../../../helpers/operation-update.helper';
import { ContainerSelect } from './../../../../models/container.viewmodel';
import { ItemAutoplanRequest } from './../../../../models/item-autoplan.model';
import { AutoplanItem, PlanItemGridUpdate } from './../../../../store/actions/plan-item-grid.action';

@Component({
  selector: 'app-plan-item-grid-operations',
  templateUrl: './plan-item-grid-operations.component.html'
})
export class PlanItemGridOperationsComponent extends AppComponentBase implements OnDestroy {
  planHoursSwitch$: Observable<boolean>;
  @Input() operations: PlanGridOperation[];
  @Input() editable = false;
  @Input() item: PlanGridItem;
  @Output() updateItem = new EventEmitter();
  @Input() containers: ContainerSelect[];
  @Input() refreshContainerGrid = false;
  @Input() loader = false;
  // containers$: Observable<ContainerSelect[]>;
  planHoursSwitchSubscription: Subscription;
  planHours: boolean;
  priorities: {ID: number, Name: string}[] = planGridOperationPriorities;
  executionStatuses: {ID: number, Name: string}[] = planGridOperationExecution;
  timeUpdateDialog$: Observable<PlanGridOperationChange | undefined>;


  constructor(private store: Store<AppState>) {
    super();
    this.planHoursSwitch$ = store.pipe(select(PlanContainerGridSelectors.planHoursSwitch));
    this.planHoursSwitchSubscription = this.planHoursSwitch$.subscribe(v => this.planHours = v);
    this.timeUpdateDialog$ = store.pipe(select(PlanContainerGridSelectors.getUpdateTimeDialogData));

    // store.pipe(select(getSelectedPlanId))
    // .subscribe(id => {
    //   store.dispatch(new LoadContainers());
    // });
    // this.containers$ = store.pipe(select(getContainerSelectList));

  }

  ngOnDestroy() {
    if (this.planHoursSwitchSubscription) {
      this.planHoursSwitchSubscription.unsubscribe();
    }
  }

  updateOperation(e) {
    console.log(e);
    if (e.newData && e.newData.hasOwnProperty('isLocked')) {
      if (e.oldData.idPlanItem) {
        this.store.dispatch(new PlanItemActions.ToggleEventLock({
          id: e.oldData.idPlanItem,
          isLocked: e.oldData.isLocked
        }));
      }
      return;
    }

    this.updateItem.emit();

    const updatedOperation = {
      ...e.oldData,
      ...e.newData
    } as PlanGridOperation;

    updatedOperation.options = {
      dayPlan: !this.planHours,
      fixPlanItem: true
    };

    if (e.oldData && e.oldData.idPrePlanItem &&
      (e.newData.hasOwnProperty('timeStart') || e.newData.hasOwnProperty('timeEnd'))) {
        // show popup
        this.store.dispatch(new PlanContainerGridActions.ShowUpdatePlanGridOperationDialog({
          oldTimeEnd: e.oldData.timeEnd,
          oldTimeStart: e.oldData.timeStart,
          timeChange: e.newData,
          operation: updatedOperation,
          changeOrigin: OperationChangeOriginEnum.ItemGrid
        }));
        return;
  }



    if (updatedOperation.idSubItem && updatedOperation.idContainer && updatedOperation.timeStart) {

      const request = new ItemAutoplanRequest();
      request.idContainer = updatedOperation.idContainer;
      request.timeStart = updatedOperation.timeStart;
      request.idSubItem = updatedOperation.idSubItem;
      request.idItem = this.item.idItem;
      request.planDay = !this.planHours;
      request.planLinkedItems = true;
      request.planSequencePlanItems = true;
      request.returnOperationGridModel = this.refreshContainerGrid;
      this.store.dispatch(new AutoplanItem(request));
      return;
    }

    if (updatedOperation.idPrePlanItem) {
      if (new Date(updatedOperation.timeStart).getTime() > new Date(updatedOperation.timeEnd).getTime()) {
        updatedOperation.timeEnd = updatedOperation.timeStart;
      }
      if (new Date(updatedOperation.timeEnd).getTime() < new Date(updatedOperation.timeStart).getTime()) {
        updatedOperation.timeStart = updatedOperation.timeEnd;
      }

      this.store.dispatch(new PlanItemGridUpdate(updatedOperation));

      // const request = new ItemAutoplanRequest();
      // request.idContainer = updatedOperation.idContainer;
      // request.timeStart = updatedOperation.timeStart;
      // request.idSubItem = updatedOperation.idSubItem;
      // request.idItem = this.item.idItem;
      // this.store.dispatch(new AutoplanItem(request));
    }

  }

  validatePlanGridRow(e) {

    const event = {
      ...e.oldData,
      ...e.newData
    } as PlanGridOperation;

    const validation = OperationUpdateHelper.validatePlanGridOperation(event);
    e.isValid = validation.valid;
    e.errorText = validation.error;
  }

  applyCellStyles(e) {
    if (e.rowType !== 'data') {
      return;
    }

    switch (e.column.dataField) {

      case 'idUserStatus': {
        e.cellElement.style.background = getplanGridOperationExecutionColor(e.data.idUserStatus);
        break;
      }
      case 'idPriority': {
        e.cellElement.style.background = getplanGridOperationPriorityColor(e.data.idPriority);
        break;
      }
    }
  }
}
