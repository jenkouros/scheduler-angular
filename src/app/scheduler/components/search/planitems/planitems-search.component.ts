import { Component, Input, Output, EventEmitter } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { PlanItemSearch } from '../../../models/event.model';

@Component({
    selector: 'app-planitems-search',
    templateUrl: './planitems-search.component.html'
})
export class PlanItemsSearchComponent {
    @Input() store: CustomStore;
    @Output() openInScheduler = new EventEmitter<{dateStart: Date, idContainer: number}>();

    onOpenInScheduler(data: PlanItemSearch) {
        this.openInScheduler.emit({ dateStart: data.timeStartPreparation, idContainer: data.containerId });
    }

}
