import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import { PlannedEvent, PlanItemsLoadRequest, PlannedEventMove, PlannedEventNotWorkingHoursMove } from '../../models/event.model';
import { PreplanItem } from '../../models/preplanitem.dto';
import { Observable } from 'rxjs';
import { ContainerSelect } from '../../models/container.viewModel';
import { PlanSchedule } from '../../models/planschedule.dto';
import { PreplanitemUiState } from '../../models/preplanItem.store';

@Component({
    selector: 'app-planitems',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-plan-viewer
            [currentDate]="currentDate"
            [selectedPreplanItem]="selectedPrePlanItem$ | async"
            [selectedContainers]="selectedContainers$ | async"
            [planItemGetReponse]="planItems$ | async"
            [timeUpdateSuggestion]="timeUpdateSuggestion$ | async"
            [notWorkingHoursUpdateSuggestion]="notWorkingHoursUpdateSuggestion$ | async"
            (removeBlankSpace)="onRemoveBlankSpace($event)"
            (toggleLock)="onToggleLock($event)"
            (showMassLockPopup)="onShowMassLockPopup($event)"
            (planItemLoad)="onPlanItemLoad($event)"
            (planItemCreate)="onPlanItemCreate($event)"
            (planItemUpdate)="onPlanItemUpdate($event)"
            (planItemDelete)="onPlanItemDelete($event)"
            (getResolveSequenceSuggestion)="onGetResolveSequenceSuggestion($event)"
            (resolveSequence)="onResolveSequence($event)"
            (clearTimeSuggestion)="onClearTimeSuggestion()"
            (getResolveNotWorkingHoursSuggestion)="onGetResolveNotWorkingHoursSuggestion($event)"
            (resolveNotWorkingHours)="onResolveNotWorkingHours($event)"
            (clearNotWorkingHoursSuggestion)="onClearNotWorkingHoursSuggestion()"
            >
        </app-plan-viewer>
    `
})
export class PlanitemsComponent implements OnInit {
    selectedPrePlanItem$: Observable<PreplanItem | null>;
    selectedContainers$: Observable<ContainerSelect[]>;
    planItems$: Observable<{planItems: PlannedEvent[], notWorkingHoursEvents: {[idContainer: number]: PlanSchedule[]}}>;
    prePlanItemUiState$: Observable<PreplanitemUiState>;
    timeUpdateSuggestion$: Observable<{[idPrePlanItem: number]: PlannedEventMove } | null>;
    notWorkingHoursUpdateSuggestion$: Observable<PlannedEventNotWorkingHoursMove | null>;
    currentDate = new Date();

    private _containers: ContainerSelect[] = [];
    constructor(private store: Store<fromStore.SchedulerState>) {}

    ngOnInit(): void {
        this.selectedPrePlanItem$ = this.store.pipe(select(fromStore.getSelectedPrePlanItem));
        this.selectedContainers$ = this.store.pipe(select(fromStore.getSelectedContainerSelectList));
        this.planItems$ = this.store.pipe(select(fromStore.getEvents));

        // this.selectedContainers$.subscribe(containers => {
        //     if (containers && containers.length > 0) {
        //         if (containers.length > this._containers.length) {
        //             console.log('get events from selector');
        //             this.planItems$ = this.store.pipe(
        //                 select(fromStore.getEventsForContainers(containers.map(i => i.id)))
        //             );
        //         }
        //         this._containers = containers;
        //         // this.planItems$ = this.store.pipe(
        //         //     map(fromStore.getEventsForContainers(ids)),
        //         //     distinctUntilChanged()
        //         // );
        //         // this.planItems$.subscribe(data => console.log(data));
        //     } else {
        //         this._containers = [];
        //     }
        // });
        this.timeUpdateSuggestion$ = this.store.select(fromStore.getItemBatchTimeUpdateSuggestion);
        this.notWorkingHoursUpdateSuggestion$ = this.store.select(fromStore.getNotWorkingHoursUpdateSuggestion);
        this.store.select(fromStore.getEventsUiState).subscribe(i => {
            if (i.schedulerCurrentDate && i.schedulerCurrentDate !== this.currentDate) {
                this.currentDate = i.schedulerCurrentDate;
            }
        });
        // this.prePlanItemUiState$ = this.store.select(fromStore.getPrePlanItemUiState);
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

    onResolveSequence(eventMoveList: PlannedEventMove[]) {
        this.store.dispatch(new fromStore.UpdateEvents({planItemMoves: eventMoveList, fixPlanItems: false}));
    }

    onGetResolveSequenceSuggestion(idItemBatch: number) {
        this.store.dispatch(new fromStore.GetItemBatchTimeUpdateSuggestion(idItemBatch));
    }

    onClearTimeSuggestion() {
        this.store.dispatch(new fromStore.ClearItemBatchTimeUpdateSuggestion());
    }

    onResolveNotWorkingHours(eventMove: PlannedEventMove) {
        this.store.dispatch(new fromStore.UpdateEvents({planItemMoves: [eventMove], fixPlanItems: true}));
    }

    onGetResolveNotWorkingHoursSuggestion(idPlanItem: number) {
        this.store.dispatch(new fromStore.GetNotWorkingHoursPlanItemUpdateSuggestion(idPlanItem));
    }

    onClearNotWorkingHoursSuggestion() {
        this.store.dispatch(new fromStore.ClearNotWorkingHoursPlanItemUpdateSuggestion());
    }
}
