import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppComponentBase } from '../../../../shared/app-component-base';
import * as PlanContainerGridActions from '../../../store/actions/plan-container-grid.action';
import * as PlanContainerGridSelectors from '../../../store/selectors/plan-container-grid.selectors';
import { getSelectedPlanId } from './../../../../plan/store/selectors/plans.selector';
import { AppState } from './../../../../store/app.reducers';
import { ContainerSelect } from './../../../models/container.viewmodel';
import { PlanContainerGrid } from './../../../models/plan-container-grid.model';
import { LoadContainers } from './../../../store/actions/containers.action';
import { getContainerSelectList } from './../../../store/selectors/containers.selectors';

// @Component({
//   selector: 'app-plan-container-grid',
//   templateUrl: './plan-container-grid.component.html',
//   styleUrls: ['../shared/planner-grid.component.css']
// })
export class PlanContainerGridComponent extends AppComponentBase {
  planContainerGrid$: Observable<PlanContainerGrid[]>;
  // selectedPlanItemGrid$: Observable<PlanItemGrid[]>;
  limitDate$: Observable<Date>;
  loading$: Observable<boolean>;
  planHoursSwitch$: Observable<boolean>;
  expandAllSwitch$: Observable<boolean>;
  inProcessWoSwitch$: Observable<boolean>;
  currentWoSwitch$: Observable<boolean>;
  limitDateSubscription: Subscription;
  containers$: Observable<ContainerSelect[]>;

  constructor(private store: Store<AppState>) {
    super();
    this.expandAllSwitchEvent = this.expandAllSwitchEvent.bind(this);
    this.plannHoursSwitchEvent = this.plannHoursSwitchEvent.bind(this);
    this.inProcessWoSwitchEvent = this.inProcessWoSwitchEvent.bind(this);
    this.currentWoSwitchEvent = this.currentWoSwitchEvent.bind(this);
    this.setLimitDate = this.setLimitDate.bind(this);

    store.pipe(select(getSelectedPlanId))
    .subscribe(id => {
      store.dispatch(new LoadContainers());
    });
    this.loading$ = this.store.pipe(select(PlanContainerGridSelectors.loader));
    this.planHoursSwitch$ = this.store.pipe(select(PlanContainerGridSelectors.planHoursSwitch));
    this.expandAllSwitch$ = this.store.pipe(select(PlanContainerGridSelectors.expandAllSwitch));
    this.inProcessWoSwitch$ = this.store.pipe(select(PlanContainerGridSelectors.inProcessWoSwitch));
    this.currentWoSwitch$ = this.store.pipe(select(PlanContainerGridSelectors.currentWoSwitch));
    this.limitDate$ = store.pipe(select(PlanContainerGridSelectors.limitContainerGridLoadDate));
    this.planContainerGrid$ = store.pipe(select(PlanContainerGridSelectors.getPlanContainerGrid));
    this.limitDate$.subscribe(i => store.dispatch(new PlanContainerGridActions.LoadPlanContainerGrid(undefined)));


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
  inProcessWoSwitchEvent(e) {
    this.store.dispatch(new PlanContainerGridActions.SetInProgressWoSwitch(e.value));
  }
  currentWoSwitchEvent(e) {
    this.store.dispatch(new PlanContainerGridActions.SetCurrentWoSwitch(e.value));
  }

}
