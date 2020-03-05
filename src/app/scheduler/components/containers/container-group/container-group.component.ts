import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ContainerSelect } from '../../../models/container.viewModel';
import { EventsService } from '../../../services/events.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { ExcelService } from '../../../services/excel.service';
import { appSettings } from '../../../../../environments/environment';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
    selector: 'app-container-group',
    template: `
      <button style="padding:9px; color: #084578;" class="btn btn-light" (click)="processClick()">
        {{ selected ? translate('Remove_Selected') : translate('Select_All') }}
      </button>
      <div *ngIf="env.PlanItems_ExcelExport">
        <button style="padding:9px; margin-left: 4px" class="btn btn-custom-primary" (click)="onExportDataToExcel()">
          {{translate('Export_To_Excel')}}
        </button>
        <dx-popup height="auto" width="70%"
          class="popup"
          [width]="650"
          [height]="260"
          [showTitle]="true"
          title="{{translate('Export_Excel_Title')}}"
          [dragEnabled]="false"
          [closeOnOutsideClick]="true"
          [(visible)]="popupVisible">
          <div *dxTemplate="let data of 'content'">
          <div style="margin-top: 15px;">
              <app-field label="{{translate('DateTime_From')}}">
                      <dx-date-box
                      [(value)]="dateTimeFrom"
                          type="datetime">
                      </dx-date-box>
              </app-field>
              <app-field label="{{translate('DateTime_To')}}">
                          <dx-date-box
                          [(value)]="dateTimeTo"
                              type="datetime">
                          </dx-date-box>
              </app-field>
              </div>
              <div class="text-right" style="margin-top: 20px;">
                      <button type="button" (click)="onCloseExport()"
                      class="btn btn-outline-secondary" style="margin-right: 5px;">{{translate('Cancel')}}</button>
                      <button type="button" (click)="onConfirmExportToExcel()" class="btn btn-success">{{translate('Confirm')}}</button>
              </div>
          </div>
        </dx-popup>
      </div>
    `
})
export class ContainerGroupComponent extends AppComponentBase implements OnChanges {

    @Input() containers: ContainerSelect[];
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
        private excelService: ExcelService
    ) {
      super();
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
        this.eventsService.getExcelExportFile(this.dateTimeFrom, this.dateTimeTo).pipe(map(result => {
          this.dataResult = result;
           data = result.planItems.map(row => ({
            containerId: row.description,
            articleCode: row.articleCode,
            articleName: row.articleName,
            startDate: moment(new Date(row.timeStartExecution)).format('DD/MM/YYYY HH:MM:SS'),
            endDate: moment(new Date(row.timeEndExecution)).format('DD/MM/YYYY HH:MM:SS'),
            timeStartPreparation: moment(new Date(row.timeStartPreparation)).format('DD/MM/YYYY HH:MM:SS'),
          }));
          this.exportExcel(result.planItems);
           return {data: data};
      })).toPromise();
        this.popupVisible = false;
    }

    exportExcel(data: any[]) {
        this.generateExcel(data);
    }

    generateExcel(data: any[]) {
        this.excelService.createExcel(data);
      }

    onCloseExport() {
        this.popupVisible = false;
    }
}
