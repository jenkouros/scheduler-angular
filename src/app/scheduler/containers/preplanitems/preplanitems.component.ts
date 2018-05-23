import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs';
import { PreplanItem } from '../../models/preplanitem.dto';
import { select } from '@ngrx/store';

@Component({
    selector: 'app-preplanitems',
    template: `
        <app-preplanitem-item
            *ngFor="let preplanitem of (preplanitems$ | async)"
            [preplanitem]="preplanitem"
            (reselectContainers)="onReselectContainers($event)"
            (deleteBatch)="onDeleteBatch($event)">
        </app-preplanitem-item>
    `
})
export class PreplanItemsComponent implements OnInit {
    preplanitems$: Observable<PreplanItem[]>;

    constructor(private store: Store<fromStore.SchedulerState>) {}

    ngOnInit() {
        this.store.dispatch(new fromStore.LoadPreplanItems());
        this.preplanitems$ = this.store.pipe(
            select(fromStore.getPreplanitems)
        );
    }

    onReselectContainers(containerIds: number[]) {
        this.store.dispatch(new fromStore.ReselectContainers(containerIds));
    }

    onDeleteBatch(batchId: number) {

    }
}
