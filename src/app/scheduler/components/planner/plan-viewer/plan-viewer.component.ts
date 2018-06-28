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
import { PlanViewerItemComponent, SubItemComponent } from '../../../components/index';
import {
  PlannedEvent,
  PlanItemsLoadRequest,
  PlannedEventMove,
  PlanItemMoveStatusEnum
} from '../../../models/event.model';
import notify from 'devextreme/ui/notify';
import * as moment from 'moment';
import { ContainerSelect } from '../../../models/container.viewModel';
import { PreplanItem } from '../../../models/preplanitem.dto';
import { ToggleMassLockPopup } from '../../../store';
import * as fromSchedulerModel from '../../../models/planner.model';
import Scrollable from 'devextreme/ui/scroll_view/ui.scrollable';

import { faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { PlanViewerFormHelper } from './plan-viewer.form.helper';
import { SubItemContainer } from '../../../models/subitem.dto';

@Component({
  selector: 'app-plan-viewer',
  templateUrl: './plan-viewer.component.html',
  styleUrls: ['./plan-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanViewerComponent implements AfterViewInit, OnChanges {
  @Input() selectedPreplanItem: PreplanItem | null = null;
  @Input() selectedContainers: ContainerSelect[] = [];
  @Input() planItems: PlannedEvent[] = [];
  @Input() preplanItemDragEnd: boolean;
  @Input() timeUpdateSuggestion: {[idPrePlanItem: number]: PlannedEventMove} | null;

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

  currentDate: Date = new Date();
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

  offset: { top: number; left: number } = { top: 0, left: 0 };

  ngOnChanges(changes): void {
    if (changes.planItems) {
      this.planItems = [...changes.planItems.currentValue];
    }
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
        this.onClearTimeSuggestion();
        $event.component.showAppointmentTooltip($event.appointmentData, $event.appointmentElement);
    }, 500);
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

    const preparationDurationInMinutes = moment(new Date(event.timeStartExecution)).diff(
      moment(new Date(event.timeStartPreparation)), 'm');

    event.timeStartPreparation = event.startDate;
    event.timeEndExecution = event.endDate;
    event.timeStartExecution = moment(event.startDate).add(preparationDurationInMinutes, 'm').toDate();

    this.planItemUpdate.emit(event);
  }

  onContentReady(event) {
     // ref to scrollable
    const scrollable = Scrollable.getInstance(
       (<any>this.scheduler).instance.element().querySelector('.dx-scrollable')
     );
     scrollable.on('scroll', e => {
       this.offset = { top: e.scrollOffset.top || 0, left: e.scrollOffset.left || 0  };
       // console.log(this.offset);
     });

    const plannedItemsEl = (<any>this
      .scheduler).element.nativeElement.querySelectorAll(
      '.dx-scheduler-appointment'
    );
      for (let i = 0; i < plannedItemsEl.length; i++) {
      events.off(plannedItemsEl[i], 'dxdragenter');
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
      events.on(plannedItemsEl[i], 'dxdragend', (e) => {
        this.removeAppointmentCss(
          e.target,
          'dx-scheduler-appointment-move'
        );
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
    const elements = (<any>this
      .scheduler).element.nativeElement.querySelectorAll(
      '.dx-scheduler-date-table-cell'
    );
    for (let i = 0; i < elements.length; i++) {
      events.off(elements[i], 'drop');
      events.off(elements[i], 'dragover');
      events.off(elements[i], 'dragleave');

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

            const containers: SubItemContainer[] = draggedData.containers.map(c =>
              Object.assign(new SubItemContainer(), c,
                { container: Object.assign(new Container(), c.container)}
              )
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

              const duration =
                (selectedContainer.preparationNormative +
                  selectedContainer.executionNormative * draggedData.quantity );
              const plannedEvent = PlannedEvent.createFromPreplanitem(
                draggedData.id,
                cellData.groups.containerId,
                draggedData.subItem.code,
                '',
                draggedData.subItem.name,
                new Date(cellData.startDate),
                moment(new Date(cellData.startDate))
                  .add(selectedContainer.preparationNormative, 'm')
                  .toDate(),
                moment(new Date(cellData.startDate))
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
    }
    if (e.fullName === fromSchedulerModel.OPTIONCHANGED_DATASOURCE
    ) {
      // e.component.repaint();
      setTimeout(() => {
        Scrollable.getInstance(
        e.component.element().querySelector('.dx-scrollable')
      ).scrollTo(this.offset);
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
    this.scheduler.instance.showAppointmentPopup(appointment, false);
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
    this.scheduler.instance.hideAppointmentTooltip();
  }

  onClearTimeSuggestion() {
    this.clearTimeSuggestion.emit();
  }

  private showToast(event, value, type) {
    notify(event + ' \'' + value + '\'', type, 1500);
  }

  private showAvailableContainers(item: PreplanItem | null, className: string) {
    const elements = (<any>this
      .scheduler).element.nativeElement.querySelectorAll(
      'th.dx-scheduler-group-header'
    );

    for (let i = 0; i < elements.length; i++) {
      const div = elements[i].querySelector(
        '.dx-scheduler-group-header-content > div'
      );
      if (item !== null) {
        if (item.containers.find(c => c.container.displayExpression === div.innerHTML)) {
          elements[i].classList.add(className);
        }
      } else {
        elements[i].classList.remove(className);
      }
    }
  }

  private removeAppointmentCss(remove: boolean, className: string) {
    const plannedItemsEl = (<any>this
      .scheduler).element.nativeElement.querySelectorAll(
      '.dx-scheduler-appointment'
    );
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

    }
  }

  private isResourceUpdated(model: fromSchedulerModel.OptionChangedModel) {
    if (model.fullName === fromSchedulerModel.OPTIONCHANGED_RESOURCES) {
      const resourceChangedModel = (<fromSchedulerModel.ResourceOptionChangedModel[]>model.value).filter(
        i => i.fieldExpr === fromSchedulerModel.RESOURCES_FIELD
      );
      const resourcePreviousValueModel = (<fromSchedulerModel.ResourceOptionChangedModel[]>model.previousValue).filter(
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
    Scrollable.getInstance(this.scheduler.instance.element().querySelector('.dx-scrollable')).scrollTo(this.offset);
    this.isScrollInProgress = false;
  }

  private getScrollPosition() {
    const offset = Scrollable.getInstance(this.scheduler.instance.element().querySelector('.dx-scrollable')).scrollOffset();
    if (this.isScrollInProgress || !offset.left || !offset.top || offset.left <= -0 && offset.top <= -0) {
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

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }


      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }
}
