import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { Item } from '../../../models/item.dto';
import { GridStoreConfiguration } from '../../../models/shared.dto';
import { ItemServer } from '../../../models/server/item.servermodel';
import { appSettings } from '../../../../../environments/environment';
import { AppComponentBase } from '../../../../shared/app-component-base';
// import { appSettings } from ''

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

  settings = appSettings;
  dataSource: DataSource | null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.storeConfiguration) {
      if (!this.storeConfiguration) {
        this.dataSource = null;
        return;
      }

      // if (!this.dataSource) {
        const customStore = createStore(this.storeConfiguration);
        customStore.on('loaded', (data) => this.loadedItems.emit(data));
        this.dataSource = new DataSource(customStore);
      // } else {
      //   this.dataSource.reload();
      // }
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
