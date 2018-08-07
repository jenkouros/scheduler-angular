import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ContainerSelect } from '../../../models/container.viewModel';

@Component({
    selector: 'app-container-group',
    template: `
    <button style="padding:9px; color: #084578;" class="btn btn-light" (click)="processClick()">
        {{ selected ? 'Odstrani izbiro' : 'Izberi vse' }}
    </button>`
})
export class ContainerGroupComponent implements OnChanges {

    @Input() containers: ContainerSelect[];
    @Output() groupSelect = new EventEmitter<number[]>();
    @Output() groupDeselect = new EventEmitter<number[]>();
    selected = false;

    ngOnChanges(changes: SimpleChanges): void {
        this.selected = this.containers.findIndex(o => o.selected) > -1;
    }

    processClick() {
        if (this.selected) {
            this.groupDeselect.emit(this.getIds());
        } else {
            this.groupSelect.emit(this.getIds());
        }
    }

    getIds() {
        return this.containers.map(i => i.id);
    }

}
