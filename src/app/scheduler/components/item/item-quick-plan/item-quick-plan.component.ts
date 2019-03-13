import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { GridStoreConfiguration } from '../../../models/shared.dto';
import { Item } from '../../../models/item.dto';
import DataSource from 'devextreme/data/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { DxAutocompleteComponent } from '../../../../../../node_modules/devextreme-angular';

@Component({
    selector: 'app-item-quick-plan',
    template: `
        <dx-autocomplete
            [(value)]="autocompleteValue"
            placeholder="Hitro planiranje naloga"
            [dataSource]="dataSource"
            valueExpr="code"
            (onItemClick)="onItemClick($event)"
            (onEnterKey)="log($event)">
        </dx-autocomplete>
    `
})
export class ItemQuickPlanComponent implements OnChanges {
    @Input() storeConfiguration: GridStoreConfiguration | null;
    @Output() selectItem = new EventEmitter<Item>();
    @Output() hideItem = new EventEmitter<Item>();
    @ViewChild(DxAutocompleteComponent) autoComplete: DxAutocompleteComponent;

    dataSource: DataSource | null;
    autocompleteValue: string;

    ngOnChanges(changes: SimpleChanges) {
      if (changes.storeConfiguration) {
        if (!this.storeConfiguration) {
          this.dataSource = null;
          return;
        }
          const customStore = createStore(this.storeConfiguration);
          this.dataSource = new DataSource(customStore);

      }
    }

    // selectionChanged(e: any) {
    //     if (e.selectedItem && typeof e.selectedItem === 'object') {

    //         this.selectItem.emit(e.selectedItem);
    //         this.reset();

    //     }
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
