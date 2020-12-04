import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PlannedEvent } from '../../models/event.model';
import { PlanGridOperation } from '../../models/plan-grid-operation.model';
import * as ContainerActions from '../actions/containers.action';
import * as PlanContainerGridActions from '../actions/plan-container-grid.action';
import * as PlanItemActions from '../actions/plan-container-grid.action';
import * as ContainerSelectors from '../selectors/containers.selectors';
import * as PlanItemSelectors from '../selectors/plan-container-grid.selectors';
import { AppState } from './../../../store/app.reducers';
import { CalendarFilter } from './../../models/calendar-filter.model';

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

  constructor(
    private store: Store<AppState>) {}

  loadContainers() {
    this.store.dispatch(new ContainerActions.LoadContainers());
  }

  removePlanItem(planItem: PlannedEvent) {
    // this.store.dispatch(new PlanItemActions.DeleteEvent(planItem));
  }

  setPlanDate(planDate: Date) {
    // this.store.dispatch(new PlanItemActions.);
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


}
