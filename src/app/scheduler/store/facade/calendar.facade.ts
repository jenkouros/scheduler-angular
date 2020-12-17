import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PlanContainerGrid } from '../../models/plan-container-grid.model';
import { PlanGridOperation } from '../../models/plan-grid-operation.model';
import * as ContainerActions from '../actions/containers.action';
import * as EventActions from '../actions/events.action';
import * as PlanContainerGridActions from '../actions/plan-container-grid.action';
import * as PlanItemActions from '../actions/plan-container-grid.action';
import * as ContainerSelectors from '../selectors/containers.selectors';
import * as PlanItemSelectors from '../selectors/plan-container-grid.selectors';
import { AppState } from './../../../store/app.reducers';
import { CalendarFilter } from './../../models/calendar-filter.model';
import { PlanItemStatusEnum } from './../../models/event.model';



@Injectable()
export class CalendarFacade {
  public currentDate$ = this.store.pipe(select(PlanItemSelectors.planDate));
  public selectedContainers$ = this.store.pipe(select(ContainerSelectors.getSelectedContainerSelectList));
  public events$ = this.store.pipe(select(PlanItemSelectors.getPlanContainerGrid));
  // public events$: Observable<{
  //   planItems: PlannedEvent[];
  //   notWorkingHoursEvents: { [idContainer: number]: PlanSchedule[] };
  // }> = this.store.pipe(select(PlanItemSelectors.getEvents));
  public containerTooltips$ = this.store.pipe(select(ContainerSelectors.getContainerTooltips));
  public detailsUpdateDialogData$ = this.store.pipe(select(PlanItemSelectors.getUpdateTimeDialogData));
  public toolbarFilter$ = this.store.pipe(select(PlanItemSelectors.filter));

  constructor(
    private store: Store<AppState>) {}

  loadContainers() {
    this.store.dispatch(new ContainerActions.LoadContainers());
  }

  removePlanItem(planItem: PlanContainerGrid) {
    // this.store.dispatch(new PlanItemActions.DeleteEvent(planItem));
  }

  setPlanDate(planDate: Date) {
    // this.store.dispatch(new PlanItemActions.);
  }

  changeSequence(isUp: boolean, idPlanItem: number) {
    this.store.dispatch(new PlanItemActions.ChangeSequence({isUp, idPlanItem}));
  }

  loadPlanItems(containerIds: number[], startDate: Date, endDate: Date) {
    this.store.dispatch(new PlanItemActions.LoadPlanContainerGrid({
      containerIds: containerIds,
      dateStart: startDate,
      dateEnd: endDate
    } as CalendarFilter));
  }

  updatePlanContainerGridOperation(operation: PlanGridOperation, allowAdd = false) {
    this.store.dispatch(new PlanContainerGridActions.PlanContainerGridUpdate({
      operation: operation,
      allowAdd: allowAdd
    }));
  }

  showDetails(id: number) {
    this.store.dispatch(new EventActions.ShowPlanItemDetailPopup({id: id}));
  }

  setFilter(search: string, planned: boolean, running: boolean, finished: boolean) {
    const statuses: number[] = [];
    if (planned) {
      statuses.push(PlanItemStatusEnum.Planned);
    }
    if (running) {
      statuses.push(PlanItemStatusEnum.Running);
    }
    if (finished) {
      statuses.push(PlanItemStatusEnum.Finished);
      statuses.push(PlanItemStatusEnum.ExternalyClosed);
    }

    this.store.dispatch(new PlanContainerGridActions.SetPlanContainerGridFilter({search, statuses}));
  }
}
