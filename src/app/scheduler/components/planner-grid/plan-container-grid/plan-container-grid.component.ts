import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppComponentBase } from '../../../../shared/app-component-base';
import * as ItemActions from '../../../store/actions/items.action';
import * as PlanContainerGridActions from '../../../store/actions/plan-container-grid.action';
import * as PlanContainerGridSelectors from '../../../store/selectors/plan-container-grid.selectors';
import { getSelectedPlanId } from './../../../../plan/store/selectors/plans.selector';
import { Toolbar, ToolbarGroup, ToolbarItem, ToolbarItemStateEnum, ToolbarItemTypeEnum } from './../../../../shared/components/toolbar/toolbar.model';
import { AppState } from './../../../../store/app.reducers';
import { ContainerSelect } from './../../../models/container.viewmodel';
import { PlanContainerGrid } from './../../../models/plan-container-grid.model';
import { LoadContainers } from './../../../store/actions/containers.action';
import { getContainerSelectList } from './../../../store/selectors/containers.selectors';
import { PlanContainerGridActionEnum } from './plan-container-grid-action.model';

@Component({
  selector: 'app-plan-container-grid',
  templateUrl: './plan-container-grid.component.html',
  styleUrls: ['../shared/planner-grid.component.css']
})
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
  toolbar: Toolbar;
  showArchiveSwitch$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    super();
    this.expandAllSwitchEvent = this.expandAllSwitchEvent.bind(this);
    this.plannHoursSwitchEvent = this.plannHoursSwitchEvent.bind(this);
    this.inProcessWoSwitchEvent = this.inProcessWoSwitchEvent.bind(this);
    this.currentWoSwitchEvent = this.currentWoSwitchEvent.bind(this);
    this.setLimitDate = this.setLimitDate.bind(this);
    this.openCreateItemPopup = this.openCreateItemPopup.bind(this);
    this.showArchiveSwitchEvent = this.showArchiveSwitchEvent.bind(this);
    this.toolbar = this.createToolbar();
    this.showArchiveSwitch$ = this.store.pipe(select(PlanContainerGridSelectors.showArchiveSwitch));

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
  openCreateItemPopup() {
    this.store.dispatch(new ItemActions.ShowCreateItemPopup());
  }
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

  showArchiveSwitchEvent(e) {
    this.store.dispatch(new PlanContainerGridActions.SetShowArchiveSwitch(e.value));
    this.store.dispatch(new PlanContainerGridActions.LoadPlanContainerGrid(undefined));
  }

  createToolbar() {
    return {
      groups: [
        {
          location: 'before',
          items: [
            {
              iconClass: '',
              altText: 'Datum od',
              state: ToolbarItemStateEnum.visible,
              actionId: PlanContainerGridActionEnum.ItemsFromDate,
              type: ToolbarItemTypeEnum.date,
              value: false,
            },
          ]
        },
        {
          location: 'center',
          items: [
            {
              iconClass: '',
              altText: this.translate('Plan_hours'),
              state: ToolbarItemStateEnum.visible,
              actionId: PlanContainerGridActionEnum.PlanHours,
              type: ToolbarItemTypeEnum.toggle,
              value: false
            },
            {
              iconClass: '',
              altText: 'Vrivanje',
              state: ToolbarItemStateEnum.visible,
              actionId: PlanContainerGridActionEnum.Inserting,
              type: ToolbarItemTypeEnum.toggle,
              value: false
            }
          ] as ToolbarItem[]
        },
        {
          location: 'after',
          items: [
            {
              iconClass: '',
              altText: this.translate('Expand'),
              state: ToolbarItemStateEnum.visible,
              actionId: PlanContainerGridActionEnum.ExpandAll,
              type: ToolbarItemTypeEnum.toggle,
              value: false
            },
            {
              iconClass: '',
              altText: this.translate('Workorders_In_Progress'),
              state: ToolbarItemStateEnum.visible,
              actionId: PlanContainerGridActionEnum.ExecutingItems,
              type: ToolbarItemTypeEnum.toggle,
              value: false
            },
            {
              iconClass: '',
              altText: this.translate('Current_Workorders'),
              state: ToolbarItemStateEnum.visible,
              actionId: PlanContainerGridActionEnum.CurrentItems,
              type: ToolbarItemTypeEnum.toggle,
              value: false
            }
          ]
        }
      ] as ToolbarGroup[]
    } as Toolbar;
  }

}
