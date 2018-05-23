import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import { PlannedEvent, PlanItemsLoadRequest } from '../../models/event.model';
import { PreplanItem } from '../../models/preplanitem.dto';
import { Observable } from 'rxjs';
import { ContainerSelect } from '../../models/container.viewModel';

@Component({
    selector: 'app-planitems',
    template: `
        <app-plan-viewer
            [selectedPreplanItem]="selectedPrePlanItem$ | async"
            [selectedContainers]="selectedContainers$ | async"
            [planItems]="planItems$ | async"
            (removeBlankSpace)="onRemoveBlankSpace($event)"
            (toggleLock)="onToggleLock($event)"
            (showMassLockPopup)="onShowMassLockPopup($event)"
            (planItemLoad)="onPlanItemLoad($event)"
            (planItemCreate)="onPlanItemCreate($event)"
            (planItemUpdate)="onPlanItemUpdate($event)"
            (planItemDelete)="onPlanItemDelete($event)">
        </app-plan-viewer>
    `
})
export class PlanitemsComponent implements OnInit {
    selectedPrePlanItem$: Observable<PreplanItem | null>;
    selectedContainers$: Observable<ContainerSelect[]>;
    planItems$: Observable<PlannedEvent[]>;

    constructor(private store: Store<fromStore.SchedulerState>) {}

    ngOnInit(): void {
        this.selectedPrePlanItem$ = this.store.pipe(select(fromStore.getSelectedPrePlanItem));
        this.selectedContainers$ = this.store.pipe(select(fromStore.getSelectedContainerSelectList));
        this.selectedContainers$.subscribe(containers => {
            if (containers) {
                this.store.pipe(select(fromStore.getEventsForContainers(containers.map(i => i.id))));
            }
        });
    }

    onPlanItemLoad(loadRequest: PlanItemsLoadRequest) {
        this.store.dispatch(
            new fromStore.LoadEvents({
                containerIds: loadRequest.containerIds,
                dateFrom: loadRequest.fromDate,
                dateTo: loadRequest.toDate
            })
        );
    }

    onPlanItemCreate(planItem: PlannedEvent) {
        this.store.dispatch(new fromStore.CreateEvent(planItem));
    }

    onPlanItemUpdate(planItem: PlannedEvent) {
        this.store.dispatch(new fromStore.UpdateEvent(planItem));
    }

    onPlanItemDelete(planItem: PlannedEvent) {
        this.store.dispatch(new fromStore.DeleteEvent(planItem));
    }

    onRemoveBlankSpace(containerIds: number[]) {
        this.store.dispatch(new fromStore.RemoveContainersBlankSpace(
            { containerIds: containerIds }
        ));
    }

    onToggleLock(plannedEvent: PlannedEvent) {
        this.store.dispatch(new fromStore.ToggleEventLock(plannedEvent));
    }

    onShowMassLockPopup(containerIds: number[]) {
        this.store.dispatch(new fromStore.ToggleMassLockPopup({ containerIds: containerIds, visibility: true }));
    }
}
