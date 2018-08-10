import { Component, Input, OnChanges } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { GridStoreConfiguration } from '../../../models/shared.dto';
import { createStore } from '../../../../../../node_modules/devextreme-aspnet-data-nojquery';

@Component({
    selector: 'app-items-search',
    templateUrl: './items-search.component.html'
})
export class ItemsSearchComponent implements OnChanges {
    @Input() searchItemStoreConfiguration: GridStoreConfiguration | null;
    store: CustomStore | null;

    ngOnChanges() {
        this.store = this.searchItemStoreConfiguration
            ? createStore(this.searchItemStoreConfiguration)
            : null;
    }
}
