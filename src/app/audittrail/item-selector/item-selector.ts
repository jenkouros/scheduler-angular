import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxAutocompleteComponent } from 'devextreme-angular';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import DataSource from 'devextreme/data/data_source';
import { environment } from '../../../environments/environment';
import { AppComponentBase } from '../../shared/app-component-base';
import { Item } from './../../scheduler/models/item.dto';

@Component({
  selector: 'app-item-selector',
  templateUrl: './item-selector.html'
})
export class ItemSelectorComponent extends AppComponentBase implements OnInit {
  // @Input() storeConfiguration: GridStoreConfiguration | null;
  @Output() selectItem = new EventEmitter<Item>();
  @Output() hideItem = new EventEmitter<Item>();
  @ViewChild(DxAutocompleteComponent, { static: false }) autoComplete: DxAutocompleteComponent;

  dataSource: DataSource | null;
  autocompleteValue: string;

  constructor() {
    super();
  }

  ngOnInit() {
    const customStore = createStore({
      loadUrl: environment.apiUrl + `/items/grid`,
      key: 'idItem',
      // loadParams: {
      //   idPlan: idPlan,
      //   ids: dict.ids,
      //   values: dict.values
      // }
    });
    this.dataSource = new DataSource(customStore);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.storeConfiguration) {
  //     if (!this.storeConfiguration) {
  //       this.dataSource = null;
  //       return;
  //     }


  //   }
  // }



  log(e) {
    if (this.dataSource) {
      const items = this.dataSource.items();
      console.log(this.autocompleteValue);
      if (items.length === 1 && items[0].code === this.autocompleteValue) {
        this.selectItem.emit(items[0]);
        this.reset();
      }
    }

  }

  onItemClick(e) {
    if (e && e.itemData) {
      this.selectItem.emit(e.itemData);
      this.reset();
    }
  }

  reset() {
      this.autoComplete.instance.reset();
  }
}
