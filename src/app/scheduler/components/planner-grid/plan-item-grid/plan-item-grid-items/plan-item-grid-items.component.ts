import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { AppComponentBase } from '../../../../../shared/app-component-base';
import { ContainerSelect } from './../../../../models/container.viewmodel';
import { PlanItemGrid } from './../../../../models/plan-item-grid-model';

@Component({
  selector: 'app-plan-item-grid-items',
  templateUrl: './plan-item-grid-items.component.html',
  styleUrls: ['./plan-item-grid-items.component.css']
})
export class PlanItemGridItemsComponent extends AppComponentBase {
  @Input() items: PlanItemGrid[];
  @Input() editable = false;
  @Input() selectedItems: PlanItemGrid[] = [];
  @Input() enableGrouping = true;
  @Input() enableSearch = true;
  @Input() containers: ContainerSelect[];
  @Output() selectItem = new EventEmitter<PlanItemGrid>();
  @Input() expandDetails = false;
  @Input() refreshContainerGrid = false;
  @Input() loader = false;
  @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent;

  constructor() {
    super();
    this.calculatePlanStatus = this.calculatePlanStatus.bind(this);
  }

  // rowCollapsed(e) {
  //   // const idx = this.selectedIndexes.indexOf(this.grid.instance.getRowIndexByKey(e.key));
  //   // this.selectedIndexes.splice(idx, 1);

  //   const idx = this.selectedKeys.indexOf(e.key);
  //   this.selectedKeys.splice(idx, 1);

  //   // console.log(this.selectedIndexes);
  //   console.log(this.selectedKeys);
  // }

  // rowExpanded(e) {
  //   // this.selectedIndexes.push(this.grid.instance.getRowIndexByKey(e.key));
  //   this.selectedKeys.push(e.key);
  //   // console.log(this.selectedIndexes);
  //   console.log(this.selectedKeys);
  // }

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
        return this.translate('ItemStatus2');
      }

    }
    if (emptyCount === data.operations.length) {
      return this.translate('ItemStatus1');
    }
    if (emptyCount === 0) {
      return this.translate('ItemStatus3');
    }

    return this.translate('ItemStatus2');
  }

  applyCellStyles(e) {
    if (e.rowType !== 'data') {
      return;
    }
    if (!e.column.dataField && e.column.calculateCellValue) {
        e.cellElement.style.background = this.getItemPlanStatusColor(this.calculatePlanStatus(e.data));
    }
  }

  getItemPlanStatusColor(id) {
    // debugger;
    if (id === this.translate('ItemStatus1')) {
      return '';
    } else if (id === this.translate('ItemStatus2')) {
      return '#fbe8cc';
    } else if (id === this.translate('ItemStatus3')) {
      return '#d6d6d6';
    }
  }

  getPriorityColor(id) {
    if (id === 2) {
      return '#ff8383';
    }
  }
}

