import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  DxSchedulerModule,
  DxSchedulerComponent,
  DxButtonModule,
  DxTemplateModule,
  DxLinearGaugeModule
} from 'devextreme-angular';
// import { Service, MovieData, WorkPlaceData, Data } from '../../../services/app.service';
import Query from 'devextreme/data/query';
import * as events from 'devextreme/events';
import { Container } from '../../../models/container.dto';
import { Store, ActionsSubject } from '@ngrx/store';
import * as fromStore from '../../../store';
import {
  PlanViewerItemComponent,
  SubItemComponent
} from '../../../components/index';
import {
  PlannedEvent,
  PlanItemsLoadRequest,
  PlannedEventMove,
  PlanItemMoveStatusEnum,
  PlannedEventNotWorkingHoursMove,
  PlanItemStatusEnum,
  PlanItemProgressEnum
} from '../../../models/event.model';
import notify from 'devextreme/ui/notify';
import * as moment from 'moment';
import { ContainerSelect } from '../../../models/container.viewModel';
import { PreplanItem } from '../../../models/preplanitem.dto';
import { ToggleMassLockPopup } from '../../../store';
import * as fromSchedulerModel from '../../../models/planner.model';
import Scrollable from 'devextreme/ui/scroll_view/ui.scrollable';

import {
  faLock,
  faExclamationTriangle,
  faExclamationCircle,
  faSync,
  faAlignCenter,
  faTh
} from '@fortawesome/free-solid-svg-icons';
import { PlanViewerFormHelper } from './plan-viewer.form.helper';
import { SubItemContainer } from '../../../models/subitem.dto';
import { TimeHelper } from '../../../helpers/time.helper';
import { PlanSchedule } from '../../../models/planschedule.dto';
import { ColorHelper } from '../../../helpers/color.helper';

@Component({
  selector: 'app-plan-viewer',
  templateUrl: './plan-viewer.component.html',
  styleUrls: ['./plan-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanViewerComponent implements AfterViewInit, OnChanges {
  @Input() selectedPreplanItem: PreplanItem | null = null;
  @Input() selectedContainers: ContainerSelect[] = [];
  @Input()
  planItemGetReponse: {
    planItems: PlannedEvent[];
    notWorkingHoursEvents: { [idContainer: number]: PlanSchedule[] };
  } = {
    planItems: [],
    notWorkingHoursEvents: {}
  };
  // @Input() preplanItemDragEnd: boolean;
  @Input()
  timeUpdateSuggestion: { [idPrePlanItem: number]: PlannedEventMove } | null;
  @Input()
  notWorkingHoursUpdateSuggestion: PlannedEventNotWorkingHoursMove | null;
  @Input() currentDate: Date = new Date();
  @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;
  @Output() planItemLoad = new EventEmitter<PlanItemsLoadRequest>();
  @Output() planItemCreate = new EventEmitter<PlannedEvent>();
  @Output() planItemUpdate = new EventEmitter<PlannedEvent>();
  @Output() planItemDelete = new EventEmitter<PlannedEvent>();
  @Output() removeBlankSpace = new EventEmitter<number[]>();
  @Output() toggleLock = new EventEmitter<PlannedEvent>();
  @Output() showMassLockPopup = new EventEmitter<number[]>();
  @Output() resolveSequence = new EventEmitter<PlannedEventMove[]>();
  @Output() getResolveSequenceSuggestion = new EventEmitter<number>();
  @Output() clearTimeSuggestion = new EventEmitter();

  @Output() resolveNotWorkingHours = new EventEmitter<PlannedEventMove>();
  @Output() getResolveNotWorkingHoursSuggestion = new EventEmitter<number>();
  @Output() clearNotWorkingHoursSuggestion = new EventEmitter();

  @Output()
  loadTimeRealizationSuggestion = new EventEmitter<PlanItemsLoadRequest>();
  @Output() planItemReload = new EventEmitter<number[]>();

  // notWorkingHours: { startDate: Date, endDate: Date }[] = [
  //   { startDate: new Date(2018, 6, 7, 0, 0), endDate: new Date(2018, 6, 7, 23, 59) },
  //   { startDate: new Date(2018, 6, 8, 14, 30), endDate: new Date(2018, 6, 8, 15, 15) }
  // ];

  notWorkingHoursResolveMode = 'movePlanItem';
  schedulerResources: any = [];
  groups = [fromSchedulerModel.RESOURCES_FIELD];
  groupsHasValue = false;
  currentView = 'timelineDay';
  cellDurations: any[] = [5, 10, 20, 30, 60, 120, 240, 480];
  cellDuration = 60;

  selectedContainerIds: number[];
  selectedStartDate: Date;
  selectedEndDate: Date;
  visible = false;
  isScrollInProgress = false;

  planItemEditMode = false;
  planItemEditing: PlannedEvent | null = null;

  faLock = faLock;
  faWarning = faExclamationTriangle;
  faExclamation = faExclamationCircle;
  faRefresh = faSync;
  faAlign = faAlignCenter;
  faGroup = faTh;

  offset: { top: number; left: number } = { top: 0, left: 0 };

  ngOnChanges(changes): void {
    // if (changes.planItems) {
    //   this.planItems = [...changes.planItems.currentValue];
    // }
    if (changes.selectedPreplanItem) {
      this.showAvailableContainers(this.selectedPreplanItem, 'allowed');
    }
    if (changes.selectedContainers) {
      this.selectedContainerIds = this.selectedContainers.map(i => i.id);
      this.visible = this.selectedContainers.length > 0;
      this.schedulerResources = this.getResources(this.selectedContainers);
    }
  }

  ngAfterViewInit() {
    this.selectedStartDate = this.scheduler.instance.getStartViewDate();
    this.selectedEndDate = this.scheduler.instance.getEndViewDate();
  }

  getResources(containers: any) {
    const workplaceGroups: any[] = [];

    // working places (group)
    containers.forEach((container: Container) => {
      workplaceGroups.push({
        text: `${container.code} ${container.name}`,
        id: container.id
      });
    });
    return [
      {
        fieldExpr: fromSchedulerModel.RESOURCES_FIELD,
        dataSource: workplaceGroups
      }
    ];
  }

  isViewHorizontal(viewName: string) {
    if (
      viewName.toLowerCase().includes('timeline') ||
      viewName.toLowerCase() === 'agenda'
    ) {
      return false;
    }
    return true;
  }

  markNotWorkingHours(cellData) {
    function getTransparentColor() {
      return 'transparent';
    }
    function getNoWorkingColor() {
      return 'rgb(218, 218, 218)';
    }

    const styleObject = {};
    if (
      !cellData.groups ||
      !this.planItemGetReponse.notWorkingHoursEvents[
        cellData.groups.containerId
      ]
    ) {
      return styleObject;
    }
    const collapsingObject = TimeHelper.getCollapsingMarginProcent(
      this.planItemGetReponse.notWorkingHoursEvents[
        cellData.groups.containerId
      ],
      cellData.startDate,
      cellData.endDate
    );
    if (!collapsingObject.isCollapsing || collapsingObject.data.length === 0) {
      return styleObject;
    }
    // styleObject['left-margin'] = `${collapsingObject.startMarginProcent}%`;
    // styleObject['width'] = `${collapsingObject.durationMarginProcent}%`;
    styleObject['background'] = ColorHelper.getGradient(
      collapsingObject.data,
      this.isViewHorizontal((<any>this.scheduler.instance)._currentView),
      getNoWorkingColor(),
      getTransparentColor()
    );
    styleObject['height'] = '100%';
    styleObject['margin'] = '-1px';
    // styleObject['background-color'] = 'rgba(86, 202, 133, 0.1)';
    styleObject['background-position'] = 'center center';
    styleObject['background-repeat'] = 'no-repeat';
    return styleObject;
  }

  /** DEVEXTREME EVENT HANDLERS */
  onAppointmentDeleting(e) {
    e.cancel = true;
    this.planItemDelete.emit(e.appointmentData);
  }

  onAppointmentClick($event) {
    $event.cancel = true;
    if ($event.component.__tooltipTimeout) {
      clearTimeout($event.component.__tooltipTimeout);
    }
    $event.component.__tooltipTimeout = setTimeout(() => {
      $event.component.showAppointmentTooltip(
        $event.appointmentData,
        $event.appointmentElement
      );
    }, 500);
    this.onClearTimeSuggestion();
    this.onClearNotWorkingHoursSuggestion();
  }

  onAppointmentDblClick($event) {
    $event.cancel = true;
    if ($event.component.__tooltipTimeout) {
      clearTimeout($event.component.__tooltipTimeout);
    }
    this.planItemEditing = $event.appointmentData;
    this.planItemEditMode = true;
  }

  onAppointmentUpdating(e) {
    e.cancel = true;
    const event: PlannedEvent = e.newData;

    const preparationDurationInMinutes = moment(
      new Date(event.timeStartExecution)
    ).diff(moment(new Date(event.timeStartPreparation)), 'm');

    const startDate = new Date(event.startDate);
    event.timeStartPreparation = startDate;
    event.timeEndExecution = new Date(event.endDate);
    event.timeStartExecution = moment(startDate)
      .add(preparationDurationInMinutes, 'm')
      .toDate();

    this.planItemUpdate.emit(event);
  }

  onAppointmentRedered(e) {
    const planItem = <PlannedEvent>e.appointmentData;

    if (planItem.idPlanItemStatus < PlanItemStatusEnum.Finished) {
      switch (planItem.progressEnum) {
        case PlanItemProgressEnum.Late:
          e.appointmentElement.classList.add('planitem-late');
          break;
        case PlanItemProgressEnum.NotFinished:
          e.appointmentElement.classList.add('planitem-notfinished');
          break;
      }
    }

    // quantity manufactured background
    if (planItem.idPlanItemStatus === PlanItemStatusEnum.Running) {
      e.appointmentElement.style.background = ColorHelper.getGradient(
        [
          {
            startMarginProcent: 0,
            durationMarginProcent:
              (planItem.manufacturedQuantity * 100) / planItem.quantity
          }
        ],
        false,
        planItem.color,
        ColorHelper.shadeColor(planItem.color, 10)
      );
      e.appointmentElement.style.backgroundPosition = 'center center';
      e.appointmentElement.style.backgroundRepeat = 'no-repeat';
    } else {
      e.appointmentElement.style.backgroundColor = planItem.color;
    }
  }

  onContentReady(event) {
    if (this.currentView === 'agenda') {
      (<any>this.scheduler).instance.getWorkSpace().option('rowHeight', 75);
    }

    // ref to scrollable
    const scrollable = Scrollable.getInstance(
      (<any>this.scheduler).instance.element().querySelector('.dx-scrollable')
    );
    scrollable.on('scroll', e => {
      this.offset = {
        top: e.scrollOffset.top || 0,
        left: e.scrollOffset.left || 0
      };
      // console.log(this.offset);
    });

    const plannedItemsEl = (<any>(
      this.scheduler
    )).element.nativeElement.querySelectorAll('.dx-scheduler-appointment');
    for (let i = 0; i < plannedItemsEl.length; i++) {
      events.off(plannedItemsEl[i], 'dxdragenter', e => {
        this.removeAppointmentCss(e.target, 'dx-scheduler-appointment-move');
      });
      /*
      events.off(plannedItemsEl[i], 'dxdragleave');
      events.on(plannedItemsEl[i], 'dxdragleave', (e) => {
        setTimeout(() => {
          this.removeAppointmentCss(
                    e.target,
                    'dx-scheduler-appointment-move'
                  );
        });
      });
      */
      events.on(plannedItemsEl[i], 'dxdragend', e => {
        this.removeAppointmentCss(e.target, 'dx-scheduler-appointment-move');
      });

      events.on(plannedItemsEl[i], 'dxdragenter', e => {
        e.target.classList.add('dx-scheduler-appointment-move');

        /*
        const f = this.findParentBySelector(
          e.target,
          '.dx-scheduler-appointment'
        );

        if (f) {
          f.classList.add('dx-scheduler-appointment-move');
        }
        */
      });
    }
    const elements = (<any>(
      this.scheduler
    )).element.nativeElement.querySelectorAll('.dx-scheduler-date-table-cell');
    for (let i = 0; i < elements.length; i++) {
      // events.off(elements[i], 'drop');
      // events.off(elements[i], 'dragover');
      // events.off(elements[i], 'dragleave');

      events.on(elements[i], 'dragover', e => {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.add('dx-scheduler-date-table-droppable-cell');
      });

      events.on(elements[i], 'dragleave', e => {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.remove('dx-scheduler-date-table-droppable-cell');
      });

      events.on(elements[i], 'drop', e => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === 'drop') {
          const el = e.target;
          if (el.classList.contains('dx-scheduler-date-table-cell')) {
            if (
              el.classList.contains('dx-scheduler-date-table-droppable-cell')
            ) {
              el.classList.remove('dx-scheduler-date-table-droppable-cell');
            }

            const cellData = (<any>this.scheduler.instance)
              .getWorkSpace()
              .getCellData([el]);
            if (cellData.groups === undefined) {
              return false;
            }

            const draggedData: PreplanItem = JSON.parse(
              e.dataTransfer.getData('prePlanItem')
            );

            const containers: SubItemContainer[] = draggedData.containers.map(
              c =>
                Object.assign(new SubItemContainer(), c, {
                  container: Object.assign(new Container(), c.container)
                })
            );

            const preplanItem: PreplanItem = {
              ...new PreplanItem(),
              ...draggedData,
              containers: containers
            };

            if (draggedData !== undefined) {
              const selectedContainer = draggedData.containers.find(
                item => cellData.groups.containerId === item.container.id
              );

              if (selectedContainer === undefined) {
                this.showToast(
                  'Info',
                  'Na delovno mesto ni možno planirati operacije!',
                  'info'
                );
                return false;
              }
              const calculatedStartTime = this.getCalculatedStartTimeInCell(
                cellData.groups.containerId,
                cellData.startDate,
                cellData.endDate
              );
              console.log(calculatedStartTime);
              console.log(cellData.startDate);
              const duration =
                selectedContainer.preparationNormative +
                selectedContainer.executionNormative * draggedData.quantity;
              const plannedEvent = PlannedEvent.createFromPreplanitem(
                draggedData.id,
                cellData.groups.containerId,
                draggedData.subItem.code,
                '',
                draggedData.subItem.name,
                calculatedStartTime,
                moment(calculatedStartTime)
                  .add(selectedContainer.preparationNormative, 'm')
                  .toDate(),
                moment(calculatedStartTime)
                  .add(duration, 'm')
                  .toDate(),
                containers,
                draggedData.quantity,
                draggedData.unit.code,
                false
              );
              this.planItemEditing = plannedEvent;
              this.planItemEditMode = true;
              // this.scheduler.instance.showAppointmentPopup(plannedEvent, false);
            }
          }
        }
      });
    }
  }

  optionChanged(e: fromSchedulerModel.OptionChangedModel) {
    // console.log(e.fullName);
    this.offset = this.getScrollPosition();
    // console.log(this.offset);
    if (e.fullName === fromSchedulerModel.OPTIONCHANGED_VISIBLE) {
      // this.scrollScheduler();
      e.component.repaint();
      Scrollable.getInstance(
        e.component.element().querySelector('.dx-scrollable')
      ).scrollTo(this.offset);
      console.log(this.offset);
    }
    if (e.fullName === fromSchedulerModel.OPTIONCHANGED_DATASOURCE) {
      // e.component.repaint();
      setTimeout(() => {
        Scrollable.getInstance(
          e.component.element().querySelector('.dx-scrollable')
        ).scrollTo(this.offset);
        console.log(this.offset);
      });
    }
    if (
      e.fullName === fromSchedulerModel.OPTIONCHANGED_CURRENTVIEW ||
      e.fullName === fromSchedulerModel.OPTIONCHANGED_CURRENTDATE ||
      e.fullName === fromSchedulerModel.OPTIONCHANGED_RESOURCES ||
      e.fullName === fromSchedulerModel.OPTIONCHANGED_CELLDURATION
    ) {
      if (e.fullName === fromSchedulerModel.OPTIONCHANGED_CELLDURATION) {
        e.component.repaint();
      }
      // this.scrollScheduler();
      // e.component.repaint();

      setTimeout(() => {
        Scrollable.getInstance(
          e.component.element().querySelector('.dx-scrollable')
        ).scrollTo(this.offset);
      });

      const resourceUpdated = this.isResourceUpdated(e);
      const timeBoundsChanged =
        e.fullName === fromSchedulerModel.OPTIONCHANGED_CURRENTVIEW ||
        e.fullName === fromSchedulerModel.OPTIONCHANGED_CURRENTDATE;
      // this.selectedStartDate.getTime() !== e.component.getStartViewDate().getTime() ||
      // this.selectedEndDate.getTime() !== e.component.getEndViewDate().getTime();
      if (resourceUpdated || timeBoundsChanged) {
        // console.log('change');
        setTimeout(() => {
          this.selectedStartDate = e.component.getStartViewDate();
          this.selectedEndDate = e.component.getEndViewDate();
          this.planItemLoad.emit({
            containerIds: this.selectedContainerIds,
            fromDate: this.selectedStartDate,
            toDate: this.selectedEndDate
          });
        });
      }
    }
  }
  /** END DEVEXTREME EVENT HANDLERS */

  onPlanItemReload() {
    this.planItemReload.emit(this.selectedContainerIds);
  }

  deleteAppointment(appointment: PlannedEvent) {
    this.scheduler.instance.hideAppointmentTooltip();
    this.scheduler.instance.deleteAppointment(appointment);
  }

  updateAppointment(appointment: PlannedEvent) {
    this.planItemUpdate.emit(appointment);
  }
  createAppointment(appointment: PlannedEvent) {
    this.planItemCreate.emit(appointment);
  }

  showUpdateAppointmentPopup(appointment: PlannedEvent) {
    this.scheduler.instance.hideAppointmentTooltip();
    this.planItemEditing = appointment;
    this.planItemEditMode = true;
    // this.scheduler.instance.showAppointmentPopup(appointment, false);
  }

  onRemoveBlankSpace() {
    this.removeBlankSpace.emit(this.selectedContainerIds);
  }

  onToggleLock(plannedEvent: PlannedEvent) {
    this.scheduler.instance.hideAppointmentTooltip();
    this.toggleLock.emit(plannedEvent);
  }

  onShowMassLockPopup() {
    this.showMassLockPopup.emit(this.selectedContainerIds);
  }

  onGetResolveSequenceSuggestion(idItemBatch: number) {
    this.getResolveSequenceSuggestion.emit(idItemBatch);
  }

  onResolveSequence() {
    if (this.timeUpdateSuggestion === null) {
      this.onClearTimeSuggestion();
      return;
    }
    const request: PlannedEventMove[] = [];
    for (const key in this.timeUpdateSuggestion) {
      if (this.timeUpdateSuggestion.hasOwnProperty(key)) {
        request.push(this.timeUpdateSuggestion[key]);
      }
    }
    this.resolveSequence.emit(request);
    this.onClearTimeSuggestion();
    this.scheduler.instance.hideAppointmentTooltip();
  }

  onClearTimeSuggestion() {
    this.clearTimeSuggestion.emit();
  }

  onGetResolveNotWorkingHoursSuggestion(idPlanItem: number) {
    this.getResolveNotWorkingHoursSuggestion.emit(idPlanItem);
  }

  onResolveNotWorkingHours() {
    if (!this.notWorkingHoursUpdateSuggestion) {
      return;
    }
    const plannedEventMove = this.notWorkingHoursUpdateSuggestion[
      this.notWorkingHoursResolveMode
    ];
    if (!plannedEventMove) {
      return;
    }
    this.resolveNotWorkingHours.emit(plannedEventMove);
    this.onClearNotWorkingHoursSuggestion();
    this.scheduler.instance.hideAppointmentTooltip();
  }

  onClearNotWorkingHoursSuggestion() {
    this.clearNotWorkingHoursSuggestion.emit();
  }

  onLoadTimeRealizationSuggestion() {
    this.loadTimeRealizationSuggestion.emit({
      containerIds: this.selectedContainerIds,
      fromDate: this.selectedStartDate,
      toDate: this.selectedEndDate
    });
  }

  private getCalculatedStartTimeInCell(
    idContainer: number,
    cellStartTime: Date,
    cellEndTime: Date
  ) {
    let calculatedStartDate = cellStartTime;
    if (!this.planItemGetReponse || !this.planItemGetReponse.planItems) {
      return calculatedStartDate;
    }

    for (let i = 0; i < this.planItemGetReponse.planItems.length; i++) {
      const planItem = this.planItemGetReponse.planItems[i];
      const planItemStartTime = new Date(planItem.timeStartPreparation);
      const planItemEndTime = new Date(planItem.timeEndExecution);

      if (
        planItem.containerId === idContainer &&
        cellEndTime > planItemStartTime &&
        cellStartTime < planItemEndTime &&
        calculatedStartDate < planItemEndTime
      ) {
        calculatedStartDate = planItemEndTime;
      }
    }
    return calculatedStartDate;
  }

  private showToast(event, value, type) {
    notify(event + ' \'' + value + '\'', type, 1500);
  }

  private showAvailableContainers(item: PreplanItem | null, className: string) {
    const elements = (<any>(
      this.scheduler
    )).element.nativeElement.querySelectorAll('th.dx-scheduler-group-header');

    for (let i = 0; i < elements.length; i++) {
      const div = elements[i].querySelector(
        '.dx-scheduler-group-header-content > div'
      );
      if (item !== null) {
        if (
          item.containers.find(
            c => c.container.displayExpression === div.innerHTML
          )
        ) {
          elements[i].classList.add(className);
        }
      } else {
        elements[i].classList.remove(className);
      }
    }
  }

  private removeAppointmentCss(remove: boolean, className: string) {
    const plannedItemsEl = (<any>(
      this.scheduler
    )).element.nativeElement.querySelectorAll('.dx-scheduler-appointment');
    for (let i = 0; i < plannedItemsEl.length; i++) {
      plannedItemsEl[i].classList.remove(className);
    }
  }

  private getPlanItemClass(planItemMoveStatus: PlanItemMoveStatusEnum) {
    switch (planItemMoveStatus) {
      case PlanItemMoveStatusEnum.Unchanged: {
        return 'alert-primary';
      }
      case PlanItemMoveStatusEnum.Added: {
        return 'alert-success';
      }
      case PlanItemMoveStatusEnum.Moved: {
        return 'alert-warning';
      }
      case PlanItemMoveStatusEnum.Removed: {
        return 'alert-danger';
      }
      default:
        return 'alert-warning';
    }
  }

  private isResourceUpdated(model: fromSchedulerModel.OptionChangedModel) {
    if (model.fullName === fromSchedulerModel.OPTIONCHANGED_RESOURCES) {
      const resourceChangedModel = (<
        fromSchedulerModel.ResourceOptionChangedModel[]
      >model.value).filter(
        i => i.fieldExpr === fromSchedulerModel.RESOURCES_FIELD
      );
      const resourcePreviousValueModel = (<
        fromSchedulerModel.ResourceOptionChangedModel[]
      >model.previousValue).filter(
        i => i.fieldExpr === fromSchedulerModel.RESOURCES_FIELD
      );
      if (resourceChangedModel && resourceChangedModel.length === 1) {
        if (
          !resourcePreviousValueModel ||
          resourcePreviousValueModel.length !== 1
        ) {
          return false;
        }

        if (
          resourceChangedModel[0].dataSource.length >
          resourcePreviousValueModel[0].dataSource.length
        ) {
          return true;
        }

        for (let i = 0; i < resourceChangedModel[0].dataSource.length; i++) {
          if (
            !resourcePreviousValueModel[0].dataSource.find(
              previous =>
                previous.id === resourceChangedModel[0].dataSource[i].id
            )
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private scrollScheduler() {
    this.isScrollInProgress = true;
    this.scheduler.instance.repaint();
    // console.log(this.offset);
    Scrollable.getInstance(
      this.scheduler.instance.element().querySelector('.dx-scrollable')
    ).scrollTo(this.offset);
    this.isScrollInProgress = false;
  }

  private getScrollPosition() {
    const offset = Scrollable.getInstance(
      this.scheduler.instance.element().querySelector('.dx-scrollable')
    ).scrollOffset();
    if (
      this.isScrollInProgress ||
      !offset.left ||
      !offset.top ||
      (offset.left <= -0 && offset.top <= -0)
    ) {
      return this.offset;
    }
    return offset;
  }

  private getPosition(el) {
    let xPos = 0;
    let yPos = 0;
    console.log(el);
    while (el) {
      if (el.tagName === 'BODY') {
        // deal with browser quirks with body/window/document and page scroll
        const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        const yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += el.offsetLeft - xScroll + el.clientLeft;
        yPos += el.offsetTop - yScroll + el.clientTop;
      } else {
        // for all other non-BODY elements
        xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
        yPos += el.offsetTop - el.scrollTop + el.clientTop;
      }

      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }
}
