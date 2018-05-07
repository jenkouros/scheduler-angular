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
import {PlanViewerItemComponent} from '../../../components/index';
import { PlannedEvent } from '../../../models/event.model';
import notify from 'devextreme/ui/notify';
import * as moment from 'moment';

@Component({
    selector: 'app-plan-viewer',
    templateUrl: './plan-viewer.component.html',
    styleUrls: ['./plan-viewer.component.css']
})
export class PlanViewerComponent implements OnInit {
    @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

    currentDate: Date = new Date(2018, 4, 25);
    data: PlannedEvent[];
    schedulerResources: any = [];
    groups: any[];
    groupsHasValue = false;
    currentView = 'timelineDay';
    cellDurations: any []  = [5, 10 , 20, 30, 60];
    cellDuration = 60;

    constructor(private service: Service, private store: Store<fromStore.SchedulerState>) {
        this.store.select(fromStore.getSelectedContainerSelectList).subscribe(
            (containers) => {
                this.schedulerResources = this.getResources(containers);
                this.store.select(fromStore.getEventsForContainers(containers.map(c => c.id))).subscribe(items => {
                    this.data = items;
                    }
                );
            });
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

        /*if (e.name === 'resources') {
            this.setGroupValue();
            this.groupsHasValue = true;
        }*/
    }

    onAppointmentUpdating(e) {
        // logika za kontrolo ali lahko izvedemo update
        const event: PlannedEvent = e.newData;

        console.log(event);
        if (!event.isPlanned) {
            // insert to db  => get inserted event  => update scheduler
            this.scheduler.instance.addAppointment(
                new PlannedEvent(
                    event.id, event.containerId, event.title, event.description,
                    event.startDate, event.endDate, event.containers, true)
            );
            this.showToast('Added', event.description, 'success');
        } else {
        // update
           /* this.scheduler.instance.updateAppointment(
                e.oldData, e.newData
            );*/
        }
        console.log(e);

    }

    onAppointmentAdding(e) {
         console.log('onAppointmentAdding', e);
    }
    onAppointmentAdded(e) {
        console.log('onAppointmentAdded', e);
    }

    onContentReady(event) {
        const elements = (<any>this.scheduler).element.nativeElement.querySelectorAll('.dx-scheduler-date-table-cell');
        for (let i = 0; i < elements.length; i++) {
            events.off(elements[i], 'drop');
            events.off(elements[i], 'dragover');
            console.log('onContentReady');
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
                    const el  = e.target;
                    if (el.classList.contains('dx-scheduler-date-table-cell')) {
                        const cellData = (<any>this.scheduler.instance).getWorkSpace().getCellData([el]);
                        if (cellData.groups === undefined) {
                            return false;
                        }
                        const draggedData = JSON.parse(e.dataTransfer.getData('prePlanItem'));

                        if (draggedData !== undefined) {
                            const selectedContainer  = draggedData.containers.find (item =>
                                cellData.groups.containerId === item.container.id);
                                console.log(selectedContainer);
                            if (selectedContainer === undefined) {
                                this.showToast('Info', 'Na delovno mesto ni možno planirati operacije!', 'info');
                                return false;
                            }
                            const duration = 60 * (selectedContainer.preparationNormative + selectedContainer.executionNormative);
                            const plannedEvent = new PlannedEvent(
                                draggedData.item.id, cellData.groups.containerId, draggedData.code,
                                draggedData.subItem.name,
                                cellData.startDate, moment(cellData.startDate).add('minutes', duration).toDate(), draggedData.containers);
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
        this.currentDate = new Date(2018, 3, 25);

    }

    onAppointmentFormCreated(data) {
        console.log(data);
        const   that = this,
                form = data.form;

        const containers  = data.appointmentData.containers;
        let selectedContainer  = containers.find (item => data.appointmentData.containerId === item.container.id);

        let startDate = data.appointmentData.startDate,
            description  = data.appointmentData.description,
            duration = 60 * (selectedContainer.preparationNormative + selectedContainer.executionNormative);

        form.option('items', [{
            label: {
                text: 'Description'
            },
            dataField: 'description',
            editorType: 'dxTextBox',
            editorOptions: {
                readOnly: true,
                onValueChanged: function (args) {
                    description = args.value;
                    form.getEditor('description')
                    .option('value', description);
                }
            }
        }, {
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
            dataField: 'endDate',
            editorType: 'dxDateBox',
            editorOptions: {
                type: 'datetime'
            }
        }, {
            label: {
                text: 'Container'
            },
            editorType: 'dxSelectBox',
            dataField: 'containerId',
            editorOptions: {
                items: containers,
                displayExpr: 'container.code',
                valueExpr: 'container.id',
                onValueChanged: function(args) {
                    selectedContainer  = containers.find (item => args.value === item.container.id);
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
/*
    editDetails(showtime) {
        this.scheduler.instance.showAppointmentPopup(this.getDataObj(showtime), false);
    }

    getDataObj(objData) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].startDate.getTime() === objData.startDate.getTime() && this.data[i].containerId === objData.workplaceId) {
                return this.data[i];
            }
        }
        return null;
    }

    getMovieById(id) {
        return Query(this.moviesData).filter(['id', '=', id]).toArray()[0];
    }
    */


}
/*
export class Priority {
    text: string;
    id: number;
    color: string;
}
export class Appointment {
    text: string;
    priorityId: number;
    startDate: Date;
    endDate: Date;
}
const prioritiesDataService: Priority[] = [
    {
        text: 'Low Priority',
        id: 1,
        color: '#1e90ff'
    }, {
        text: 'High Priority',
        id: 2,
        color: '#ff9747'
    }
];

const appointments: Appointment[] = [
    {
        text: 'Website Re-Design Plan',
        priorityId: 2,
        startDate: new Date(2015, 4, 25, 9, 0),
        endDate: new Date(2015, 4, 25, 11, 30)
    }, {
        text: 'Book Flights to San Fran for Sales Trip',
        priorityId: 2,
        startDate: new Date(2015, 4, 25, 12, 0),
        endDate: new Date(2015, 4, 25, 13, 0)
    }, {
        text: 'Install New Router in Dev Room',
        priorityId: 1,
        startDate: new Date(2015, 4, 25, 14, 30),
        endDate: new Date(2015, 4, 25, 15, 30)
    }, {
        text: 'Approve Personal Computer Upgrade Plan',
        priorityId: 2,
        startDate: new Date(2015, 4, 26, 10, 0),
        endDate: new Date(2015, 4, 26, 11, 0)
    }, {
        text: 'Final Budget Review',
        priorityId: 2,
        startDate: new Date(2015, 4, 26, 12, 0),
        endDate: new Date(2015, 4, 26, 13, 35)
    }, {
        text: 'New Brochures',
        priorityId: 2,
        startDate: new Date(2015, 4, 26, 14, 30),
        endDate: new Date(2015, 4, 26, 15, 45)
    }, {
        text: 'Install New Database',
        priorityId: 1,
        startDate: new Date(2015, 4, 27, 9, 45),
        endDate: new Date(2015, 4, 27, 11, 15)
    }, {
        text: 'Approve New Online Marketing Strategy',
        priorityId: 2,
        startDate: new Date(2015, 4, 27, 12, 0),
        endDate: new Date(2015, 4, 27, 14, 0)
    }, {
        text: 'Upgrade Personal Computers',
        priorityId: 1,
        startDate: new Date(2015, 4, 27, 15, 15),
        endDate: new Date(2015, 4, 27, 16, 30)
    }, {
        text: 'Prepare 2015 Marketing Plan',
        priorityId: 2,
        startDate: new Date(2015, 4, 28, 11, 0),
        endDate: new Date(2015, 4, 28, 13, 30)
    }, {
        text: 'Brochure Design Review',
        priorityId: 1,
        startDate: new Date(2015, 4, 28, 14, 0),
        endDate: new Date(2015, 4, 28, 15, 30)
    }, {
        text: 'Create Icons for Website',
        priorityId: 2,
        startDate: new Date(2015, 4, 29, 10, 0),
        endDate: new Date(2015, 4, 29, 11, 30)
    }, {
        text: 'Upgrade Server Hardware',
        priorityId: 1,
        startDate: new Date(2015, 4, 29, 14, 30),
        endDate: new Date(2015, 4, 29, 16, 0)
    }, {
        text: 'Submit New Website Design',
        priorityId: 2,
        startDate: new Date(2015, 4, 29, 16, 30),
        endDate: new Date(2015, 4, 29, 18, 0)
    }, {
        text: 'Launch New Website',
        priorityId: 2,
        startDate: new Date(2015, 4, 29, 12, 20),
        endDate: new Date(2015, 4, 29, 14, 0)
    }
];
*/
