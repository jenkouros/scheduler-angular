import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxSchedulerComponent } from 'devextreme-angular';
import { Observable, Subscription } from 'rxjs';
import { AppComponentBase } from '../../../shared/app-component-base';
import { PlannedEvent } from '../../models/event.model';
import { PlanGridOperationHelper } from '../../models/plan-grid-operation.model';
import { ContainerSelect } from './../../models/container.viewmodel';
import { PlanContainerGrid } from './../../models/plan-container-grid.model';
import { CalendarFacade } from './../../store/facade/calendar.facade';

@Component({
  selector: 'app-calendar-daily',
  templateUrl: './calendar-daily.component.html',
  styleUrls: ['./calendar-daily.component.css']
})
export class CalendarDailyComponent extends AppComponentBase implements OnInit, OnDestroy {
  containers$: Observable<ContainerSelect[]>;
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
  // @Input() preplanTasks: TaskCommon[] = [];
  // @Output() removePreplanTask = new EventEmitter<number>();
  // @Output() addPreplanTask = new EventEmitter<TaskCommon>();
  @Input() autoReload = false;
  @Input() editable = true;
  @Input() height = '700px';
  intervalId;
  cellDuration = 60;
  groupTooltipsState = {};

  // prioritiesData: Container[] = [];
  @ViewChild(DxSchedulerComponent, {static: false}) scheduler: DxSchedulerComponent;
  @ViewChild('calendar', {static: false}) schedulerRef: ElementRef;
  @HostListener('window:resize') onResize() {
    this.scheduler.instance.repaint();
  }

  constructor(private calendarFacade: CalendarFacade) {
    super();
    this.onAppointmentRemove = this.onAppointmentRemove.bind(this);
    this.onAppointmentAdd = this.onAppointmentAdd.bind(this);
    this.onCalendarAdd = this.onCalendarAdd.bind(this);
    this.onCalendarRemove = this.onCalendarRemove.bind(this);
  }

  printScreen() {
  }

  ngOnInit() {
    this.currentDate$ = this.calendarFacade.currentDate$;
    this.containerTooltipsSubscription = this.calendarFacade.containerTooltips$.subscribe(t =>
      this.containerTooltips = t);
    // this.selectedDeparment$ = this.store.pipe(select(FilterSelectors.selectedDepartment));
    this.containers$ = this.calendarFacade.selectedContainers$;
    this.planTasksSubscription = this.calendarFacade.events$.subscribe(e => {
      console.log(e);
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
  }

  renderAppointment(e) {
    e.appointmentElement.style.backgroundColor = e.appointmentData.color;
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
    if (e.name === 'currentDate' || e.name === 'resources' && e.value.length > 0) {
      setTimeout(() =>
        this.reloadCalendar()
      );
    }

    if (e.name === 'currentDate') {
      this.calendarFacade.setPlanDate(e.value);
    }

  }

  reloadCalendar() {
    this.calendarFacade.loadPlanItems(
      this.containers.map(i => i.id),
      this.scheduler.instance.getStartViewDate(),
      this.scheduler.instance.getEndViewDate()
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
    console.log(e);
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
    $event.cancel = true;
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
}
