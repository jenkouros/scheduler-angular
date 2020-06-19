import { OperationUpdateHelper } from './../../../../helpers/operation-update.helper';
import { PlanItemCreateRequest } from './../../../../models/event.model';
import { appSettings } from './../../../../../../environments/environment.ecm360test';
import { AutoplanItem } from './../../../../store/actions/plan-item-grid.action';
import { ItemAutoplanRequest } from './../../../../models/item-autoplan.model';
import { HelpersService } from './../../../../../shared/services/helpers.service';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './../../../../../store/app.reducers';
import { ContainerSelect } from './../../../../models/container.viewmodel';
import { PlanContainerGrid } from './../../../../models/plan-container-grid.model';
import {
  PlanGridOperation,
  planGridOperationPriorities,
  planGridOperationExecution,
  getplanGridOperationExecutionColor,
  getplanGridOperationPriorityColor,
  PlanGridOperationChange,
  OperationChangeOriginEnum} from './../../../../models/plan-grid-operation.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as PlanContainerGridActions from '../../../../store/actions/plan-container-grid.action';
import * as PlanContainerGridSelectors from '../../../../store/selectors/plan-container-grid.selectors';
import * as PlanItemActions from '../../../../store/actions/events.action';
import { AppComponentBase } from '../../../../../shared/app-component-base';

@Component({
  selector: 'app-plan-container-grid-operations',
  templateUrl: './plan-container-grid-operations.component.html',
})
export class PlanContainerGridOperationsComponent extends AppComponentBase {

  gridItems: PlanContainerGrid[] = [];
  planHoursSwitch$: Observable<boolean>;
  planHours: boolean;
  planHoursSubscription: Subscription;
  expandAllSwitch$: Observable<boolean>;
  timeUpdateDialog$: Observable<PlanGridOperationChange | undefined>;

  @Input() set datasource(grid: PlanContainerGrid[]) {
    this.gridItems = grid;
  }
  @Output() updateItem = new EventEmitter();
  @Input() containers: ContainerSelect[];

  constructor(private store: Store<AppState>, private helpersService: HelpersService) {
    super();
    this.planHoursSwitch$ = store.pipe(select(PlanContainerGridSelectors.planHoursSwitch));
    this.planHoursSubscription = this.planHoursSwitch$.subscribe(s => this.planHours = s);
    this.expandAllSwitch$ = store.pipe(select(PlanContainerGridSelectors.expandAllSwitch));
    this.sortContainers = this.sortContainers.bind(this);
    this.timeUpdateDialog$ = store.pipe(select(PlanContainerGridSelectors.getUpdateTimeDialogData));

  }

  priorities: {ID: number, Name: string}[] = planGridOperationPriorities;
  executionStatuses: {ID: number, Name: string}[] = planGridOperationExecution;

  onCellClick(e) {
    if (e.rowType === 'data' && e.column.dataField === 'operation.name') {
      this.showDetails(e.data.operation.idPlanItem);
    }
  }


  showDetails(id: number) {
    this.store.dispatch(new PlanItemActions.ShowPlanItemDetailPopup({id: id}));
  }

  sortContainers(val1, val2) {
    if (!val1 && val2) {
      return 1;
    }
    if (val1 && !val2) {
      return -1;
    }
    if (!val1 && !val2) {
      return 0;
    }
    const cont1 = this.containers.find(i => i.id === val1);
    const cont2 = this.containers.find(i => i.id === val2);
    if (cont1 && cont2) {
      return this.helpersService.localeCompare(cont1.code, cont2.code);
    }
    return -1;
  }


  updateOperation(e) {
    if (e.newData.operation && e.newData.operation.hasOwnProperty('isLocked')) {
      this.store.dispatch(new PlanItemActions.ToggleEventLock({
        id: e.oldData.operation.idPlanItem,
        isLocked: e.oldData.operation.isLocked
      }));
      return;
    }

    const updatedOperation = {
      ...e.oldData.operation,
      ...e.newData.operation
    } as PlanGridOperation;

    if (e.oldData.operation && e.oldData.operation.idPrePlanItem &&
        (e.newData.operation.hasOwnProperty('timeStart') || e.newData.operation.hasOwnProperty('timeEnd'))) {
          // show popup
          this.store.dispatch(new PlanContainerGridActions.ShowUpdatePlanGridOperationDialog({
            oldTimeEnd: e.oldData.operation.timeEnd,
            oldTimeStart: e.oldData.operation.timeStart,
            timeChange: e.newData.operation,
            operation: updatedOperation,
            changeOrigin: OperationChangeOriginEnum.ContainerGrid
          }));
          return;
    }


    // debugger; // check else if pogoj
    if (!updatedOperation.idPlanItem) {
      if (!updatedOperation.idPrePlanItem && updatedOperation.idContainer && updatedOperation.timeStart) {
        this.updateItem.emit();
        const request = new ItemAutoplanRequest();
        request.idSubItem = updatedOperation.idSubItem;
        request.idContainer = updatedOperation.idContainer;
        request.timeStart = updatedOperation.timeStart;
        request.planDay = !this.planHours;
        request.planLinkedItems = false;
        request.planSequencePlanItems = false;
        request.idItem = e.newData.item.idItem;
        this.store.dispatch(new AutoplanItem(request));
      } else if (updatedOperation.idPrePlanItem && updatedOperation.idContainer && updatedOperation.timeStart) {
        this.updateItem.emit();
        const request = {
          idPrePlanItem: updatedOperation.idPrePlanItem,
          idContainer: updatedOperation.idContainer,
          timePreparationStart: updatedOperation.timeStart,
          timeExecutionStart: updatedOperation.timeStart,
          timeExecutionEnd: updatedOperation.timeEnd,
          options: {
            enablePlanningOnAllWorkplaces: appSettings.PlanItem_EnablePlanningOnAllWorkplaces
          }
        } as PlanItemCreateRequest;
        this.store.dispatch(new PlanItemActions.CreateEventFromRequest(request));
      }
    } else if (updatedOperation.idPrePlanItem && updatedOperation.containerCode) {
      this.updateItem.emit();
      this.store.dispatch(new PlanContainerGridActions.PlanContainerGridUpdate(updatedOperation));
    }

  }

  validatePlanGridRow(e) {

    const event = {
      ...e.oldData.operation,
      ...e.newData.operation
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
      case 'operation.itemExecutionStatus.operationName': {
        if (!e.data.operation.itemExecutionStatus) { return; }
        e.cellElement.style.background = getplanGridOperationExecutionColor(e.data.operation.itemExecutionStatus.status);
        break;
      }
      case 'operation.idUserStatus': {
        e.cellElement.style.background = getplanGridOperationExecutionColor(e.data.operation.idUserStatus);
        break;
      }
      case 'operation.idPriority': {
        e.cellElement.style.background = getplanGridOperationPriorityColor(e.data.operation.idPriority);
        break;
      }
    }
  }

  customizeExportData(columns, rows) {
    // remove records with *NO_CODE* workplace
    for (let i = rows.length - 1; i >= 0; --i) {
      if (rows[i].key.hasOwnProperty('operation') && rows[i].key.operation.containerCode != null ) {
          if (rows[i].key.operation.containerCode.includes('NO_CODE')) {
              rows.splice(i, 1);
          }
        }
    }

    // select groups/subGroups with no data
    let tempGroupIndexList: Array<number> = [];
    let partialTruncateList: Array<number> = [];
    let truncateList: Array<number> = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].hasOwnProperty('groupIndex')) {
        partialTruncateList.push(i);
        if (rows[i].groupIndex >= rows[i + 1].groupIndex) {
          truncateList = truncateList.concat(partialTruncateList);
          partialTruncateList = [];
        }
      } else {
        tempGroupIndexList = [];
        partialTruncateList = [];
      }
    }
    // remove selected
    for (let i = truncateList.length - 1; i >= 0; --i) {
      rows.splice(truncateList[i], 1);
    }
  }
}
