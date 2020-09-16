import { OperationChangeOriginEnum } from './../../../../models/plan-grid-operation.model';
import { appSettings } from './../../../../../../environments/environment.ecm360test';
import { AutoplanItem } from './../../../../store/actions/plan-item-grid.action';

import { ItemAutoplanRequest } from './../../../../models/item-autoplan.model';
import { Observable, Subscription } from 'rxjs';
import { getContainerSelectList } from './../../../../store/selectors/containers.selectors';
import { OperationUpdateHelper } from './../../../../helpers/operation-update.helper';
import { Store, select } from '@ngrx/store';
import { PlannedEventSimple, PlanItemCreateRequest } from './../../../../models/event.model';
import { Component, Input, OnDestroy } from '@angular/core';
import { AppComponentBase } from '../../../../../shared/app-component-base';
import { AppState } from '../../../../../store/app.reducers';
import * as PlanContainerGridActions from '../../../../store/actions/plan-container-grid.action';
import { ContainerSelect } from '../../../../models/container.viewModel';
import * as PlanContainerGridSelectors from '../../../../store/selectors/plan-container-grid.selectors';
import * as PlanItemActions from '../../../../store/actions/events.action';

@Component({
  selector: 'app-event-tooltip-sequence',
  templateUrl: './event-tooltip-sequence-operations.component.html'
})
export class SequenceOperationListComponent extends AppComponentBase implements OnDestroy {
  @Input() sequence: PlannedEventSimple[] = [];
  @Input() selectedIdPrePlanitem: number | undefined;
  @Input() selectedIdPlanItem: number | undefined;
  @Input() selectedIdItem: number;
  containers$: Observable<ContainerSelect[]>;

  planHoursSwitch$: Observable<boolean>;
  planHoursSwitchSubscription: Subscription;
  planHours: boolean;

  constructor(private store: Store<AppState>) {
    super();
    this.containers$ = store.pipe(select(getContainerSelectList));
    this.planHoursSwitch$ = store.pipe(select(PlanContainerGridSelectors.planHoursSwitch));
    this.planHoursSwitchSubscription = this.planHoursSwitch$.subscribe(v => this.planHours = v);
  }

  updateOperation(e) {
    // console.log(e);
    const updatedOperation = {
      ...e.oldData,
      ...e.newData
    } as PlannedEventSimple;

    if (e.oldData && e.oldData.idPrePlanItem &&
      (e.newData.hasOwnProperty('timeStartPreparation') || e.newData.hasOwnProperty('timeEnd'))) {
        // show popup
        this.store.dispatch(new PlanContainerGridActions.ShowUpdatePlanGridOperationDialog({
          oldTimeEnd: e.oldData.timeEnd,
          oldTimeStart: e.oldData.timeStartPreparation,
          timeChange: {
            timeStart: e.newData.timeStartPreparation,
            timeEnd: e.newData.timeEnd
          },
          operation: updatedOperation,
          changeOrigin: OperationChangeOriginEnum.InfoDialog,
          planItemId: this.selectedIdPlanItem
        }));
        return;
    }



    if (!updatedOperation.idPlanItem) {
      if (!updatedOperation.idPrePlanItem && updatedOperation.containerId && updatedOperation.timeStartPreparation) {
        const request = new ItemAutoplanRequest();
        request.idSubItem = updatedOperation.idSubItem;
        request.idContainer = updatedOperation.containerId;
        request.timeStart = updatedOperation.timeStartPreparation;
        request.planDay = !this.planHours;
        request.planLinkedItems = false;
        request.planSequencePlanItems = false;
        request.idItem = this.selectedIdItem;
        this.store.dispatch(new AutoplanItem(request));
      } else if (updatedOperation.idPrePlanItem && updatedOperation.containerId && updatedOperation.timeStartPreparation) {
        const request = {
          idPrePlanItem: updatedOperation.idPrePlanItem,
          idContainer: updatedOperation.containerId,
          timePreparationStart: updatedOperation.timeStartPreparation,
          timeExecutionStart: updatedOperation.timeStartPreparation,
          timeExecutionEnd: updatedOperation.timeStartPreparation,
          options: {
            enablePlanningOnAllWorkplaces: appSettings.PlanItem_EnablePlanningOnAllWorkplaces
          }
        } as PlanItemCreateRequest;
        this.store.dispatch(new PlanItemActions.CreateEventFromRequest(request));
      }

      // this.store.dispatch(new PlanItem)
    } else {
      if (OperationUpdateHelper.isPlannedEventSimpleValidToUpdate(updatedOperation)) {
        this.store.dispatch(new PlanContainerGridActions.PlanContainerDialogGridUpdate({
          operation: updatedOperation,
          idPlanItem: this.selectedIdPlanItem ? this.selectedIdPlanItem : updatedOperation.idPlanItem
        }));
      }
    }
  }

  validatePlanGridRow(e) {

    const event = {
      ...e.oldData,
      ...e.newData
    } as PlannedEventSimple;

    const validation = OperationUpdateHelper.validatePlannedEventSimple(event);
    e.isValid = validation.valid;
    e.errorText = validation.error;
  }

  ngOnDestroy() {
    if (this.planHoursSwitchSubscription) {
      this.planHoursSwitchSubscription.unsubscribe();
    }
  }


}
