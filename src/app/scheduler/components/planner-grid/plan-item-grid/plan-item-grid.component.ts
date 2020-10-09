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
import * as ItemActions from '../../../store/actions/items.action';
import * as PlanContainerGridSelectors from '../../../store/selectors/plan-container-grid.selectors';
import { AppComponentBase } from '../../../../shared/app-component-base';
import * as ItemSelectors from '../../../store/selectors/items.selectors';

@Component({
  selector: 'app-plan-item-grid',
  templateUrl: './plan-item-grid.component.html',
  styleUrls: ['../shared/planner-grid.component.css']
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
    this.plannedHoursSwitchEvent = this.plannedHoursSwitchEvent.bind(this);
    this.setLimitDate = this.setLimitDate.bind(this);

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
    this.openCreateItemPopup = this.openCreateItemPopup.bind(this);

    this.store.pipe(select(ItemSelectors.getCreatedItemId)).subscribe(id => {
        if (id) {
          console.log(id);
          this.store.dispatch(new PlanItemGridActions.LoadPlanItemGrid());
        }
      });
  }

  openCreateItemPopup() {
    this.store.dispatch(new ItemActions.ShowCreateItemPopup());
  }

  onItemSelect(item: PlanItemGrid) {
    this.store.dispatch(new PlanItemGridActions.PlanItemGridOpen(item));
  }

  setLimitDate(date: Date) {
    this.store.dispatch(new PlanItemGridActions.SetItemLimitDate(date));
  }

  plannedHoursSwitchEvent(e) {
    this.store.dispatch(new PlanContainerGridActions.SetPlanHoursSwitch(e.value));
  }

}
