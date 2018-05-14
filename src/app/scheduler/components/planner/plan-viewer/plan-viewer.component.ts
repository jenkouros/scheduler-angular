import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
    DxSchedulerModule,
    DxSchedulerComponent,
    DxButtonModule,
    DxTemplateModule, DxLinearGaugeModule
} from 'devextreme-angular';
import { Service, MovieData, WorkPlaceData, Data } from '../../../services/app.service';
import Query from 'devextreme/data/query';
import * as events from 'devextreme/events';
import { Container } from '../../../models/container.dto';
import { Store } from '@ngrx/store';
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
    visible = false;
    constructor(private service: Service, private store: Store<fromStore.SchedulerState>) {
        this.store.select(fromStore.getSelectedContainerSelectList).subscribe(
            (containers) => {
                this.selectedContainers = containers;
                this.visible = this.selectedContainers.length > 0 ? true : false;
                if (containers.length > 0) {
                    this.schedulerResources = this.getResources(containers);
                    this.store.select(fromStore.getEventsForContainers(containers.map(c => c.id))).subscribe(items => {
                        this.data = items;
                    }
                    );
                } else {
                    this.schedulerResources = [];
                }

            });
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

        // TODO: hack to refresh content and fire onContentReady event
        if (e.name === 'cellDuration') {
            this.store.select(fromStore.getSelectedContainerSelectList).subscribe(
                (containers) => {
                    this.schedulerResources = this.getResources(containers);
                });
        }

        if ((e.fullName === 'currentView' || e.fullName === 'currentDate' || e.fullName === 'resources')) {

            if (this.selectedStartDate !== e.component.getStartViewDate() ||
                this.selectedEndDate !== e.component.getEndViewDate()) {
                setTimeout(() => {
                    this.selectedStartDate = e.component.getStartViewDate();
                    this.selectedEndDate = e.component.getEndViewDate();
                    this.store.dispatch(
                        new fromStore.LoadEvents({
                            containerIds: this.selectedContainers.map(c => c.id),
                            dateFrom: this.selectedStartDate,
                            dateTo: this.selectedEndDate
                        })
                    );
                }, 100);
            }
        }
    }

    onAppointmentDeleting(e) {
        this.store.dispatch(new fromStore.DeleteEvent(e.appointmentData));
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
            this.scheduler.instance.addAppointment(
                newEvent
            );
            // this.showToast('Added', event.description, 'success');
        } else {
            console.log('onAppointmentUpdating - moved', event);
            this.store.dispatch(new fromStore.UpdateEvent(event));
        }


    }

    onAppointmentAdding(e) {
        console.log('onAppointmentAdding', e);
    }
    // onAppointmentAdded(e) {
    //     this.store.dispatch(new fromStore.LoadPreplanItems());
    //     console.log('onAppointmentAdded', e);
    // }

    onContentReady(event) {
        const elements = (<any>this.scheduler).element.nativeElement.querySelectorAll('.dx-scheduler-date-table-cell');
        for (let i = 0; i < elements.length; i++) {

            events.off(elements[i], 'drop');
            events.off(elements[i], 'dragover');
            // console.log('onContentReady');
            /*
            events.off(elements[i], 'dxdrop');

            events.on(elements[i], 'dxdrop', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (e.type === 'dxdrop') {
                    const el  = e.target;
                    if (el.classList.contains('dx-scheduler-date-table-cell')) {
                        const cellData = (<any>this.scheduler.instance).getWorkSpace().getCellData([el]);
                        console.log(`dataCell${JSON.stringify(cellData)}`);
                        console.log(cellData.groups.containerId);
                        if (e.draggingElement.dataset['id'] !== undefined) {
                            const draggedData = JSON.parse(e.draggingElement.dataset['id']);
                            console.log(draggedData);

                            this.scheduler.instance.addAppointment(
                                new PlannedEvent(
                                    draggedData.id, cellData.groups.containerId, 'sdfsd', 'PlannedItemId=' + draggedData.id,
                                    cellData.startDate, cellData.endDate)
                            );
                            console.log(this.data);
                        }

                    }
                }
            });
            */
            events.on(elements[i], 'dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();

            });
            events.on(elements[i], 'drop', (e) => {
                e.preventDefault();
                e.stopPropagation();


                if (e.type === 'drop') {
                    const el = e.target;
                    if (el.classList.contains('dx-scheduler-date-table-cell')) {
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
                                cellData.startDate, moment(cellData.startDate).add('minutes', duration).toDate(),
                                draggedData.containers, false);
                            this.scheduler.instance.showAppointmentPopup(plannedEvent, false);
                        }
                    }
                }
            });
        }
    }

    ngOnInit() {
        if (!this.groupsHasValue) {
            this.setGroupValue();
        }
        this.store.select(fromStore.getSelectedPrePlanItem).subscribe((item) => {
            this.draggablePreplanItem = item;
            this.ShowContainers(item);
        }
        );
    }

    ShowContainers(item: PreplanItem | null) {
        const elements = (<any>this.scheduler).element.nativeElement.querySelectorAll('.dx-scheduler-group-header-content');

        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add('allowed');
        }
    }

    onCellClick(e) {
        e.cancel = true;
    }


    onAppointmentFormCreated(data) {

        // console.log(typeof(PlannedEvent) === data.appointmentData);
        // console.log(data.appointmentData instanceof PlannedEvent);
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

    showToast(event, value, type) {
        notify(event + ' \'' + value + '\'', type, 1500);
    }
}

