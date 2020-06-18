import { getContainerSelectList } from './../../../store/selectors/containers.selectors';
import { LoadContainers } from './../../../store/actions/containers.action';
import { getSelectedPlanId } from './../../../../plan/store/selectors/plans.selector';
import { AppState } from './../../../../store/app.reducers';
import { ContainerSelect } from './../../../models/container.viewmodel';
import { PlanContainerGrid } from './../../../models/plan-container-grid.model';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as PlanContainerGridSelectors from '../../../store/selectors/plan-container-grid.selectors';
import * as PlanContainerGridActions from '../../../store/actions/plan-container-grid.action';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'app-plan-container-grid',
  templateUrl: './plan-container-grid.component.html'
})
export class PlanContainerGridComponent extends AppComponentBase {
  planContainerGrid$: Observable<PlanContainerGrid[]>;
  // selectedPlanItemGrid$: Observable<PlanItemGrid[]>;
  limitDate$: Observable<Date>;
  loading$: Observable<boolean>;
  planHoursSwitch$: Observable<boolean>;
  expandAllSwitch$: Observable<boolean>;
  limitDateSubscription: Subscription;
  containers$: Observable<ContainerSelect[]>;

  constructor(private store: Store<AppState>) {
    super();
    this.expandAllSwitchEvent = this.expandAllSwitchEvent.bind(this);
    this.plannHoursSwitchEvent = this.plannHoursSwitchEvent.bind(this);
    this.setLimitDate = this.setLimitDate.bind(this);

    store.pipe(select(getSelectedPlanId))
    .subscribe(id => {
      store.dispatch(new LoadContainers());
    });
    this.loading$ = this.store.pipe(select(PlanContainerGridSelectors.loader));
    this.planHoursSwitch$ = this.store.pipe(select(PlanContainerGridSelectors.planHoursSwitch));
    this.expandAllSwitch$ = this.store.pipe(select(PlanContainerGridSelectors.expandAllSwitch));
    this.limitDate$ = store.pipe(select(PlanContainerGridSelectors.limitContainerGridLoadDate));
    this.planContainerGrid$ = store.pipe(select(PlanContainerGridSelectors.getPlanContainerGrid));
    this.limitDate$.subscribe(i => store.dispatch(new PlanContainerGridActions.LoadPlanContainerGrid()));


    // this.selectedPlanItemGrid$ = store.pipe(select(PlanContainerGridSelectors.selectedPlanItemGrid));

    this.containers$ = store.pipe(select(getContainerSelectList));
  }

  // onItemSelect(item: PlanContainerGrid) {
  //   this.store.dispatch(new PlanItemGridActions.PlanItemGridOpen(item));
  // }

  setLimitDate(date: Date) {
    this.store.dispatch(new PlanContainerGridActions.SetPlanContainerGridLimitDate(date));
  }

  plannHoursSwitchEvent(e) {
    this.store.dispatch(new PlanContainerGridActions.SetPlanHoursSwitch(e.value));
  }
  expandAllSwitchEvent(e) {
    this.store.dispatch(new PlanContainerGridActions.SetExpandAllSwitch(e.value));
  }

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
      // case 1: {
      //   e.cellElement.style.background = this.getContainerColor(e.data.containerCode);
      //   break;
      // }
      case 4: {
        e.cellElement.style.background = this.getItemExecutionStatusColor(e.data.executionStatus);
        break;
      }
      case 5: {
        e.cellElement.style.background = this.getPriorityColor(e.data.priority);
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
