import { Observable } from 'rxjs';
import { AppState } from './../../../../../store/app.reducers';
import { ContainerSelect } from './../../../../models/container.viewmodel';
import { PlanContainerGrid } from './../../../../models/plan-container-grid.model';
import { PlanGridOperation } from './../../../../models/plan-grid-operation.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as PlanContainerGridActions from '../../../../store/actions/plan-container-grid.action';
import * as PlanContainerGridSelectors from '../../../../store/selectors/plan-container-grid.selectors';

@Component({
  selector: 'app-plan-container-grid-operations',
  templateUrl: './plan-container-grid-operations.component.html'
})
export class PlanContainerGridOperationsComponent {
  gridItems: PlanContainerGrid[] = [];
  planHoursSwitch$: Observable<boolean>;
  @Input() set datasource(grid: PlanContainerGrid[]) {
    this.gridItems = grid;
    this.refresh = true;
  }
  @Output() updateItem = new EventEmitter();
  @Input() containers: ContainerSelect[];
  selectedKeys: any[] = [];
  refresh = false;
  constructor(private store: Store<AppState>) {
    this.planHoursSwitch$ = store.pipe(select(PlanContainerGridSelectors.planHoursSwitch));
  }

  priorities = [
    { ID: 0, Name: 'Normalna' },
    { ID: 1, Name: 'Nizka' },
    { ID: 2, Name: 'Visoka' }
  ];

  executionStatuses = [
    { ID: 0, Name: 'Ni podatka' },
    { ID: 1, Name: 'Planiran' },
    { ID: 2, Name: 'V izvajanju' },
    { ID: 3, Name: 'Končan' },
    { ID: 4, Name: 'V zastoju' }
  ];

  updateOperation(e) {
    // this.refresh = true;
    console.log(e);
    this.updateItem.emit();

    const updatedOperation = {
      ...e.oldData.operation,
      ...e.newData.operation
    } as PlanGridOperation;

    // if (updatedOperation.idSubItem && updatedOperation.idContainer && updatedOperation.timeStart) {

    //   const request = new ItemAutoplanRequest();
    //   request.idContainer = updatedOperation.idContainer;
    //   request.timeStart = updatedOperation.timeStart;
    //   request.idSubItem = updatedOperation.idSubItem;
    //   request.idItem = this.item.idItem;
    //   this.store.dispatch(new AutoplanItem(request));
    // }

    if (updatedOperation.idPrePlanItem) {
      this.store.dispatch(new PlanContainerGridActions.PlanContainerGridUpdate(updatedOperation));
    }

  }

  rowExpanded(e) {
    this.selectedKeys.push(e.key[0]);
    // e.component.expandAll();
    // console.log(e.component.getRowIndexByKey(e.key));
  }

  rowCollapsed(e) {
    const idx = this.selectedKeys.indexOf(e.key[0]);
    this.selectedKeys.splice(idx, 1);
    console.log(this.selectedKeys);
  }

  onContentReady(e) {
    console.log('onContentReady');
    if (this.refresh) {
      this.selectedKeys.forEach(key => {
        e.component.expandRow([key]);
        this.refresh = false;
      });
    }
  }

  applyPlanItemStyles() {}
}