import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppComponentBase } from '../../../../shared/app-component-base';
import * as ItemActions from '../../../store/actions/items.action';
import * as PlanContainerGridActions from '../../../store/actions/plan-container-grid.action';
import * as ItemSelectors from '../../../store/selectors/items.selectors';
import * as PlanContainerGridSelectors from '../../../store/selectors/plan-container-grid.selectors';
import { getSelectedPlanId } from './../../../../plan/store/selectors/plans.selector';
import { AppState } from './../../../../store/app.reducers';
import { ContainerSelect } from './../../../models/container.viewmodel';
import { PlanItemGrid } from './../../../models/plan-item-grid-model';
import { LoadContainers } from './../../../store/actions/containers.action';
import * as PlanItemGridActions from './../../../store/actions/plan-item-grid.action';
import { getContainerSelectList } from './../../../store/selectors/containers.selectors';
import * as PlanItemGridSelectors from './../../../store/selectors/plan-item-grid.selectors';

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
  showArchiveSwitch$: Observable<boolean>;

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
    this.showArchiveSwitchEvent = this.showArchiveSwitchEvent.bind(this);


    this.selectedPlanItemGrid$ = store.pipe(select(PlanItemGridSelectors.selectedPlanItemGrid));

    this.containers$ = store.pipe(select(getContainerSelectList));
    this.planHoursSwitch$ = this.store.pipe(select(PlanContainerGridSelectors.planHoursSwitch));
    this.openCreateItemPopup = this.openCreateItemPopup.bind(this);

    this.showArchiveSwitch$ = this.store.pipe(select(PlanContainerGridSelectors.showArchiveSwitch));

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

  showArchiveSwitchEvent(e) {
    this.store.dispatch(new PlanContainerGridActions.SetShowArchiveSwitch(e.value));
    this.store.dispatch(new PlanItemGridActions.LoadPlanItemGrid());
  }

}
