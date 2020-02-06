import { DxDataGridComponent } from 'devextreme-angular';
import { PlanItemGrid } from './../../../../models/plan-item-grid-model';
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '../../../../../shared/app-component-base';

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
  @Output() selectItem = new EventEmitter<PlanItemGrid>();
  @ViewChild(DxDataGridComponent) grid: DxDataGridComponent;
  selectedIndexes: number[] = [];
  selectedKeys: number[] = [];
  refresh = false;

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

  applyCellStyles() {}
}

