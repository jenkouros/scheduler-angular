import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxSchedulerComponent } from 'devextreme-angular';
import { Observable, Subscription } from 'rxjs';
import { AppComponentBase } from '../../../shared/app-component-base';
import { ContainerStatus } from '../../models/container.dto';
import { PlannedEvent } from '../../models/event.model';
import { PlanGridOperationChange, PlanGridOperationHelper } from '../../models/plan-grid-operation.model';
import { CalendarFacade, ContainerFacade } from '../../store';
import { Toolbar, ToolbarGroup, ToolbarItem, ToolbarItemStateEnum, ToolbarItemTypeEnum } from './../../../shared/components/toolbar/toolbar.model';
import { ColorHelper } from './../../helpers/color.helper';
import { ContainerSelect } from './../../models/container.viewmodel';
import { PlanItemStatusEnum } from './../../models/event.model';
import { PlanContainerGrid } from './../../models/plan-container-grid.model';

@Component({
  selector: 'app-calendar-daily',
  templateUrl: './calendar-daily.component.html',
  styleUrls: ['./calendar-daily.component.css']
})
export class CalendarDailyComponent extends AppComponentBase implements OnInit, OnDestroy {
  containers$: Observable<ContainerSelect[]>;
  containerStatuses$: Observable<ContainerStatus[]>;
  containerTooltips: { [containerId: number]: string } = {};
  containerTooltipsSubscription: Subscription;
  containers: ContainerSelect[] = [];
  filterChangeSubscription: Subscription;
  preplaTasksReloadFlagSubscription: Subscription;
  planTasksSubscription: Subscription;
  containersSubscription: Subscription;
  draggingGroupName = 'appointmentsGroup';
  appointments: PlanContainerGrid[] = [];
  currentDate$: Observable<Date>;
  selectedDeparment$: Observable<number>;
  dialogUpdateData$: Observable<PlanGridOperationChange | undefined>;
  firstDayOfWeek = 1;
  // @Input() preplanTasks: TaskCommon[] = [];
  // @Output() removePreplanTask = new EventEmitter<number>();
  // @Output() addPreplanTask = new EventEmitter<TaskCommon>();
  @Input() autoReload = false;
  @Input() editable = true;
  @Input() height: number | string = window.innerHeight - 300;
  intervalId;
  cellDuration = 60;
  groupTooltipsState = {};
  toolbar: Toolbar;
  toolbarFilter: {
    search: string;
    statuses: number[],
    showNotPlannable: boolean
  };
  toolbarFilterSubscription: Subscription;
  showNotPlannedTracker: boolean;

  // prioritiesData: Container[] = [];
  @ViewChild(DxSchedulerComponent, {static: false}) scheduler: DxSchedulerComponent;
  @ViewChild('calendar', {static: false}) schedulerRef: ElementRef;
  @HostListener('window:resize') onResize() {
    this.scheduler.instance.repaint();
  }

  constructor(private calendarFacade: CalendarFacade, private containerFacade: ContainerFacade) {
    super();
    this.onAppointmentRemove = this.onAppointmentRemove.bind(this);
    this.onAppointmentAdd = this.onAppointmentAdd.bind(this);
    this.onCalendarAdd = this.onCalendarAdd.bind(this);
    this.onCalendarRemove = this.onCalendarRemove.bind(this);
  }

  // getHeight() {
  //   return window.innerHeight - 300;
  // }

  printScreen() {
  }

  toolbarChange(item: ToolbarItem) {
    if (item.type === ToolbarItemTypeEnum.toggle) {
      if (item.actionId < 4) {
        if (item.value) {
          this.toolbarFilter.statuses.push(item.data);
        } else {
          const idx = this.toolbarFilter.statuses.findIndex(i => i === item.data);
          this.toolbarFilter.statuses.splice(idx, 1);
        }
      } else if (item.actionId === 4) {
        this.toolbarFilter.showNotPlannable = item.value;
      } else if (item.actionId === 5) {
        this.height = !item.value
          ? window.innerHeight - 300
          : '100%';
        setTimeout(() => this.scheduler.instance.repaint(), 0);

        if (!item.value) {
          this.scheduler.instance.option('height', '100%');
        } else {
          this.scheduler.instance.option('height', window.innerHeight - 300);
        }
      }
    } else if (item.type === ToolbarItemTypeEnum.text) {
      this.toolbarFilter.search = item.value;
    } else if (item.type === ToolbarItemTypeEnum.button) {
      this.reloadCalendar();
    }
    this.calendarFacade.setFilter(this.toolbarFilter.search,
      this.toolbarFilter.statuses.findIndex(i => i === PlanItemStatusEnum.Planned) > -1,
      this.toolbarFilter.statuses.findIndex(i => i === PlanItemStatusEnum.Running) > -1,
      this.toolbarFilter.statuses.findIndex(i => i === PlanItemStatusEnum.Finished) > -1,
      this.toolbarFilter.showNotPlannable);
  }

  print() {
    // const width = this.scheduler.instance.option('width');
    this.scheduler.instance.option('width', '210mm');
    this.scheduler.instance.repaint();
    window.print();
    // this.scheduler.instance.option('width', '100%');
    // this.scheduler.instance.repaint();
  }

  deletePlanItem(planItem: PlanContainerGrid) {
    this.scheduler.instance.deleteAppointment(planItem);
    this.scheduler.instance.hideAppointmentTooltip();
  }

  onAppointmentDeleting(e) {
    e.cancel = true;
    // console.log(e);
    this.calendarFacade.deletePlanItem(e.appointmentData.operation.idPlanItem);
  }

  getToolbar() {
    return {
      groups: [
        {
          items: [
            {
              actionId: -1,
              altText: this.translate('Search'),
              state: ToolbarItemStateEnum.visible,
              type: ToolbarItemTypeEnum.text,
              value: this.toolbarFilter.search
            },
            {
              actionId: 5,
              altText: 'Print height',
              state: ToolbarItemStateEnum.visible,
              type: ToolbarItemTypeEnum.toggle,
              value: false
            },
          ] as ToolbarItem[],
          sequenceNumber: 1,
          location: 'before'
        },
        {
          items: [
            {
              actionId: 4,
              altText: this.translate('Overview'),
              state: ToolbarItemStateEnum.visible,
              type: ToolbarItemTypeEnum.toggle,
              value: this.toolbarFilter.showNotPlannable
            },
            {
              actionId: -1,
              altText: 'Refresh',
              icon: 'refresh',
              state: ToolbarItemStateEnum.visible,
              type: ToolbarItemTypeEnum.button,
              value: ''
            }
          ] as ToolbarItem[],
          sequenceNumber: 2,
          location: 'after'
        },
        {
          items: [
            {
              actionId: 1,
              data: PlanItemStatusEnum.Planned,
              altText: this.translate('PlanItemStatus1'),
              state: ToolbarItemStateEnum.visible,
              type: ToolbarItemTypeEnum.toggle,
              value: this.toolbarFilter.statuses.findIndex(i => i === PlanItemStatusEnum.Planned) > -1
            },
            {
              actionId: 2,
              data: PlanItemStatusEnum.Running,
              altText: this.translate('PlanItemStatus2'),
              state: ToolbarItemStateEnum.visible,
              type: ToolbarItemTypeEnum.toggle,
              value: this.toolbarFilter.statuses.findIndex(i => i === PlanItemStatusEnum.Running) > -1
            },
            {
              actionId: 3,
              data: PlanItemStatusEnum.Finished,
              altText: this.translate('PlanItemStatus3'),
              state: ToolbarItemStateEnum.visible,
              type: ToolbarItemTypeEnum.toggle,
              value: this.toolbarFilter.statuses.findIndex(i => i === PlanItemStatusEnum.Finished) > -1
            }
          ] as ToolbarItem[],
          sequenceNumber: 3,
          location: 'after'
        }
      ] as ToolbarGroup[]
    } as Toolbar;
  }

  ngOnInit() {
    this.toolbarFilterSubscription = this.calendarFacade.toolbarFilter$
      .subscribe(f => {
        if (this.toolbarFilter && this.showNotPlannedTracker !== f.showNotPlannable) {
          this.reloadCalendar();
        }
        this.toolbarFilter = {
          search: f.search,
          showNotPlannable: f.showNotPlannable,
          statuses: [...f.statuses]
        };

        this.showNotPlannedTracker = f.showNotPlannable;
      });
    this.toolbar = this.getToolbar();
    this.dialogUpdateData$ = this.calendarFacade.detailsUpdateDialogData$;
    this.currentDate$ = this.calendarFacade.currentDate$;
    this.containerTooltipsSubscription = this.calendarFacade.containerTooltips$.subscribe(t =>
      this.containerTooltips = t);
    // this.selectedDeparment$ = this.store.pipe(select(FilterSelectors.selectedDepartment));
    this.containers$ = this.calendarFacade.selectedContainers$;
    this.containerStatuses$ = this.containerFacade.containerStatuses$;
    this.planTasksSubscription = this.calendarFacade.events$.subscribe(e => {
      if (e) {
        this.appointments = e.map(i => {
          let endDate = new Date(i.operation.timeEnd);
          endDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate() - 1,
            23, 59, 59);
          return {
            ...i,
            operation: {
              ...i.operation,
              timeEnd: endDate
            },
            item: {
              ...i.item
            },
            allDay: true
          };
        });
      }
    });




    // this.store.pipe(select(PlanTaskSelectors.planTasks)).subscribe(e => {
    //   if (e) {
    //     this.appointments = e.map(i => ({
    //       ...i,
    //       planTask: {
    //         ...i.planTask
    //       },
    //       color: i.color,
    //       alerts: i.alerts
    //     }));
    //   }
    // });

    this.calendarFacade.loadContainers();
    this.containersSubscription = this.containers$.subscribe(i => {
      const reloadEvents = this.containers.length === 0;
      this.containers = i;
      if (reloadEvents) {
        setTimeout(() =>
          this.reloadCalendar()
        );
      }
    });
    if (this.autoReload) {
      this.intervalId = setInterval(() => this.reloadCalendar(), 30000);
    }
  }

  onChangeSequence(isUp: boolean, idPlanItem: number) {
    this.calendarFacade.changeSequence(isUp, idPlanItem);
    this.scheduler.instance.hideAppointmentTooltip();
  }

  ngOnDestroy() {
    if (this.planTasksSubscription) {
      this.planTasksSubscription.unsubscribe();
    }
    if (this.containersSubscription) {
      this.containersSubscription.unsubscribe();
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.containerTooltipsSubscription) {
      this.containerTooltipsSubscription.unsubscribe();
    }
    if (this.toolbarFilterSubscription) {
      this.toolbarFilterSubscription.unsubscribe();
    }
  }

  renderAppointment(e) {
    e.appointmentElement.style.backgroundColor = ColorHelper.colorMapper(
      e.appointmentData.operation.idPlanItemStatus);
  }

  onAppointmentRemove(planItem: PlanContainerGrid) {
    this.scheduler.instance.hideAppointmentTooltip();
    // if (!this.canUpdate(planItem)) {
    //   return;
    // }

    this.calendarFacade.removePlanItem(planItem);
    // let index = this.appointments.findIndex(i => i.preplanTask.id === planTaskCommon.preplanTask.id);

    // if (index >= 0) {
    //   while (index >= 0) {
    //     this.scheduler.instance.deleteAppointment(this.appointments[index]);
    //     this.appointments.splice(index, 1);
    //     index = this.appointments.findIndex(i => i.preplanTask.id === planTaskCommon.preplanTask.id);
    //   }
    //   const task = TaskCommon.createTaskCommon(planTaskCommon);
    //   this.addPreplanTask.emit(task);
    //  this.store.dispatch(PlanTaskActions.deletePrePlanTask({planTaskCommon}));
    // }
  }

  onOptionChanged(e) {
    // if (e.name === 'currentDate') {
    //   this.scheduler.instance.option('firstDayOfWeek', e.value.getDay());
    //   this.scheduler.instance.repaint();
    // }

    if (e.name === 'currentDate' || e.name === 'resources' && e.value.length > 0) {
      // this.firstDayOfWeek = e.value.getDay();
      // this.scheduler.instance.repaint();


      setTimeout(() =>
        this.reloadCalendar()
      );
    }

    if (e.name === 'currentDate') {
      this.calendarFacade.setPlanDate(e.value);
    }

  }

  reloadCalendar() {
    if (!this.scheduler || !this.containers) {
      return;
    }
    const startDate = this.scheduler.instance.getStartViewDate();
    console.log(this.scheduler.instance.getStartViewDate());
    console.log(this.scheduler.instance.getEndViewDate());
    console.log( new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 14));
    this.calendarFacade.loadPlanItems(
      this.containers.map(i => i.id),
      startDate,
      new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 14)
    );
  }

  private getAddDates(e, addDays: number = 0): { start: Date, end: Date } {
    const startDate = new Date(e.itemData.operation.timeStart);
    const endDate = new Date(e.itemData.operation.timeEnd);

    startDate.setHours(0, 0, 0 , 0);
    endDate.setHours(23, 59, 59); // TODO

    if (addDays && addDays > 0) {
      endDate.setDate(endDate.getDate() + addDays);
    }
    return {
      start: startDate,
      end: endDate
    };
  }


  onAppointmentAdd(e) {
    // console.log(e);
    // const index = this.preplanTasks.indexOf(e.fromData);
    // if (index >= 0) {
    //   const task = this.preplanTasks[index];
    //   this.removePreplanTask.emit(index);
    const dates = this.getAddDates(e, 0);

    //   // this.scheduler.instance.addAppointment(PlanTask.createPlanTask(prePlanItem, startDate, endDate, e.itemData.idContainer));
    //   this.scheduler.instance.addAppointment(PlanTaskCommon.createPlanTaskCommon(task, {
    //     timeStart: dates.start,
    //     timeEnd: dates.end,
    //     containerId: e.itemData.planTask.containerId
    //   } as PlanTaskCreate));
      const operation = PlanGridOperationHelper.createFromPrePlanItem(
        e.fromData,
        dates.start,
        dates.end,
        e.itemData.operation.idContainer
        );

      operation.options = {
        dayPlan: true
      };
      this.calendarFacade.updatePlanContainerGridOperation(operation, true);

      // const planTaskCreateRequest = new PlanTaskCreateRequest();
      // planTaskCreateRequest.idContainer = e.itemData.planTask.containerId,
      // planTaskCreateRequest.idPrePlanTask = e.itemData.preplanTask.id,
      // planTaskCreateRequest.timeStart = dates.start,
      // planTaskCreateRequest.timeEnd = dates.end;
      // planTaskCreateRequest.comment = task.task.comment;
      // planTaskCreateRequest.taskName = task.task.taskName;

      // this.store.dispatch(PlanTaskActions.createPlanTask({ planTaskCreateRequest }));

    // }
  }

  onAppointmentUpdating(e) {
    console.log(e);
    if (!this.canUpdate(e.newData)) {
      e.cancel = true;
      return false;
    }

    const index = this.appointments.findIndex(i => i.operation.idPlanItem === e.oldData.operation.idPlanItem);
    if (index < 0) {
      e.cancel = true;
      return false;
    }
    const updatedPlanTask = {...this.appointments[index]} as PlanContainerGrid;
    this.appointments.splice(index, 1);
    if (e.newData.operation.idContainer && !Array.isArray(e.newData.operation.idContainer)) {
      updatedPlanTask.operation.idContainer = e.newData.operation.idContainer;
    } else { // on appointment extend
      updatedPlanTask.operation.idContainer = updatedPlanTask.operation.idContainer[0];
    }
    // updatedPlanTask.planTask.timeStart = e.newData.startDate;
    // updatedPlanTask.planTask.timeEnd = e.newData.endDate;
    updatedPlanTask.operation.timeStart = e.newData.operation.timeStart;
    updatedPlanTask.operation.timeEnd = e.newData.operation.timeEnd;
    updatedPlanTask.operation.options = {
      dayPlan: true
    };
    this.appointments.push(updatedPlanTask);

    this.calendarFacade.updatePlanContainerGridOperation(updatedPlanTask.operation);
  }

  onAppointmentFormOpening($event) {
    this.scheduler.instance.hideAppointmentTooltip();
    $event.cancel = true;
    this.calendarFacade.showDetails($event.appointmentData.operation.idPlanItem);
    // this.store.dispatch(PlanTaskActions.showPlanTaskDialog({idTask: $event.appointmentData.task.taskId}));
    return false;
  }

  canUpdate(planItem: PlannedEvent) {
    if (!this.editable) {
      return false;
    }
    // if (planTaskCommon.planTaskMetaData.externalStatusId > PlanTaskStatusEnum.Open) {
    //   this.notifyService.error('Update is not allowed because task\'s status.');
    //   return false;
    // }

    return true;
  }

  onCalendarAdd(e) {
    this.onAppointmentAdd(e);
  }

  onCalendarRemove(e) {
      this.onAppointmentRemove(e);
  }

  toggleGroupTooltip(data: any, containerId: number) {
    console.log(data);
    if (this.groupTooltipsState[containerId]) {
      this.groupTooltipsState[containerId] = false;
    } else if (this.containerTooltips[containerId]) {
      this.groupTooltipsState[containerId] = true;
    }
  }

  isTooltipGroupVisible(containerId: number) {
    return this.groupTooltipsState[containerId];
  }

  getTooltipDescription(containerId: number) {
    return this.containerTooltips[containerId];
  }

  contanerStatusSet(containerId: number, currentStatusId: number, clickedStatusId: number) {
    if (currentStatusId !== clickedStatusId) {
      this.containerFacade.updateContainerStatus(containerId, clickedStatusId);
    }
  }
}
