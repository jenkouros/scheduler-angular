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
  // refresh = false;

  // priorities = [
  //   { ID: 0, Name: 'Normalna' },
  //   { ID: 1, Name: 'Nizka' },
  //   { ID: 2, Name: 'Visoka' }
  // ];

  // executionStatuses = [
  //   { ID: 0, Name: 'Ni podatka' },
  //   { ID: 1, Name: 'Planiran' },
  //   { ID: 2, Name: 'V izvajanju' },
  //   { ID: 3, Name: 'Končan' },
  //   { ID: 4, Name: 'V zastoju' }
  // ];

  selectionChanged(e) {
    console.log('selectionchanged: ' + e);
  }

  updateItem() {
    // this.refresh = true;
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
    if (!e.column.dataField && e.column.calculateCellValue) {
        e.cellElement.style.background = this.getItemPlanStatusColor(this.calculatePlanStatus(e.data));
    }
  }

  // applyPlanItemStyles(e) {
  //   if (e.rowType !== 'data') {
  //     return;
  //   }
  //   switch (e.columnIndex) {
  //     case 1: {
  //       e.cellElement.style.background = this.getContainerColor(e.data.containerCode);
  //       break;
  //     }
  //     case 4: {
  //       e.cellElement.style.background = this.getItemExecutionStatusColor(e.data.executionStatus);
  //       break;
  //     }
  //   }
  // }

  // getItemExecutionStatusColor(id) {
  //   if (id === 1) {
  //     return '#ccfbcc';
  //   } else if (id === 2) {
  //     return '#d6d6d6';
  //   }
  // }

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

  // getContainerColor(id) {
  //   if (id === 5) {
  //     return '#fbe8cc';
  //   }
  // }
}

