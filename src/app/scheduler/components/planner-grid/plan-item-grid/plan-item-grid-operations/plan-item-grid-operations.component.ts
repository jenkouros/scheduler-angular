import { AutoplanItem, PlanItemGridUpdate } from './../../../../store/actions/plan-item-grid.action';
import { PlanItemGridItem } from './../../../../models/plan-item-grid-item-model';
import { getContainerSelectList } from './../../../../store/selectors/containers.selectors';
import { getSelectedPlanId } from './../../../../../plan/store/selectors/plans.selector';
import { LoadContainers } from './../../../../store/actions/containers.action';
import { ContainerSelect } from './../../../../models/container.viewmodel';
import { ItemAutoplanRequest } from './../../../../models/item-autoplan.model';
import { AppState } from './../../../../../store/app.reducers';
import { PlanItemGridOperation } from './../../../../models/plan-item-grid-operation.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-plan-item-grid-operations',
  templateUrl: './plan-item-grid-operations.component.html'
})
export class PlanItemGridOperationsComponent {
  @Input() operations: PlanItemGridOperation[];
  @Input() item: PlanItemGridItem;
  @Output() updateItem = new EventEmitter();
  containers$: Observable<ContainerSelect[]>;

  constructor(private store: Store<AppState>) {
    store.pipe(select(getSelectedPlanId))
    .subscribe(id => {
      store.dispatch(new LoadContainers());
    });
    this.containers$ = store.pipe(select(getContainerSelectList));

  }

  updateOperation(e) {
    console.log(e);
    this.updateItem.emit();

    const updatedOperation = {
      ...e.oldData,
      ...e.newData
    } as PlanItemGridOperation;

    if (updatedOperation.idSubItem && updatedOperation.idContainer && updatedOperation.timeStart) {

      const request = new ItemAutoplanRequest();
      request.idContainer = updatedOperation.idContainer;
      request.timeStart = updatedOperation.timeStart;
      request.idSubItem = updatedOperation.idSubItem;
      request.idItem = this.item.idItem;
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

  applyPlanItemStyles() {}
}
