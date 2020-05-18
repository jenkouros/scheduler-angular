import { ContainerSelect } from './../../../../models/container.viewmodel';
import { DxDataGridComponent } from 'devextreme-angular';
import { PlanItemGrid } from './../../../../models/plan-item-grid-model';
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '../../../../../shared/app-component-base';
import { normalize } from 'path';

@Component({
  selector: 'app-plan-item-grid-items',
  templateUrl: './plan-item-grid-items.component.html',
  styleUrls: ['./plan-item-grid-items.component.css']
})
export class PlanItemGridItemsComponent extends AppComponentBase {
  @Input() items: PlanItemGrid[];
  // datasource;
  // @Input() set items(items: PlanItemGrid[]) {
  //   this.datasource = {
  //     store: {
  //       data: items,
  //       key: 'item.idItem',
  //       type: 'array'
  //     }
  //   };
  // }
  @Input() selectedItems: PlanItemGrid[] = [];
  @Input() enableGrouping = true;
  @Input() enableSearch = true;
  @Input() containers: ContainerSelect[];
  @Output() selectItem = new EventEmitter<PlanItemGrid>();
  @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent;
  selectedIndexes: number[] = [];
  selectedKeys: number[] = [];
  refresh = false;

  priorities = [
    { ID: 0, Name: 'Normalna' },
    { ID: 1, Name: 'Nizka' },
    { ID: 2, Name: 'Visoka' }
  ];

  executionStatuses = [
    { ID: 0, Name: 'Ni podatka' },
    { ID: 1, Name: 'Planiran' },
    { ID: 2, Name: 'V izvajanju' },
    { ID: 3, Name: 'Končan' },
    { ID: 4, Name: 'V zastoju' }
  ];

  constructor() {
    super();
    console.log('ctor');
  }

  rowCollapsed(e) {
    // const idx = this.selectedIndexes.indexOf(this.grid.instance.getRowIndexByKey(e.key));
    // this.selectedIndexes.splice(idx, 1);

    const idx = this.selectedKeys.indexOf(e.key);
    this.selectedKeys.splice(idx, 1);

    // console.log(this.selectedIndexes);
    console.log(this.selectedKeys);
  }

  rowExpanded(e) {
    // this.selectedIndexes.push(this.grid.instance.getRowIndexByKey(e.key));
    this.selectedKeys.push(e.key);
    // console.log(this.selectedIndexes);
    console.log(this.selectedKeys);


  }

  selectionChanged(e) {
    console.log('selectionchanged: ' + e);
  }
  updateItem() {
    this.refresh = true;
  }


  onContentReady(e) {
    console.log('onContentReady');
    if (this.refresh) {
      this.selectedKeys.forEach(key => {
        // const key = e.component.getKeyByRowIndex(idx);
        console.log(key);
        e.component.expandRow(key);
        this.refresh = false;
      });
      // this.selectedIndexes.forEach(idx => {
      //   const key = e.component.getKeyByRowIndex(idx);
      //   console.log(key);
      //   e.component.expandRow(key);
      //   this.refresh = false;
      // });
    }
  }

  calculatePlanStatus(data: PlanItemGrid) {
    let emptyCount = 0;
    for (let i = 0; i < data.operations.length; i++) {
      const operation = data.operations[i];

      if (!operation.containerCode) {
        emptyCount++;
        continue;
      }
      if (operation.containerCode.includes('NO_CODE')) {
        return 'Delno planiran';
      }

    }
    if (emptyCount === data.operations.length) {
      return 'Lansiran';
    }
    if (emptyCount === 0) {
      return 'Dokončno planiran';
    }

    return 'Delno planiran';
  }

  applyCellStyles(e) {
    if (e.rowType !== 'data') {
      return;
    }

    switch (e.columnIndex) {
      case 6: {
        e.cellElement.style.background = this.getItemPlanStatusColor(this.calculatePlanStatus(e.data));
        break;
      }
      // case 6: {
      //   e.cellElement.style.background = this.getItemExecutionStatusColor(e.data.item.itemExecutionStatus);
      //   break;
      // }
      case 8: {
        e.cellElement.style.background = this.getPriorityColor(e.data.item.priority);
        break;
      }
    }
  }

  applyPlanItemStyles(e) {
    if (e.rowType !== 'data') {
      return;
    }

    switch (e.columnIndex) {
      case 1: {
        e.cellElement.style.background = this.getContainerColor(e.data.containerCode);
        break;
      }
      case 4: {
        e.cellElement.style.background = this.getItemExecutionStatusColor(e.data.executionStatus);
        break;
      }
    }
  }

  getItemExecutionStatusColor(id) {
    if (id === 1) {
      return '#ccfbcc';
    } else if (id === 2) {
      return '#d6d6d6';
    }
  }

  getItemPlanStatusColor(id) {
    if (id === 'Lansiran') {
      return '';
    } else if (id === 'Delno planiran') {
      return '#fbe8cc';
    } else if (id === 'Dokončno planiran') {
      return '#d6d6d6';
    }
  }

  getPriorityColor(id) {
    if (id === 2) {
      return '#ff8383';
    }
  }

  getContainerColor(id) {
    if (id === 5) {
      return '#fbe8cc';
    }
  }
}

