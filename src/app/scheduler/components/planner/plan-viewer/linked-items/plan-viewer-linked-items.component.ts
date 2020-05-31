import { OperationUpdateHelper } from './../../../../helpers/operation-update.helper';
import { getContainerSelectList } from './../../../../store/selectors/containers.selectors';
import { AppState } from './../../../../../store/app.reducers';
import { ContainerSelect } from './../../../../models/container.viewmodel';
import { LinkedItemModel, PlannedEventSimple } from './../../../../models/event.model';
import { Component, Input, OnInit } from '@angular/core';
import { AppComponentBase } from './../../../../../shared/app-component-base';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as PlanContainerGridActions from '../../../../store/actions/plan-container-grid.action';

@Component({
  selector: 'app-linked-items',
  templateUrl: './plan-viewer-linked-items.component.html',
  styleUrls: ['./plan-viewer-linked-items.component.css']
})
export class PlanViewerLinkedItemsComponent extends AppComponentBase implements OnInit {
  @Input() items: LinkedItemModel[];
  @Input() title = this.translate('Parent_Order');
  @Input() smaller = false;
  @Input() selectedIdPlanItem: number;
  containers$: Observable<ContainerSelect[]>;

  constructor(private store: Store<AppState>) {
    super();
    this.containers$ = store.pipe(select(getContainerSelectList));
  }

  ngOnInit() {
    console.log(this.items);
  }

  updateOperation(e) {
    console.log(e);
    const updatedOperation = {
      ...e.oldData,
      ...e.newData
    } as PlannedEventSimple;
    // if (e.newData.operation && e.newData.operation.hasOwnProperty('isLocked')) {
    //   this.store.dispatch(new PlanItemActions.ToggleEventLock({
    //     id: e.oldData.operation.idPlanItem,
    //     isLocked: e.oldData.operation.isLocked
    //   }));
    //   return;
    // }

    // this.updateItem.emit();

    if (OperationUpdateHelper.isPlannedEventSimpleValidToUpdate(updatedOperation)) {
      this.store.dispatch(new PlanContainerGridActions.PlanContainerDialogGridUpdate({
        operation: updatedOperation,
        idPlanItem: this.selectedIdPlanItem
      }));
    }

  }
}
