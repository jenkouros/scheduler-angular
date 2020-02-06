import { PlanItemGridOperation } from './../models/plan-item-grid-operation.model';
import { PlanItemGrid } from './../models/plan-item-grid-model';
import { environment, appSettings } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemAutoplanRequest } from '../models/item-autoplan.model';
import { PlanItemCreateRequest, PlanItemMoveStatusEnum } from '../models/event.model';
import * as moment from 'moment';

@Injectable()
export class PlanItemGridService {
  constructor(private http: HttpClient) {}

  loadPlanItemGrid() {
    return this.http.get<PlanItemGrid[]>(environment.apiUrl + '/planitemgrid');
  }

  autoplan(autoplanRequest: ItemAutoplanRequest) {
    return this.http.post<PlanItemGrid[]>(
      environment.apiUrl + '/planitemgrid/autoplanitem',
      autoplanRequest.toSendFormat()
    );
  }

  updatePlanItem(operation: PlanItemGridOperation) {
    const planningItem = <PlanItemCreateRequest>{
      idPrePlanItem: operation.idPrePlanItem,
      idContainer: operation.idContainer,
      timePreparationStart: moment(new Date(operation.timeStart)).format(),
      timeExecutionStart: moment(new Date(operation.timeStart)).format(),
      timeExecutionEnd: moment(new Date(operation.timeEnd)).format(),
      planItemMoveStatus: PlanItemMoveStatusEnum.Moved,
      comment: '',
      options: {
        enablePlanningOnAllWorkplaces: appSettings.PlanItem_EnablePlanningOnAllWorkplaces
      }
    };
    return this.http.put<PlanItemGrid[]>(environment.apiUrl + '/planitemgrid', planningItem);

  }
}
