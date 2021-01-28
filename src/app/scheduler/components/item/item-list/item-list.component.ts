import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import DataSource from 'devextreme/data/data_source';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import * as ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { appSettings } from '../../../../../environments/environment';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { Item } from '../../../models/item.dto';
import { ItemServer } from '../../../models/server/item.servermodel';
import { GridStoreConfiguration } from '../../../models/shared.dto';
import { ApplicationFacadeService } from './../../../../store/application/application-facade.service';
import { ColorHelper } from './../../../helpers/color.helper';
import { StatusHelper } from './../../../helpers/status.helper';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent extends AppComponentBase implements OnChanges {
  @Input() storeConfiguration: GridStoreConfiguration | null;
  @Output() selectItem = new EventEmitter<Item>();
  @Output() hideItem = new EventEmitter<Item>();
  @Output() loadedItems = new EventEmitter<ItemServer[]>();
  @Output() showPlanned = new EventEmitter<boolean>();
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  printMode = false;
  settings = appSettings;
  dataSource: DataSource | null;

  constructor(private applicationFacade: ApplicationFacadeService, private http: HttpClient) {
    super();
  }

  refresh() {
    if (!this.dataSource) { return; }
    console.log(this.dataSource);
    this.dataSource.reload();
  }

  applyCellStyles(e) {
    if (e.rowType !== 'data') {
      return;
    }

    if (e.column.dataField === 'itemStatusLog.planItemName' && this.printMode && e.data.itemStatusLog) {
      e.cellElement.style.background = ColorHelper.colorMapper(e.data.itemStatusLog.idPlanItemStatus);
    }
    // console.log(e.column);
    // switch (e.column.dataField) {
    //   case 'operation.itemExecutionStatus.operationName': {
    //     if (!e.data.operation.itemExecutionStatus) { return; }
    //     e.cellElement.style.background = getplanGridOperationExecutionColor(e.data.operation.itemExecutionStatus.status);
    //     break;
    //   }
    // }
  }

  getLastStatusName(rowData: Item) {

    return rowData.itemStatusLog
      ? StatusHelper.getStatusName(rowData.itemStatusLog.idPlanItemStatus)
      : undefined;
  }

  getMrpValue(rowData) {
    const idx = rowData.filterValues.findIndex(i => i.idFilter === 7);

    return idx > -1
      ? rowData.filterValues[idx].filterValueName : '';
  }

  // getLastStatus(rowData: Item) {
  //   if (!rowData.planItemStatuses || !rowData.planItemStatuses.length) { return undefined; }
  //   const statuses = [...rowData.planItemStatuses];
  //   statuses.sort((a, b) => b.sequenceNumber - a.sequenceNumber);
  //   const lastStatus = statuses.find(i => i.idStatus > PlanItemStatusEnum.Planned);
  //   if (!lastStatus) { return undefined; }
  //   return lastStatus.name;

  // }

  getConnectedItemValue(rowData) {
    if (!rowData.connectedOrders) { return; }
    return rowData.connectedOrders
      .map(i => i.code + ' (' + i.articleCode + ')')
      .join(',');
  }

  getConnectedArticleCode(rowData) {
    if (!rowData.connectedOrders) { return; }
    return rowData.connectedOrders.map(i => i.articleCode).join(',');
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items = [
      {
        location: 'after',
        widget: 'dxCheckBox',
        options: {
            text: 'Show planned',
            onValueChanged: this.toggleShowPlanned.bind(this)
        }
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
            icon: 'refresh',
            onClick: this.refresh.bind(this)
        }
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
            text: 'PDF',
            onClick: this.exportPdf.bind(this)
        }
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
            text: 'Excel',
            onClick: this.exportExcel.bind(this)
        }
      },
    ];
}

toggleShowPlanned(e) {
  this.showPlanned.emit(e.value);
  this.printMode = e.value;
}

  exportExcel(e) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Workorders');
    const columnCount = this.dataGrid.instance.columnCount();
    if (!this.printMode) {
      this.dataGrid.instance.columnOption(columnCount - 1, 'visible', false);
      this.dataGrid.instance.columnOption(columnCount - 2, 'visible', false);
    }
    exportDataGrid({
      component: this.dataGrid.instance,
      worksheet: worksheet,
      autoFilterEnabled: true
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Workorder.xlsx');
        if (!this.printMode) {
          this.dataGrid.instance.columnOption(columnCount - 1, 'visible', true);
          if (appSettings.Item_EnableHiddingItems) {
            this.dataGrid.instance.columnOption(columnCount - 2, 'visible', true);
          }
        }
      });
    });
    e.cancel = true;
  }

  exportPdf() {
    const columnCount = this.dataGrid.instance.columnCount();
    if (!this.printMode) {
      this.dataGrid.instance.columnOption(columnCount - 1, 'visible', false);
      this.dataGrid.instance.columnOption(columnCount - 2, 'visible', false);
    }
    const doc = new jsPDF();
    exportDataGridToPdf({
        jsPDFDocument: doc,
        component: this.dataGrid.instance
    }).then(() => {
        const date = new Date();
        doc.save(`SinaproScheduler_workorders_${date.getFullYear()}${date.getMonth()}${date.getDate()}.pdf`);
        if (!this.printMode) {
          this.dataGrid.instance.columnOption(columnCount - 1, 'visible', true);
          if (appSettings.Item_EnableHiddingItems) {
            this.dataGrid.instance.columnOption(columnCount - 2, 'visible', true);
          }
        }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.storeConfiguration) {
      if (!this.storeConfiguration) {
        this.dataSource = null;
        return;
      }

        const customStore = createStore(this.storeConfiguration);

        customStore.on('loaded', (data) => {
          this.loadedItems.emit(data);
          this.applicationFacade.setLoader(false);
        });
        customStore.on('loading', () => this.applicationFacade.setLoader(true));
        this.dataSource = new DataSource(customStore);

    }
  }



  onSelectItem(item: Item) {
    if (item) {
      this.selectItem.emit(item);
    }
  }

  onDeleteItem(item: Item) {
    if (item) {
      this.hideItem.emit(item);
    }
  }
}
