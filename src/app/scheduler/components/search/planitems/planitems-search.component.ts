import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { PlanItemSearch } from '../../../models/event.model';
import { GridStoreConfiguration } from '../../../models/shared.dto';
import { createStore } from '../../../../../../node_modules/devextreme-aspnet-data-nojquery';

@Component({
    selector: 'app-planitems-search',
    templateUrl: './planitems-search.component.html'
})
export class PlanItemsSearchComponent implements OnChanges {
    @Input() searchPlanItemStoreConfiguration: GridStoreConfiguration | null;
    store: CustomStore | null;
    @Output() openInScheduler = new EventEmitter<{dateStart: Date, idContainer: number}>();

    onOpenInScheduler(data: PlanItemSearch) {
        this.openInScheduler.emit({ dateStart: data.timeStartPreparation, idContainer: data.containerId });
    }

    ngOnChanges() {
        this.store = this.searchPlanItemStoreConfiguration
            ? createStore(this.searchPlanItemStoreConfiguration)
            : null;
    }

}
