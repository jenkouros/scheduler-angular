import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppComponentBase } from '../../../../../shared/app-component-base';
import * as ContainersAction from '../../../../store/actions/containers.action';
import * as PlanItemActions from '../../../../store/actions/events.action';
import * as PlanContainerGridActions from '../../../../store/actions/plan-container-grid.action';
import * as PlanContainerGridSelectors from '../../../../store/selectors/plan-container-grid.selectors';
import { appSettings } from './../../../../../../environments/environment.ecm360test';
import { HelpersService } from './../../../../../shared/services/helpers.service';
import { AppState } from './../../../../../store/app.reducers';
import { OperationUpdateHelper } from './../../../../helpers/operation-update.helper';
import { ContainerSelect } from './../../../../models/container.viewmodel';
import { PlanItemCreateRequest } from './../../../../models/event.model';
import { ItemAutoplanRequest } from './../../../../models/item-autoplan.model';
import { PlanContainerGrid } from './../../../../models/plan-container-grid.model';
import { LinkedItemStatusEnum } from './../../../../models/plan-grid-item-model';
import { getplanGridOperationExecutionColor, getPlanGridOperationExecutionStatuses, getPlanGridOperationPriorities, getplanGridOperationPriorityColor, OperationChangeOriginEnum, PlanGridOperation, PlanGridOperationChange } from './../../../../models/plan-grid-operation.model';
import { AutoplanItem } from './../../../../store/actions/plan-item-grid.action';

@Component({
  selector: 'app-plan-container-grid-operations',
  templateUrl: './plan-container-grid-operations.component.html',
  styleUrls: ['./plan-container-grid-operations.component.css']
})
export class PlanContainerGridOperationsComponent extends AppComponentBase implements OnInit, OnDestroy {
  gridItems: PlanContainerGrid[] = [];
  planHoursSwitch$: Observable<boolean>;
  planHours: boolean;
  planHoursSubscription: Subscription;
  subscriptions: Subscription[] = [];
  expandAllSwitch$: Observable<boolean>;
  timeUpdateDialog$: Observable<PlanGridOperationChange | undefined>;
  inProcessWoSwitch$: Observable<boolean>;
  currentWoSwitch$: Observable<boolean>;

  timeStartFilterOperation: any = 'contains';
  timeStartFilterValue: any = new Date();
  timeEndFilterOperation: any;
  timeEndFilterValue: any;

  @Input() set datasource(grid: PlanContainerGrid[]) {
    this.gridItems = grid;
  }
  @Output() updateItem = new EventEmitter();
  @Input() containers: ContainerSelect[];
  @Input() editable = false;

  constructor(private store: Store<AppState>, private helpersService: HelpersService) {
    super();
    this.planHoursSwitch$ = store.pipe(select(PlanContainerGridSelectors.planHoursSwitch));
    this.subscriptions.push(this.planHoursSwitch$.subscribe(s => this.planHours = s));
    this.expandAllSwitch$ = store.pipe(select(PlanContainerGridSelectors.expandAllSwitch));
    this.inProcessWoSwitch$ = store.pipe(select(PlanContainerGridSelectors.inProcessWoSwitch));
    this.subscriptions.push(this.inProcessWoSwitch$.subscribe(s => {
      if (s) {
        this.setTimeFilter('<=', '>=');
      } else {
        this.setTimeFilter('', '', true);
      }
    }));
    this.currentWoSwitch$ = store.pipe(select(PlanContainerGridSelectors.currentWoSwitch));
    this.subscriptions.push(this.currentWoSwitch$.subscribe(s => {
      if (s) {
        this.setTimeFilter('', '>=');
      } else {
        this.setTimeFilter('', '', true);
      }
    }));
    this.sortContainers = this.sortContainers.bind(this);
    this.timeUpdateDialog$ = store.pipe(select(PlanContainerGridSelectors.getUpdateTimeDialogData));
    this.translate = this.translate.bind(this);

  }

  priorities: {ID: number, Name: string}[] = getPlanGridOperationPriorities();
  executionStatuses: {ID: number, Name: string}[]; // = planGridOperationExecution;

  // filterValue: Array<any> = ['item.itemCode', '<>', '44088904'];
  // applyFilter (filterExpression) {
  //     this.filterValue = filterExpression;
  // }


  ngOnInit() {
    this.executionStatuses = getPlanGridOperationExecutionStatuses();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  getHeight(){
    return window.innerHeight - 150;
  }

  setTimeFilter(timeStartOperator, timeEndOperator, reset = false) {
    if (reset) {
      this.timeStartFilterOperation = null;
      this.timeStartFilterValue = null;
      this.timeEndFilterOperation = null;
      this.timeEndFilterValue = null;
      return;
    }

    const now = new Date();
    this.timeStartFilterOperation = timeStartOperator ? timeStartOperator : null;
    this.timeStartFilterValue = timeStartOperator ? now : null;
    this.timeEndFilterOperation = timeEndOperator ? timeEndOperator : null;
    this.timeEndFilterValue = timeEndOperator ? now : null;
  }


  onCellClick(e) {
    if (e.rowType === 'data' && e.column.dataField === 'operation.name' && this.editable) {
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
            enablePlanningOnAllWorkplaces: appSettings.PlanItem_EnablePlanningOnAllWorkplaces,
            dayPlan: !this.planHours
          }
        } as PlanItemCreateRequest;
        this.store.dispatch(new PlanItemActions.CreateEventFromRequest(request));
      }
    } else if (updatedOperation.idPrePlanItem && updatedOperation.containerCode) {
      this.updateItem.emit();
      this.store.dispatch(
        new PlanContainerGridActions.PlanContainerGridUpdate({
          operation: updatedOperation,
          allowAdd: false
        })
      );
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
      case 'operation.linkedItemExecutionStatus.status': {
        if (!e.data.operation.linkedItemExecutionStatus) { return; }
        if (LinkedItemStatusEnum.Finished === e.data.operation.linkedItemExecutionStatus.status) {
          e.cellElement.style.background = '#d6d6d6';
        } else if (LinkedItemStatusEnum.Running === e.data.operation.linkedItemExecutionStatus.status) {
          e.cellElement.style.background = '#ccfbcc';
        }
        break;
      }
      case 'operation.parentLinkedItemStatus.containerCode': {
        if (!e.data.operation.parentLinkedItemStatus) { return; }
        if (LinkedItemStatusEnum.Finished === e.data.operation.parentLinkedItemStatus.status) {
          e.cellElement.style.background = '#d6d6d6';
        } else if (LinkedItemStatusEnum.Running === e.data.operation.parentLinkedItemStatus.status) {
          e.cellElement.style.background = '#ccfbcc';
        }
        break;
      }
      case 'operation.timeStart': {
        const date = new Date();
        const status = e.data.operation.idUserStatus;
        const startDate = new Date(e.data.operation.timeStart);
        if ((!status || status === 1) && date.getTime() > startDate.getTime()) {
          e.cellElement.style.background = '#ffc694';
          break;
        }

        break;
      }
      case 'operation.timeEnd': {
        const date = new Date();
        const status = e.data.operation.idUserStatus;
        const endDate = new Date(e.data.operation.timeEnd);
        if ((status !== 3 && status !== 5) &&
            date.getTime() > endDate.getTime()) {
              e.cellElement.style.background = '#ffc694';
              break;
        }
        break;
      }
    }
  }

  onExporting(e) {
    console.log("onExporting")
    e.component.columnOption("operation.name","visible",false);
    e.component.columnOption("item.quantityMeasurementUnit","visible",false);
    e.component.columnOption("operation.idPriority","visible",false);
    e.component.columnOption("operation.idUserStatus","visible",false);
    e.component.columnOption("operation.linkedItemExecutionStatus.status","visible",false);
    e.component.columnOption("operation.itemExecutionStatus.operationName","visible",false);
    e.component.columnOption("operation.isLocked","visible",false);
    e.component.columnOption("operation.userDate","allowExporting",false);
    e.component.columnOption("operation.parentLinkedItemStatus.containerCode","allowExporting",false);
    e.component.endUpdate();
  }

  onExported(e) {
    console.log("onExported")
    e.component.columnOption("operation.name","visible",true);
    e.component.columnOption("item.quantityMeasurementUnit","visible",true);
    e.component.columnOption("operation.idPriority","visible",true);
    e.component.columnOption("operation.idUserStatus","visible",true);
    e.component.columnOption("operation.linkedItemExecutionStatus.status","visible",true);
    e.component.columnOption("operation.itemExecutionStatus.operationName","visible",true);
    e.component.columnOption("operation.isLocked","visible",true);
    e.component.columnOption("operation.userDate","allowExporting",true);
    e.component.columnOption("operation.parentLinkedItemStatus.containerCode","allowExporting",true);
    e.component.endUpdate();
  }


  customizeExcelCell(options) {
    var gridCell = options.gridCell;
    if(!gridCell) {
        return;
    }

    if(gridCell.rowType === "data") {
      options.wrapTextEnabled = true;
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


    columns.forEach(function(column) {
        column.width = 80; //if portrait 60 / landscape 80
        if(column.dataField == "operation.idContainer" || column.dataField == "item.articleName" || column.dataField == "operation.comment" ){
          column.width = 165; //if portrait 115/ landscape 165
        }

        // Not needed if landscape
        /*
        // Not needed if landscape
        if(column.dataField == "operation.comment" ){
          column.width = 100; //if portrait 115/ landscape 165
        }
        if(column.dataField == "operation.timeStart" || column.dataField == "operation.timeEnd"  ){
          column.width = 80;
        }
        */
    });
  }

  getLinkedItemsStatus = (row) => {
    if (!row.operation.linkedItemExecutionStatus) { return ''; }

    switch (row.operation.linkedItemExecutionStatus.status) {
      case LinkedItemStatusEnum.Finished:
      case LinkedItemStatusEnum.Running:
        return this.translate('LinkedItemsStatus_' + row.operation.linkedItemExecutionStatus.status);
    }
    return '';
    // return row.operation.linkedItemExecutionStatus.status === LinkedItemStatusEnum.Finished
    //   ? this.translate('LinkedItemsStatus_' + row.operation.linkedItemExecutionStatus.status)
    //   : '';
  }

  onGroupRowEdit(e, item) {
    this.store.dispatch(new ContainersAction.UpdateContainer({idContainer: item.value, comment: e.target.value}));
  }

  getContainerComment(idContainer) {
    const container = this.containers.find(c => c.id === idContainer);
    return container ? container.comment : '';
  }
}
