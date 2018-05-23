import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs';
import { ContainerSelect } from '../../models/container.viewModel';

@Component({
    selector: 'app-containers',
    template: `
        <app-container-item
            *ngFor="let container of (containers$ | async)"
            [container]="container"
            (selectContainer)="onSelectContainer($event)"
            (deselectContainer)="onDeselectContainer($event)">
        </app-container-item>
    `
})
export class ContainersComponent implements OnInit {
    containers$: Observable<ContainerSelect[]>;
    constructor(private store: Store<fromStore.SchedulerState>) {}

    ngOnInit() {
        this.store.dispatch(new fromStore.LoadContainers());
        this.containers$ = this.store.pipe(select(fromStore.getContainerSelectList));
    }

    onSelectContainer(containerId) {
        this.store.dispatch(new fromStore.SelectContainers([containerId]));
    }

    onDeselectContainer(containerId) {
        this.store.dispatch(new fromStore.DeselectContainers([containerId]));
    }
}
