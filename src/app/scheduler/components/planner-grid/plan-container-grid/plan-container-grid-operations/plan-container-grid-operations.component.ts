import { HelpersService } from './../../../../../shared/services/helpers.service';
import { Observable } from 'rxjs';
import { AppState } from './../../../../../store/app.reducers';
import { ContainerSelect } from './../../../../models/container.viewmodel';
import { PlanContainerGrid } from './../../../../models/plan-container-grid.model';
import {
  PlanGridOperation,
  planGridOperationPriorities,
  planGridOperationExecution,
  getplanGridOperationExecutionColor,
  getplanGridOperationPriorityColor } from './../../../../models/plan-grid-operation.model';
import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, AfterViewChecked } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as PlanContainerGridActions from '../../../../store/actions/plan-container-grid.action';
import * as PlanContainerGridSelectors from '../../../../store/selectors/plan-container-grid.selectors';
import * as PlanItemActions from '../../../../store/actions/events.action';
import { AppComponentBase } from '../../../../../shared/app-component-base';
import { DxDataGridComponent } from 'devextreme-angular';
import dxDataGrid from 'devextreme/ui/data_grid';

@Component({
  selector: 'app-plan-container-grid-operations',
  templateUrl: './plan-container-grid-operations.component.html'
})
export class PlanContainerGridOperationsComponent extends AppComponentBase implements AfterViewInit, AfterViewChecked {

  @ViewChild(DxDataGridComponent, {static: true}) gridComponent: DxDataGridComponent;
  gridItems: PlanContainerGrid[] = [];
  planHoursSwitch$: Observable<boolean>;
  expandAllSwitch$: Observable<boolean>;
  unplannedSwitch$: Observable<boolean>;
  unplannedSwitch: boolean;
  @Input() set datasource(grid: PlanContainerGrid[]) {
    this.gridItems = grid;
    this.refresh = true;
  }
  @Output() updateItem = new EventEmitter();
  @Input() containers: ContainerSelect[];
  selectedKeys: any[] = [];
  refresh = false;
  grid: dxDataGrid;

  priorities: {ID: number, Name: string}[] = planGridOperationPriorities;
  executionStatuses: {ID: number, Name: string}[] = planGridOperationExecution;

  constructor(private store: Store<AppState>, private helpersService: HelpersService) {
    super();
    this.planHoursSwitch$ = store.pipe(select(PlanContainerGridSelectors.planHoursSwitch));
    this.expandAllSwitch$ = store.pipe(select(PlanContainerGridSelectors.expandAllSwitch));
    this.unplannedSwitch$ = store.pipe(select(PlanContainerGridSelectors.unplannedSwitch));
    this.unplannedSwitch$.subscribe(hide => {
      this.unplannedSwitch = hide;
      filterGrid(this.grid, ['operation.containerCode', 'notcontains', 'NO_CODE'], hide);
    });
    this.sortContainers = this.sortContainers.bind(this);
  }

  ngAfterViewInit() {
    this.grid = this.gridComponent.instance;
  }

  ngAfterViewChecked() {
    // filterGrid(this.grid, ['operation.containerCode', 'notcontains', 'NO_CODE'], this.unplannedHide);
  }



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
    // this.refresh = true;

    if (e.newData.operation && e.newData.operation.hasOwnProperty('isLocked')) {
      this.store.dispatch(new PlanItemActions.ToggleEventLock({
        id: e.oldData.operation.idPlanItem,
        isLocked: e.oldData.operation.isLocked
      }));
      return;
    }

    this.updateItem.emit();

    const updatedOperation = {
      ...e.oldData.operation,
      ...e.newData.operation
    } as PlanGridOperation;

    // if (updatedOperation.idSubItem && updatedOperation.idContainer && updatedOperation.timeStart) {

    //   const request = new ItemAutoplanRequest();
    //   request.idContainer = updatedOperation.idContainer;
    //   request.timeStart = updatedOperation.timeStart;
    //   request.idSubItem = updatedOperation.idSubItem;
    //   request.idItem = this.item.idItem;
    //   this.store.dispatch(new AutoplanItem(request));
    // }

    if (updatedOperation.idPrePlanItem && updatedOperation.containerCode) {
      this.store.dispatch(new PlanContainerGridActions.PlanContainerGridUpdate(updatedOperation));
    }

  }

  rowExpanded(e) {
    this.selectedKeys.push(e.key[0]);
    // e.component.expandAll();
    // console.log(e.component.getRowIndexByKey(e.key));
  }

  rowCollapsed(e) {
    const idx = this.selectedKeys.indexOf(e.key[0]);
    this.selectedKeys.splice(idx, 1);
    console.log(this.selectedKeys);
  }

  onContentReady(e) {
    console.log('onContentReady');
    filterGrid(this.grid, ['operation.containerCode', 'notcontains', 'NO_CODE'], this.unplannedSwitch);

    // this.grid = e.component;
    if (this.refresh) {
      this.selectedKeys.forEach(key => {
        e.component.expandRow([key]);
        this.refresh = false;
      });
    }
  }

  applyCellStyles(e) {
    if (e.rowType !== 'data') {
      return;
    }

    switch (e.columnIndex) {

      case 11: {
        e.cellElement.style.background = getplanGridOperationExecutionColor(e.data.operation.idUserStatus);
        break;
      }
      case 10: {
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

function filterGrid(grid: dxDataGrid, dxFilter: string[], filterOut: boolean) {
  if (!grid) {
    return;
  }

  if (filterOut) {
    grid.filter(dxFilter);
  } else if (grid.getCombinedFilter() != null) {
    grid.filter(null);
  }
}

function findRowIndexWithAttrVal(array, attr: string, value: string): number {
  for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
          return i;
      }
  }
  return -1;
}
