import { PlanGridOperation } from '../models/plan-grid-operation.model';
import { PlanItemGrid } from './../models/plan-item-grid-model';
import { environment, appSettings } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemAutoplanRequest } from '../models/item-autoplan.model';
import { PlanItemCreateRequest, PlanItemMoveStatusEnum } from '../models/event.model';
import * as moment from 'moment';
import { DictionaryHelper } from '../helpers/dictionary.helper';

@Injectable()
export class PlanItemGridService {
  constructor(private http: HttpClient) {}

  loadPlanItemGrid(idPlan: number, limitDate: Date, filterDictionary: { [id: string]: number[] } = {}) {
    const dict = DictionaryHelper.stringify(filterDictionary);
    const params = {
      'idPlan': idPlan.toString(),
      'ids': dict.ids,
      'values': dict.values,
      'dateLimit': moment(limitDate).format()
    };
    return this.http.post<PlanItemGrid[]>(environment.apiUrl + '/planitemgrid', params);
  }

  autoplan(autoplanRequest: ItemAutoplanRequest) {
    return this.http.post<PlanItemGrid[]>(
      environment.apiUrl + '/planitemgrid/autoplanitem',
      autoplanRequest.toSendFormat()
    );
  }

  updatePlanItem(operation: PlanGridOperation) {
    const options = operation.options ? operation.options : {};
    options.enablePlanningOnAllWorkplaces = appSettings.PlanItem_EnablePlanningOnAllWorkplaces;

    const planningItem = <PlanItemCreateRequest>{
      idPrePlanItem: operation.idPrePlanItem,
      idContainer: operation.idContainer,
      timePreparationStart: moment(new Date(operation.timeStart)).format(),
      timeExecutionStart: moment(new Date(operation.timeStart)).format(),
      timeExecutionEnd: moment(new Date(operation.timeEnd)).format(),
      planItemMoveStatus: PlanItemMoveStatusEnum.Moved,
      comment: operation.comment,
      idPriority: operation.idPriority,
      idUserStatus: operation.idUserStatus,
      userDate: operation.userDate ? moment(new Date(operation.userDate)).format() : undefined,
      options: options
    };
    return this.http.put<PlanItemGrid[]>(environment.apiUrl + '/planitemgrid', planningItem);

  }
}
