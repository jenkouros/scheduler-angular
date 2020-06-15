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

  plannedHoursSwitch(e) {
    this.store.dispatch(new PlanContainerGridActions.SetPlanHoursSwitch(e.value));
  }
  expandAllSwitch(e) {
    this.store.dispatch(new PlanContainerGridActions.SetExpandAllSwitch(e.value));
  }

}
