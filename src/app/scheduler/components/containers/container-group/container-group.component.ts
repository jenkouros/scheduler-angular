import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ContainerSelect } from '../../../models/container.viewModel';
import { EventsService } from '../../../services/events.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { ExcelService } from '../../../services/excel.service';
import { appSettings } from '../../../../../environments/environment';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
    selector: 'app-container-group',
    templateUrl: './container-group.component.html'
})
export class ContainerGroupComponent extends AppComponentBase implements OnChanges, OnInit {

    @Input() containers: ContainerSelect[];
    @Input() selectedContainerIds: number[];
    @Output() groupSelect = new EventEmitter<number[]>();
    @Output() groupDeselect = new EventEmitter<number[]>();
    selected = false;

    dateTimeFrom: Date;
    dateTimeTo: Date;
    testNumber: any[] = new Array();
    dataResult: any;
    popupVisible = false;

    env = appSettings;

    constructor(
        private eventsService: EventsService,
        private excelService: ExcelService,
    ) {
      super();
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.selected = this.containers.findIndex(o => o.selected) > -1;
    }

    processClick() {
        if (this.selected) {
            this.groupDeselect.emit(this.getIds());
        } else {
            this.groupSelect.emit(this.getIds());
        }
    }

    getIds() {
        return this.containers.map(i => i.id);
    }

    onExportDataToExcel() {

        this.dateTimeFrom = new Date();
        this.dateTimeFrom.setHours(6);
        this.dateTimeFrom.setMinutes(0);
        this.dateTimeFrom.setSeconds(0);

        this.dateTimeTo = new Date();
        this.dateTimeTo.setDate(this.dateTimeTo.getDate() + 1);
        this.dateTimeTo.setHours(6);
        this.dateTimeTo.setMinutes(0);
        this.dateTimeTo.setSeconds(0);

        this.popupVisible = true;
      }

    onConfirmExportToExcel() {
        let data: any[] = new Array();
        this.eventsService.getExcelExportFile(this.dateTimeFrom, this.dateTimeTo, this.selectedContainerIds).pipe(map(result => {
          this.dataResult = result;
           data = result.planItems.map(row => ({
            containerId: row.description,
            articleCode: row.articleCode,
            articleName: row.articleName,
            startDate: moment(new Date(row.timeStartExecution)).format('DD/MM/YYYY HH:MM:SS'),
            endDate: moment(new Date(row.timeEndExecution)).format('DD/MM/YYYY HH:MM:SS'),
            timeStartPreparation: moment(new Date(row.timeStartPreparation)).format('DD/MM/YYYY HH:MM:SS'),
          }));
          this.excelService.createExcel(result.planItems, this.dateTimeFrom, this.dateTimeTo);
           return {data: data};
      })).toPromise();
        this.popupVisible = false;
    }

    onCloseExport() {
        this.popupVisible = false;
    }
}
