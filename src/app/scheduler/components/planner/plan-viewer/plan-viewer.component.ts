<<<<<<< HEAD
import { Component, OnInit, ViewChild } from '@angular/core';
=======
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9
import '@progress/kendo-ui';
import { PlannerService } from '../planner.service';

import {
    DxSchedulerModule,
    DxSchedulerComponent,
    DxButtonModule,
    DxTemplateModule, DxLinearGaugeModule
} from 'devextreme-angular';
import { Service, MovieData, WorkPlaceData, Data } from '../../../services/app.service';
import Query from 'devextreme/data/query';
import * as events from 'devextreme/events';


@Component({
    selector: 'app-plan-viewer',
    templateUrl: './plan-viewer.component.html',
    styleUrls: ['./plan-viewer.component.css']
})
<<<<<<< HEAD
export class PlanViewerComponent implements OnInit {
=======
export class PlanViewerComponent implements OnInit, AfterViewInit {
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9
    @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

    currentDate: Date = new Date(2015, 4, 25);
    data: Data[];
    moviesData: MovieData[];
<<<<<<< HEAD
    workplaceData: WorkPlaceData[];    
    schedulerResources: any = [];
    groups: any[];
    groupsHasValue = false;
    currentView: string = "timelineDay";
    constructor(private plannerService: PlannerService, private service: Service) {        
=======
    workplaceData: WorkPlaceData[];
    schedulerResources: any = [];
    groups: any[];
    groupsHasValue = false;
    currentView = 'timelineDay';
    constructor(private plannerService: PlannerService, private service: Service) {
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9
        this.data = service.getData();
        this.moviesData = service.getMoviesData();
        this.workplaceData = service.getWorkPlaceData();
        this.schedulerResources = service.getResources(this.workplaceData, this.moviesData);
    }
    setGroupValue() {
        if (this.data.length === 1) {
            this.groups = [];
        } else {
            this.groups = ['workplaceId'];
        }
    }

    optionChanged(e: any) {
<<<<<<< HEAD
        if (e.name === "resources") {
=======
        if (e.name === 'resources') {
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9
            debugger;
            this.setGroupValue();
            this.groupsHasValue = true;
        }
    }


    ngAfterViewInit() {
        const elements = document.getElementsByClassName('dx-scheduler-date-table-cell');
        for (let i = 0; i < elements.length; i++) {
            events.on(elements[i], 'dxdrop', (e) => {
                e.preventDefault();
                e.stopPropagation();

<<<<<<< HEAD
                var el = e.target;
                if (el.classList.contains("dx-scheduler-date-table-cell")) {

                    var a = (<any>this.scheduler.instance).getWorkSpace().getCellData([el]);
                    console.log(e);

                    if (e.type === 'dxdrop') {
                        console.log("dx-droped");
=======
                const el = e.target;
                if (el.classList.contains('dx-scheduler-date-table-cell')) {

                    const a = (<any>this.scheduler.instance).getWorkSpace().getCellData([el]);
                    console.log(a);

                    if (e.type === 'dxdrop') {
                        console.log('dx-droped');
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9
                    }
                }
            });

<<<<<<< HEAD
            events.on(elements[i], 'drop', (e) => {
                e.preventDefault();
                e.stopPropagation();

                console.log("droped");
                var el = e.target;
=======
            /*events.on(elements[i], 'drop', (e) => {
                e.preventDefault();
                e.stopPropagation();

                console.log('droped');
                const el = e.target;
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9
                if (el.classList.contains("dx-scheduler-date-table-cell")) {
                    var data = JSON.parse(e.dataTransfer.getData('text'));

                    var a = (<any>this.scheduler.instance).getWorkSpace().getCellData([el]);
                    this.scheduler.instance.addAppointment({
                        text: "testing",
                        workplaceId: 0,
                        movieId: 5,
                        price: 10,
                        startDate: new Date(2015, 4, 25, 9, 10),
                        endDate: new Date(2015, 4, 25, 11, 20)
                    });
                    console.log(data);
                }

<<<<<<< HEAD
            });
=======
            });*/
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9

        }
    }

    ngOnInit() {
        if (!this.groupsHasValue) {
            this.setGroupValue();
        }
        this.currentDate = new Date(2015, 4, 25);
    }

    onAppointmentFormCreated(data) {
<<<<<<< HEAD
        var that = this,
=======
        let that = this,
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9
            form = data.form,
            movieInfo = that.getMovieById(data.appointmentData.movieId) || {},
            startDate = data.appointmentData.startDate;

<<<<<<< HEAD
        form.option("items", [{
            label: {
                text: "Movie"
            },
            editorType: "dxSelectBox",
            dataField: "movieId",
            editorOptions: {
                items: that.moviesData,
                displayExpr: "text",
                valueExpr: "id",
                onValueChanged: function (args) {
                    movieInfo = that.getMovieById(args.value);
                    form.getEditor("director")
                        .option("value", movieInfo.director);
                    form.getEditor("endDate")
                        .option("value", new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
=======
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
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9
                }.bind(this)
            }
        }, {
            label: {
<<<<<<< HEAD
                text: "Director"
            },
            name: "director",
            editorType: "dxTextBox",
=======
                text: 'Director'
            },
            name: 'director',
            editorType: 'dxTextBox',
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9
            editorOptions: {
                value: movieInfo.director,
                readOnly: true
            }
        }, {
<<<<<<< HEAD
            dataField: "startDate",
            editorType: "dxDateBox",
            editorOptions: {
                type: "datetime",
                onValueChanged: function (args) {
                    startDate = args.value;
                    form.getEditor("endDate")
                        .option("value", new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
                }
            }
        }, {
            name: "endDate",
            dataField: "endDate",
            editorType: "dxDateBox",
            editorOptions: {
                type: "datetime",
                readOnly: true
            }
        }, {
            dataField: "price",
            editorType: "dxRadioGroup",
            editorOptions: {
                dataSource: [5, 10, 15, 20],
                itemTemplate: function (itemData) {
                    return "$" + itemData;
=======
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
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9
                }
            }
        }]);
    }

    editDetails(showtime) {
        this.scheduler.instance.showAppointmentPopup(this.getDataObj(showtime), false);
    }

    getDataObj(objData) {
        for (var i = 0; i < this.data.length; i++) {
<<<<<<< HEAD
            if (this.data[i].startDate.getTime() === objData.startDate.getTime() && this.data[i].workplaceId === objData.workplaceId)
                return this.data[i];
=======
            if (this.data[i].startDate.getTime() === objData.startDate.getTime() && this.data[i].workplaceId === objData.workplaceId) {
                return this.data[i];
            }
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9
        }
        return null;
    }

    getMovieById(id) {
<<<<<<< HEAD
        return Query(this.moviesData).filter(["id", "=", id]).toArray()[0];
=======
        return Query(this.moviesData).filter(['id', '=', id]).toArray()[0];
>>>>>>> bd4741595ed8f57a5a268da59e0cd236ba6277d9
    }
}

