import { AutoplanItem, PlanItemGridUpdate } from './../../../../store/actions/plan-item-grid.action';
import { PlanGridItem } from '../../../../models/plan-grid-item-model';
import { getContainerSelectList } from './../../../../store/selectors/containers.selectors';
import { getSelectedPlanId } from './../../../../../plan/store/selectors/plans.selector';
import { LoadContainers } from './../../../../store/actions/containers.action';
import { ContainerSelect } from './../../../../models/container.viewmodel';
import { ItemAutoplanRequest } from './../../../../models/item-autoplan.model';
import { AppState } from './../../../../../store/app.reducers';
import { PlanGridOperation, planGridOperationPriorities, planGridOperationExecution, getplanGridOperationExecutionColor, getplanGridOperationPriorityColor } from '../../../../models/plan-grid-operation.model';
import { Component, Input, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as PlanContainerGridSelectors from '../../../../store/selectors/plan-container-grid.selectors';
import * as PlanItemActions from '../../../../store/actions/events.action';
import { AppComponentBase } from '../../../../../shared/app-component-base';

@Component({
  selector: 'app-plan-item-grid-operations',
  templateUrl: './plan-item-grid-operations.component.html'
})
export class PlanItemGridOperationsComponent extends AppComponentBase implements OnDestroy {
  planHoursSwitch$: Observable<boolean>;
  @Input() operations: PlanGridOperation[];
  @Input() item: PlanGridItem;
  @Output() updateItem = new EventEmitter();
  @Input() containers: ContainerSelect[];
  // containers$: Observable<ContainerSelect[]>;
  planHoursSwitchSubscription: Subscription;
  planHours: boolean;
  priorities: {ID: number, Name: string}[] = planGridOperationPriorities;
  executionStatuses: {ID: number, Name: string}[] = planGridOperationExecution;

  constructor(private store: Store<AppState>) {
    super();
    this.planHoursSwitch$ = store.pipe(select(PlanContainerGridSelectors.planHoursSwitch));
    this.planHoursSwitchSubscription = this.planHoursSwitch$.subscribe(v => this.planHours = v);
    // store.pipe(select(getSelectedPlanId))
    // .subscribe(id => {
    //   store.dispatch(new LoadContainers());
    // });
    // this.containers$ = store.pipe(select(getContainerSelectList));

  }

  ngOnDestroy() {
    if (this.planHoursSwitchSubscription) {
      this.planHoursSwitchSubscription.unsubscribe();
    }
  }

  updateOperation(e) {
    console.log(e);
    if (e.newData && e.newData.hasOwnProperty('isLocked')) {
      if (e.oldData.idPlanItem) {
        this.store.dispatch(new PlanItemActions.ToggleEventLock({
          id: e.oldData.idPlanItem,
          isLocked: e.oldData.isLocked
        }));
      }
      return;
    }

    this.updateItem.emit();

    const updatedOperation = {
      ...e.oldData,
      ...e.newData
    } as PlanGridOperation;

    if (updatedOperation.idSubItem && updatedOperation.idContainer && updatedOperation.timeStart) {

      const request = new ItemAutoplanRequest();
      request.idContainer = updatedOperation.idContainer;
      request.timeStart = updatedOperation.timeStart;
      request.idSubItem = updatedOperation.idSubItem;
      request.idItem = this.item.idItem;
      request.planDay = !this.planHours;
      this.store.dispatch(new AutoplanItem(request));
    }

    if (updatedOperation.idPrePlanItem) {
      this.store.dispatch(new PlanItemGridUpdate(updatedOperation));

      // const request = new ItemAutoplanRequest();
      // request.idContainer = updatedOperation.idContainer;
      // request.timeStart = updatedOperation.timeStart;
      // request.idSubItem = updatedOperation.idSubItem;
      // request.idItem = this.item.idItem;
      // this.store.dispatch(new AutoplanItem(request));
    }

  }

  applyCellStyles(e) {
    if (e.rowType !== 'data') {
      return;
    }

    switch (e.columnIndex) {

      case 5: {
        e.cellElement.style.background = getplanGridOperationExecutionColor(e.data.idUserStatus);
        break;
      }
      case 4: {
        e.cellElement.style.background = getplanGridOperationPriorityColor(e.data.idPriority);
        break;
      }
    }
  }
}
