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
import { AppComponentBase } from '../../../../shared/app-component-base';


@Component({
  selector: 'app-plan-item-grid',
  templateUrl: './plan-item-grid.component.html'
})
export class PlanItemGridComponent extends AppComponentBase {
  planItemGrid$: Observable<PlanItemGrid[]>;
  selectedPlanItemGrid$: Observable<PlanItemGrid[]>;
  limitDate$: Observable<Date>;
  loading$: Observable<boolean>;
  limitDateSubscription: Subscription;
  containers$: Observable<ContainerSelect[]>;
  planHoursSwitch$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    super();
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

}
