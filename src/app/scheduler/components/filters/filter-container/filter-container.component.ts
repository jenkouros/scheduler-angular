import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { ContainerSelect } from '../../../models/container.viewModel';

@Component({
    selector: 'app-filter-container',
    templateUrl: './filter-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterContainerComponent implements OnChanges {
    @Input() containerValues: ContainerSelect[];
    @Output() add = new EventEmitter<number>();
    @Output() remove = new EventEmitter<number>();
    storeChange = false;

    selectedValues: number[] = [];

    ngOnChanges() {
        this.storeChange = true;
        this.selectedValues = this.containerValues
            .filter(i => i.selected)
            .map(i => i.id);
    }

    onChange(ev) {
        if (this.storeChange) {
            this.storeChange = false;
            return;
        }
        if (ev.addedItems && ev.addedItems.length) {
            ev.addedItems.forEach(element => {
                this.add.emit(element.id);
            });
        }
        if (ev.removedItems && ev.removedItems.length) {
            ev.removedItems.forEach(element => {
                this.remove.emit(element.id);
            });
        }
    }
}
