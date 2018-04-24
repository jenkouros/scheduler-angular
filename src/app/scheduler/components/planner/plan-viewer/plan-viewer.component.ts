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

@Component({
    selector: 'app-plan-viewer',
    templateUrl: './plan-viewer.component.html',
    styleUrls: ['./plan-viewer.component.css']
})
export class PlanViewerComponent implements OnInit, AfterViewInit {
    @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

    currentDate: Date = new Date(2015, 4, 25);
    data: Data[];
    moviesData: MovieData[];
    workplaceData: WorkPlaceData[];
    schedulerResources: any = [];
    groups: any[];
    groupsHasValue = false;
    currentView = 'timelineDay';

    constructor(private service: Service, private store: Store<fromStore.SchedulerState>) {
        this.data = service.getData();
        this.moviesData = service.getMoviesData();
        this.workplaceData = service.getWorkPlaceData();
        this.store.select(fromStore.getSelectedContainerSelectList).subscribe(
            (containers) => {
                this.schedulerResources = this.getResources(containers, this.moviesData);
            });

    }

    getAppoinmentClass() {
        if (this.scheduler.currentView === 'timelineDay') {
            return 'container1';
        }
        return '';
    }
    getResources(containers: any, plans: MovieData[]) {
        const workplaceGroups: any[] = [],
            planGroup: any[] = [];

        // working places (group)
        containers.forEach((container: Container) => {
            workplaceGroups.push({
                text: container.code,
                id: container.id,
            });
        });
        plans.forEach((plan: any) => {
            planGroup.push({
                text: plan.text,
                id: plan.id,
                color: plan.color
            });
        });
        console.log(workplaceGroups, planGroup);
        return [

            {
                fieldExpr: 'workplaceId',
                dataSource: workplaceGroups
            }
        ];
    }
    setGroupValue() {
        if (this.data.length === 1) {
            this.groups = [];
        } else {
            this.groups = ['workplaceId'];
        }
    }

    optionChanged(e: any) {
        if (e.name === 'resources') {
            this.setGroupValue();
            this.groupsHasValue = true;
        }
    }

    onAppointmentUpdating(e) {
        // logika za kontrolo ali lahko izvedemo update

    }

    onAppointmentAdding(e) {
        console.log('onAppointmentAdding', e);
    }
    onAppointmentAdded(e) {
        console.log(e);
    }

    onContentReady(event) {

        const elements = (<any>this.scheduler).element.nativeElement.querySelectorAll('.dx-scheduler-date-table-cell');
        for (let i = 0; i < elements.length; i++) {
            /* events.off(elements[i], 'dxdrop', this.testFunction);
             events.on(elements[i], 'dxdrop', {
                workplaceId: 2,
                movieId: 3,
                price: 11,
                startDate: new Date(2015, 4, 25, 8, 1),
                endDate: new Date(2015, 4, 25, 11, 1)
            }, this.testFunction);*/
            events.off(elements[i], 'dxdrop');
            events.on(elements[i], 'dxdrop', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (e.type === 'dxdrop') {
                    const el  = e.target;
                    if (el.classList.contains('dx-scheduler-date-table-cell')) {
                         const a = (<any>this.scheduler.instance).getWorkSpace().getCellData([el]);
                        console.log(`dataCell${JSON.stringify(a)}`);
                    }

                    console.log(e, 'dx-droped');
                    this.scheduler.instance.addAppointment({
                        workplaceId: 2,
                        movieId: 3,
                        price: 11,
                        startDate: new Date(2015, 4, 25, 8, 1),
                        endDate: new Date(2015, 4, 25, 11, 1)
                    });
                }
            });
        }
    }

    testFunction(e: any, extraParameters) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e, 'dx-droped');

        if (e.type === 'dxdrop') {
            const el = e.target;
        if (el.classList.contains('dx-scheduler-date-table-cell')) {
            // const a = (<any>this.scheduler.instance).getWorkSpace().getCellData([el]);
            console.log(this.scheduler);
            }
        }


    }
    ngAfterViewInit() {
        const elements = (<any>this.scheduler).element.nativeElement.querySelectorAll('.dx-scheduler-date-table-cell');
        for (let i = 0; i < elements.length; i++) {

            events.on(elements[i], 'dxdrop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.type === 'dxdrop') {
                    // this.editDetails(a);
                    console.log('dx-droped');
                }
                // const el = e.target;
                /* if (el.classList.contains('dx-scheduler-date-table-cell')) {

                     const a = (<any>this.scheduler.instance).getWorkSpace().getCellData([el]);
                     console.log(a);


                 }*/
            });

            events.on(elements[i], 'drop', (e) => {
                e.preventDefault();
                e.stopPropagation();

                console.log('droped');
                const el = e.target;
                if (el.classList.contains('dx-scheduler-date-table-cell')) {
                    const data = JSON.parse(e.dataTransfer.getData('text'));

                    const a = (<any>this.scheduler.instance).getWorkSpace().getCellData([el]);

                    console.log(data);
                }

            });

        }
    }

    ngOnInit() {
        if (!this.groupsHasValue) {
            this.setGroupValue();
        }
        this.currentDate = new Date(2015, 4, 25);
    }

    onAppointmentFormCreated(data) {
        const that = this,
            form = data.form;
        let    movieInfo = that.getMovieById(data.appointmentData.movieId) || {},
            startDate = data.appointmentData.startDate;

        form.option('items', [{
            label: {
                text: 'Movie'
            },
            editorType: 'dxSelectBox',
            dataField: 'movieId',
            editorOptions: {
                items: that.moviesData,
                displayExpr: 'text',
                valueExpr: 'id',
                onValueChanged: function (args) {
                    movieInfo = that.getMovieById(args.value);
                    form.getEditor('director')
                        .option('value', movieInfo.director);
                    form.getEditor('endDate')
                        .option('value', new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
                }.bind(this)
            }
        }, {
            label: {
                text: 'Director'
            },
            name: 'director',
            editorType: 'dxTextBox',
            editorOptions: {
                value: movieInfo.director,
                readOnly: true
            }
        }, {
            dataField: 'startDate',
            editorType: 'dxDateBox',
            editorOptions: {
                type: 'datetime',
                onValueChanged: function (args) {
                    startDate = args.value;
                    form.getEditor('endDate')
                        .option('value', new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
                }
            }
        }, {
            name: 'endDate',
            dataField: 'endDate',
            editorType: 'dxDateBox',
            editorOptions: {
                type: 'datetime',
                readOnly: true
            }
        }, {
            dataField: 'price',
            editorType: 'dxRadioGroup',
            editorOptions: {
                dataSource: [5, 10, 15, 20],
                itemTemplate: function (itemData) {
                    return '$' + itemData;
                }
            }
        }]);
    }

    editDetails(showtime) {
        this.scheduler.instance.showAppointmentPopup(this.getDataObj(showtime), false);
    }

    getDataObj(objData) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].startDate.getTime() === objData.startDate.getTime() && this.data[i].workplaceId === objData.workplaceId) {
                return this.data[i];
            }
        }
        return null;
    }

    getMovieById(id) {
        return Query(this.moviesData).filter(['id', '=', id]).toArray()[0];
    }
}

