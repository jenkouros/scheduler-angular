import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import DataSource from 'devextreme/data/data_source';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { appSettings } from '../../../../../environments/environment';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { Item } from '../../../models/item.dto';
import { ItemServer } from '../../../models/server/item.servermodel';
import { GridStoreConfiguration } from '../../../models/shared.dto';
import { ApplicationFacadeService } from './../../../../store/application/application-facade.service';



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
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  printMode = false;
  settings = appSettings;
  dataSource: DataSource | null;

  constructor(private applicationFacade: ApplicationFacadeService, private http: HttpClient) {
    super();
  }

  exportGrid(grid) {
    const columnCount = this.dataGrid.instance.columnCount();
    this.dataGrid.instance.columnOption(columnCount - 1, 'visible', false);
    this.dataGrid.instance.columnOption(columnCount - 2, 'visible', false);
    const doc = new jsPDF();
    exportDataGridToPdf({
        jsPDFDocument: doc,
        component: grid.instance
    }).then(() => {
        const date = new Date();
        doc.save(`SinaproScheduler_workorders_${date.getFullYear()}${date.getMonth()}${date.getDate()}.pdf`);
        this.dataGrid.instance.columnOption(columnCount - 1, 'visible', true);
        this.dataGrid.instance.columnOption(columnCount - 2, 'visible', true);
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
