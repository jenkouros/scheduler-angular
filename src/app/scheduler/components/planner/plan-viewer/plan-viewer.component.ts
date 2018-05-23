import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
    DxSchedulerModule,
    DxSchedulerComponent,
    DxButtonModule,
    DxTemplateModule, DxLinearGaugeModule
} from 'devextreme-angular';
// import { Service, MovieData, WorkPlaceData, Data } from '../../../services/app.service';
import Query from 'devextreme/data/query';
import * as events from 'devextreme/events';
import { Container } from '../../../models/container.dto';
import { Store, ActionsSubject } from '@ngrx/store';
import * as fromStore from '../../../store';
import { PlanViewerItemComponent } from '../../../components/index';
import { PlannedEvent } from '../../../models/event.model';
import notify from 'devextreme/ui/notify';
import * as moment from 'moment';
import { ContainerSelect } from '../../../models/container.viewModel';
import { PreplanItem } from '../../../models/preplanitem.dto';

@Component({
    selector: 'app-plan-viewer',
    templateUrl: './plan-viewer.component.html',
    styleUrls: ['./plan-viewer.component.css']
})
export class PlanViewerComponent implements OnInit, AfterViewInit {
    draggablePreplanItem: PreplanItem | null;
    @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

    currentDate: Date = new Date();
    data: PlannedEvent[] = [];
    schedulerResources: any = [];
    groups: any[];
    groupsHasValue = false;
    currentView = 'timelineDay';
    cellDurations: any[] = [5, 10, 20, 30, 60];
    cellDuration = 60;
    selectedContainers: ContainerSelect[];
    selectedStartDate: Date;
    selectedEndDate: Date;
    visible = true;
    currentHour: number;

    constructor(private store: Store<fromStore.SchedulerState>) {
        this.currentHour = this.currentDate.getHours();
    }

    ngOnInit() {

        this.store.select(fromStore.getSelectedContainerSelectList).subscribe(
            (containers) => {
                this.selectedContainers = containers;
                this.schedulerResources = this.getResources(containers);
                this.visible = this.selectedContainers.length > 0;
                console.log(this.schedulerResources );
                if (containers.length > 0) {
                    this.visible = true;
                    // this.scheduler.instance.scrollToTime(this.selectedStartDate.getHours(), 0, this.selectedStartDate);
                    // this.schedulerResources = this.getResources(containers);
                    this.store.select(fromStore.getEventsForContainers(containers.map(c => c.id))).subscribe(data => {
                        this.data = data;
                       // this.scheduler.instance.repaint();
                        // this.scheduler.instance.scrollToTime(this.currentHour, 0);
                    }
                    );
                }

            });

            if (!this.groupsHasValue) {
                this.setGroupValue();
            }
            this.store.select(fromStore.getSelectedPrePlanItem).subscribe((item) => {
                this.draggablePreplanItem = item;
                this.ShowAvailableContainers(this.draggablePreplanItem, 'allowed');
            });

            this.store.select(fromStore.getSelectedPrePlanItemDraggedEnd).subscribe((item) => {
                this.removeMovebleCss(item);
            });
    }

    removeMovebleCss(s: boolean) {
        const plannedItemsEl = (<any>this.scheduler)
                                    .element.nativeElement.querySelectorAll('.dx-scheduler-appointment');
        for (let i = 0; i < plannedItemsEl.length; i++) {
            plannedItemsEl[i].classList.remove('dx-scheduler-appointment-move');
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
                text: container.code,
                id: container.id,
            });
        });
        return [
            {
                fieldExpr: 'containerId',
                dataSource: workplaceGroups
            }
        ];
    }

    setGroupValue() {
        if (this.data.length === 1) {
            this.groups = [];
        } else {
            this.groups = ['containerId'];
        }
    }


    optionChanged(e: any) {
        console.log(e.fullName);
/*
        // TODO: hack to refresh content and fire onContentReady event
        if (e.name === 'cellDuration') {
            this.store.select(fromStore.getSelectedContainerSelectList).subscribe(
                (containers) => {
                    this.schedulerResources = this.getResources(containers);
                });
        }
*/
        if (e.fullName === 'dataSource' || e.fullName === 'visible' ) {
            e.component.repaint();
            e.component.scrollToTime(this.currentHour, 0);
        }

        if (e.fullName === 'currentView' || e.fullName === 'currentDate'  || e.fullName === 'resources' || e.name === 'cellDuration') {

                  setTimeout(() => {
                    if (this.selectedStartDate !== e.component.getStartViewDate() ||
                        this.selectedEndDate !== e.component.getEndViewDate()) {
                    this.selectedStartDate = e.component.getStartViewDate();
                    this.selectedEndDate = e.component.getEndViewDate();

                    this.store.dispatch(
                        new fromStore.LoadEvents({
                            containerIds: this.selectedContainers.map(c => c.id),
                            dateFrom: this.selectedStartDate,
                            dateTo: this.selectedEndDate
                        })
                    );
                }
                }, 100);
        }
    }

    deleteAppointment(appointment: PlannedEvent) {
        this.scheduler.instance.hideAppointmentTooltip();
        this.scheduler.instance.deleteAppointment(appointment);
    }

    onAppointmentDeleting(e) {
        this.store.dispatch(new fromStore.DeleteEvent(e.appointmentData));
        this.currentHour = moment(e.appointmentData.startDate).toDate().getHours();
    }

    updateAppointment(appointment: PlannedEvent) {
        this.scheduler.instance.hideAppointmentTooltip();
        this.scheduler.instance.showAppointmentPopup(appointment, false);
    }

    onAppointmentUpdating(e) {
        // logika za kontrolo ali lahko izvedemo update
        const event: PlannedEvent = e.newData;

        if (!event.isPlanned) {
            console.log('onAppointmentUpdating - from droped', event);
            // insert to db  => get inserted event  => update scheduler
            const newEvent = PlannedEvent.createFromPreplanitem(
                event.idPrePlanItem, event.containerId, event.title, event.description, event.itemName,
                event.startDate, event.endDate, event.containers);
            this.store.dispatch(new fromStore.CreateEvent(newEvent));


           /* this.scheduler.instance.addAppointment(
                newEvent
            );*/
            // this.showToast('Added', event.description, 'success');
        } else {
            console.log('onAppointmentUpdating - moved', event);
            this.store.dispatch(new fromStore.UpdateEvent(event));
        }
        this.currentHour = moment(event.startDate).toDate().getHours();

    }

    onAppointmentAdding(e) {
        console.log('onAppointmentAdding', e);
    }
    // onAppointmentAdded(e) {
    //     this.store.dispatch(new fromStore.LoadPreplanItems());
    //     console.log('onAppointmentAdded', e);
    // }

    collectionHas(a, b) { // helper function (see below)
        for (let i = 0, len = a.length; i < len; i ++) {
            if (a[i] === b) { return true; }
        }
        return false;
    }
    findParentBySelector(elm, selector) {
        const all = document.querySelectorAll(selector);
        let cur = elm.parentNode;
        while (cur && !this.collectionHas(all, cur)) { // keep going up until you find a match
            cur = cur.parentNode; // go up
        }
        return cur; // will return null if not found
    }

    onContentReady(event) {

        /*


        */
        const plannedItemsEl = (<any>this.scheduler)
            .element.nativeElement.querySelectorAll('.dx-scheduler-scrollable-appointments');
        for (let i = 0; i < plannedItemsEl.length; i++) {

            events.off(plannedItemsEl[i], 'dragover');
            events.off(plannedItemsEl[i], 'dragend');
            events.on(plannedItemsEl[i], 'dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const f = this.findParentBySelector(e.target, '.dx-scheduler-appointment');

                if (f) {
                    f.classList.add('dx-scheduler-appointment-move');
                }
            });
        }
        const elements = (<any>this.scheduler).element.nativeElement.querySelectorAll('.dx-scheduler-date-table-cell');
        for (let i = 0; i < elements.length; i++) {

            events.off(elements[i], 'drop');
            events.off(elements[i], 'dragover');
            events.off(elements[i], 'dragleave');

            events.on(elements[i], 'dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.target.classList.add('dx-scheduler-date-table-droppable-cell');

            });

            events.on(elements[i], 'dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.target.classList.remove('dx-scheduler-date-table-droppable-cell');
            });

            events.on(elements[i], 'drop', (e) => {
                e.preventDefault();
                e.stopPropagation();


                if (e.type === 'drop') {
                    const el = e.target;
                    if (el.classList.contains('dx-scheduler-date-table-cell')) {

                        if (el.classList.contains('dx-scheduler-date-table-droppable-cell')) {
                             el.classList.remove('dx-scheduler-date-table-droppable-cell');
                        }

                        const cellData = (<any>this.scheduler.instance).getWorkSpace().getCellData([el]);
                        if (cellData.groups === undefined) {
                            return false;
                        }
                        const draggedData = JSON.parse(e.dataTransfer.getData('prePlanItem'));

                        if (draggedData !== undefined) {
                            const selectedContainer = draggedData.containers.find(item =>
                                cellData.groups.containerId === item.container.id);

                            if (selectedContainer === undefined) {
                                this.showToast('Info', 'Na delovno mesto ni možno planirati operacije!', 'info');
                                return false;
                            }
                            const duration = 60 * (selectedContainer.preparationNormative + selectedContainer.executionNormative);
                            const plannedEvent = PlannedEvent.createFromPreplanitem(
                                draggedData.id, cellData.groups.containerId, draggedData.code,
                                draggedData.description, draggedData.subItem.name,
                                cellData.startDate, moment(cellData.startDate).add(duration, 'minutes').toDate(),
                                draggedData.containers, false);
                            this.scheduler.instance.showAppointmentPopup(plannedEvent, false);
                        }
                    }
                }
            });
        }
    }

  ShowAvailableContainers(item: PreplanItem | null, className: string) {
        const elements = (<any>this.scheduler).element.nativeElement.querySelectorAll('th.dx-scheduler-group-header');

        for (let i = 0; i < elements.length; i++) {
            const div  = elements[i].querySelector('.dx-scheduler-group-header-content > div');
            if (item !== null) {
                if (item.containers.find(c => c.container.code === div.innerHTML)) {
                    elements[i].classList.add(className);
                }
            } else {
                elements[i].classList.remove(className);
            }
        }
    }

    onAppointmentFormCreated(data) {
        const that = this,
            form = data.form;
        console.log(data);
        const containers = data.appointmentData.containers;
        let selectedContainer = containers.find(item => data.appointmentData.containerId === item.container.id);

        let startDate = data.appointmentData.startDate,
            description = data.appointmentData.description,
            duration = 60 * (selectedContainer.preparationNormative + selectedContainer.executionNormative);

        form.option('items', [{
            label: {
                text: 'Operacija'
            },
            dataField: 'subItemName',
            editorType: 'dxTextBox',
            editorOptions: {
                readOnly: true,
                onValueChanged: function (args) {
                    description = args.value;
                    form.getEditor('subItemName')
                        .option('value', description);
                }
            }
        }, {
            label: {
                text: 'Začetni datum'
            },
            dataField: 'startDate',
            editorType: 'dxDateBox',
            editorOptions: {
                validationRules:
                    [{
                        type: 'required',
                        message: 'Start Date is required'
                    }],
                type: 'datetime',
                onValueChanged: function (args) {
                    startDate = new Date(args.value);
                    form.getEditor('endDate')
                        .option('value', moment(startDate.getTime()).add(duration, 'm'));
                }
            }
        }, {
            label: {
                text: 'Končni datum'
            },
            dataField: 'endDate',
            editorType: 'dxDateBox',
            editorOptions: {
                type: 'datetime'
            }
        }, {
            label: {
                text: 'Delovno mesto'
            },
            editorType: 'dxSelectBox',
            dataField: 'containerId',
            editorOptions: {
                items: containers,
                displayExpr: 'container.code',
                valueExpr: 'container.id',
                onValueChanged: function (args) {
                    selectedContainer = containers.find(item => args.value === item.container.id);
                    duration = 60 * (selectedContainer.preparationNormative + selectedContainer.executionNormative);
                    form.getEditor('endDate')
                        .option('value', moment(startDate.getTime()).add(duration, 'm'));
                }.bind(this)
            }
        }]);
    }
    onCellClick(e) {
        e.cancel = true;
    }
    showToast(event, value, type) {
        notify(event + ' \'' + value + '\'', type, 1500);
    }

    removeBlankSpace() {
        this.store.dispatch(new fromStore.RemoveContainersBlankSpace(
            { containerIds: this.selectedContainers.map(c => c.id) }
        ));
    }

    toggleLock(plannedEvent: PlannedEvent) {
        this.scheduler.instance.hideAppointmentTooltip();
        this.store.dispatch(new fromStore.ToggleEventLock(plannedEvent));
    }
}

