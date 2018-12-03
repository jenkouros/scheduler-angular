import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { GridStoreConfiguration } from '../../../models/shared.dto';
import { Item } from '../../../models/item.dto';
import DataSource from 'devextreme/data/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';

@Component({
    selector: 'app-item-quick-plan',
    template: `
        <dx-autocomplete
            placeholder="Hitro planiranje naloga"
            [(value)]="workorder"
            [dataSource]="dataSource"
            (onValueChanged)="log($event)">
        </dx-autocomplete>
    `
})
export class ItemQuickPlanComponent implements OnChanges {
    @Input() storeConfiguration: GridStoreConfiguration | null;
    @Output() selectItem = new EventEmitter<Item>();
    @Output() hideItem = new EventEmitter<Item>();
    workorder: string | null = null;

    dataSource: DataSource | null;

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

    log(test) {
        console.log(test);
    }
}
