import { getContainerSelectList } from './../../../store/selectors/containers.selectors';
import { ContainerSelect } from './../../../models/container.viewmodel';
import { LoadContainers } from './../../../store/actions/containers.action';
import { getSelectedPlanId } from './../../../../plan/store/selectors/plans.selector';
import * as PlanItemGridActions from './../../../store/actions/plan-item-grid.action';
import { PlanItemGrid } from './../../../models/plan-item-grid-model';
import * as PlanItemGridSelectors from './../../../store/selectors/plan-item-grid.selectors';
import { AppState } from './../../../../store/app.reducers';
import { Observable, Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as PlanContainerGridActions from '../../../store/actions/plan-container-grid.action';
import * as PlanContainerGridSelectors from '../../../store/selectors/plan-container-grid.selectors';


@Component({
  selector: 'app-plan-item-grid',
  templateUrl: './plan-item-grid.component.html'
})
export class PlanItemGridComponent {
  planItemGrid$: Observable<PlanItemGrid[]>;
  selectedPlanItemGrid$: Observable<PlanItemGrid[]>;
  limitDate$: Observable<Date>;
  loading$: Observable<boolean>;
  limitDateSubscription: Subscription;
  containers$: Observable<ContainerSelect[]>;
  planHoursSwitch$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    store.pipe(select(getSelectedPlanId))
    .subscribe(id => {
      store.dispatch(new LoadContainers());
    });
    this.loading$ = this.store.pipe(select(PlanItemGridSelectors.loader));
    this.loading$.subscribe(i => console.log(i));

    this.limitDate$ = store.pipe(select(PlanItemGridSelectors.limitItemLoadDate));
    this.planItemGrid$ = store.pipe(select(PlanItemGridSelectors.getPlanItemGrid));
    this.limitDate$.subscribe(i => store.dispatch(new PlanItemGridActions.LoadPlanItemGrid()));


    this.selectedPlanItemGrid$ = store.pipe(select(PlanItemGridSelectors.selectedPlanItemGrid));

    this.containers$ = store.pipe(select(getContainerSelectList));
    this.planHoursSwitch$ = this.store.pipe(select(PlanContainerGridSelectors.planHoursSwitch));

  }

  onItemSelect(item: PlanItemGrid) {
    this.store.dispatch(new PlanItemGridActions.PlanItemGridOpen(item));
  }

  setLimitDate(date: Date) {
    this.store.dispatch(new PlanItemGridActions.SetItemLimitDate(date));
  }

  plannedHoursSwitch(e) {
    this.store.dispatch(new PlanContainerGridActions.SetPlanHoursSwitch(e.value));
  }


  // test(e, idItem: number) {
  //   console.log(e);

  //   const updatedOperation = {
  //     ...e.oldData,
  //     ...e.newData
  //   } as PlanItemGridOperation;

  //   if (updatedOperation.idSubItem && updatedOperation.idContainer && updatedOperation.timeStart) {

  //     const request = new ItemAutoplanRequest();
  //     request.idContainer = updatedOperation.idContainer;
  //     request.timeStart = updatedOperation.timeStart;
  //     request.idSubItem = updatedOperation.idSubItem;
  //     request.idItem = idItem;
  //     this.store.dispatch(new AutoplanItem(request));
  //   }
  // }

  updatePlanItem(event) {

  }

  priorities = [
    { Name: 'Nizka', ID: 1 },
    { Name: 'Normalna', ID: 2 },
    { Name: 'Visoka', ID: 3 }
  ];

  itemPlanStatuses = [
    { Name: 'Delno planiran', ID: 1 },
    { Name: 'Lansiran', ID: 2 },
    { Name: 'Dokončno planiran', ID: 3 },
  ];

  itemExecutionStatuses = [
    { Name: 'V izvajanju', ID: 1 },
    { Name: 'Končan', ID: 2 },
    { Name: 'Ni podatka', ID: 3 },
    { Name: 'Planiran', ID: 4 }
  ];

  containers = [
    {Code: 'M2', ID: 2},
    {Code: 'M1', ID: 1},
    {Code: 'D1', ID: 3},
    {Code: 'D2', ID: 4},
    {Code: 'Navidezno DM', ID: 5}
  ];

  applyCellStyles(e) {
    if (e.rowType !== 'data') {
      return;
    }

    switch (e.columnIndex) {
      case 5: {
        e.cellElement.style.background = this.getItemPlanStatusColor(e.data.item.itemPlanStatus);
        break;
      }
      case 6: {
        e.cellElement.style.background = this.getItemExecutionStatusColor(e.data.item.itemExecutionStatus);
        break;
      }
      case 7: {
        e.cellElement.style.background = this.getPriorityColor(e.data.item.priority);
        break;
      }
    }
  }

  applyPlanItemStyles(e) {
    if (e.rowType !== 'data') {
      return;
    }

    switch (e.columnIndex) {
      case 1: {
        e.cellElement.style.background = this.getContainerColor(e.data.containerCode);
        break;
      }
      case 4: {
        e.cellElement.style.background = this.getItemExecutionStatusColor(e.data.executionStatus);
        break;
      }
    }
  }

  getItemExecutionStatusColor(id) {
    if (id === 1) {
      return '#ccfbcc';
    } else if (id === 2) {
      return '#d6d6d6';
    }
  }

  getItemPlanStatusColor(id) {
    if (id === 2) {
      return '#b1b1ff';
    } else if (id === 1) {
      return '#fbe8cc';
    } else if (id === 3) {
      return '#d6d6d6';
    }
  }

  getPriorityColor(id) {
    if (id === 3) {
      return '#ff8383';
    }
  }

  getContainerColor(id) {
    if (id === 5) {
      return '#fbe8cc';
    }
  }
}
