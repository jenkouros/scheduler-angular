import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromPlanStore from '../../../plan/store';
import { ContainerSelect } from '../../models/container.viewModel';
import { PlanItemsLoadRequest, PlannedEvent, PlannedEventMove, PlannedEventNotWorkingHoursMove } from '../../models/event.model';
import { PlanGridOperationChange } from '../../models/plan-grid-operation.model';
import { PlanSchedule } from '../../models/planschedule.dto';
import { PreplanItem } from '../../models/preplanitem.dto';
import { PreplanitemUiState } from '../../models/preplanItem.store';
import * as fromStore from '../../store';
// import * as PlanItemActions from '../../../../store/actions/events.action';
import * as PlanContainerGridSelectors from '../../store/selectors/plan-container-grid.selectors';

@Component({
  selector: 'app-planitems',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './planitems.component.html'
})
export class PlanitemsComponent implements OnInit {
  selectedPrePlanItem$: Observable<PreplanItem | null>;
  selectedContainers$: Observable<ContainerSelect[]>;
  containers$: Observable<ContainerSelect[]>;
  planItems$: Observable<{
    planItems: PlannedEvent[];
    notWorkingHoursEvents: { [idContainer: number]: PlanSchedule[] };
  }>;
  prePlanItemUiState$: Observable<PreplanitemUiState>;
  timeUpdateSuggestion$: Observable<{ [idPrePlanItem: number]: PlannedEventMove } | null>;
  timeUpdateRealizationSuggestion$: Observable<{ [idPlanItem: number]: PlannedEventMove } | null>;
  notWorkingHoursUpdateSuggestion$: Observable<PlannedEventNotWorkingHoursMove | null>;
  currentDate = new Date();
  timeUpdateDialog$: Observable<PlanGridOperationChange | undefined>;

  private _containers: ContainerSelect[] = [];
  constructor(
    private store: Store<fromStore.SchedulerState>,
    private planStore: Store<fromPlanStore.SchedulerPlansState>
  ) {}

  ngOnInit(): void {
    /* this.planStore.select(fromPlanStore.getSelectedPlanId).subscribe(id => {
      console.log(id);
      this.store.select(fromStore.getSelectedContainerIds).subscribe(ids => {
        this.store.dispatch(new fromStore.ReloadEvents({ containerIds: ids }));
      });
    }); */

    this.selectedPrePlanItem$ = this.store.pipe(select(fromStore.getSelectedPrePlanItem));
    this.selectedContainers$ = this.store.pipe(select(fromStore.getSelectedContainerSelectList));
    this.containers$ = this.store.pipe(select(fromStore.getContainerSelectList));
    this.planItems$ = this.store.pipe(select(fromStore.getEvents));
    this.timeUpdateDialog$ = this.store.pipe(select(PlanContainerGridSelectors.getUpdateTimeDialogData));

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
    this.timeUpdateRealizationSuggestion$ = this.store.select(
      fromStore.getRealizationTimeUpdateSuggestion
    );
    this.notWorkingHoursUpdateSuggestion$ = this.store.select(
      fromStore.getNotWorkingHoursUpdateSuggestion
    );
    this.store.select(fromStore.getEventsUiState).subscribe(i => {
      if (i.schedulerCurrentDate && i.schedulerCurrentDate !== this.currentDate) {
        this.currentDate = i.schedulerCurrentDate;
      }
    });
    // this.prePlanItemUiState$ = this.store.select(fromStore.getPrePlanItemUiState);
  }

  onPlanItemReload(containerIds: number[]) {
    this.store.dispatch(new fromStore.ReloadEvents({ containerIds: containerIds }));
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
    this.store.dispatch(new fromStore.RemoveContainersBlankSpace({ containerIds: containerIds }));
  }

  onToggleLock(plannedEvent: PlannedEvent) {
    this.store.dispatch(new fromStore.ToggleEventLock({id: plannedEvent.id, isLocked: plannedEvent.isLocked}));
  }

  onShowMassLockPopup(containerIds: number[]) {
    this.store.dispatch(
      new fromStore.ToggleMassLockPopup({ containerIds: containerIds, visibility: true })
    );
  }

  onResolveSequence(eventMoveList: PlannedEventMove[]) {
    this.store.dispatch(
      new fromStore.UpdateEvents({
        planItemMoves: eventMoveList,
        fixPlanItems: false,
        ignoreStatusLimitation: false
      })
    );
  }

  onGetResolveSequenceSuggestion(idItemBatch: number) {
    this.store.dispatch(new fromStore.GetItemBatchTimeUpdateSuggestion(idItemBatch));
  }

  onClearTimeSuggestion() {
    this.store.dispatch(new fromStore.ClearItemBatchTimeUpdateSuggestion());
  }

  onResolveNotWorkingHours(eventMove: PlannedEventMove) {
    this.store.dispatch(
      new fromStore.UpdateEvents({
        planItemMoves: [eventMove],
        fixPlanItems: true,
        ignoreStatusLimitation: false
      })
    );
  }

  onGetResolveNotWorkingHoursSuggestion(idPlanItem: number) {
    this.store.dispatch(new fromStore.GetNotWorkingHoursPlanItemUpdateSuggestion(idPlanItem));
  }

  onClearNotWorkingHoursSuggestion() {
    this.store.dispatch(new fromStore.ClearNotWorkingHoursPlanItemUpdateSuggestion());
  }

  onClearTimeRealizationSuggestion() {
    this.store.dispatch(new fromStore.ClearRealizationTimeUpdateSuggestion());
  }

  onLoadTimeRealizationSuggestion(request: PlanItemsLoadRequest) {
    this.store.dispatch(new fromStore.GetRealizationTimeUpdateSuggestion(request));
  }

  onResolveRealization(eventMoveList: PlannedEventMove[]) {
    this.store.dispatch(
      new fromStore.UpdateEvents({
        planItemMoves: eventMoveList,
        fixPlanItems: true,
        ignoreStatusLimitation: true
      })
    );
  }

  onShowPlanItemDetails(id: number) {
    this.store.dispatch(new fromStore.ShowPlanItemDetailPopup({id: id}));
  }
}
