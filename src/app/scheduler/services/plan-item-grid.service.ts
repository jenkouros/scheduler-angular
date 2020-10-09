import { PlanContainerGrid } from './../models/plan-container-grid.model';
import { PlanGridOperation } from '../models/plan-grid-operation.model';
import { PlanItemGrid } from './../models/plan-item-grid-model';
import { environment, appSettings } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemAutoplanRequest } from '../models/item-autoplan.model';
import { PlanItemCreateRequest, PlanItemMoveStatusEnum } from '../models/event.model';
import * as moment from 'moment';
import { DictionaryHelper } from '../helpers/dictionary.helper';
import { Container } from '../models/container.dto';
import { PlanItemContainerGridModel } from '../models/plan-item-container-grid.model';

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

  loadPlanItemGridWithId(idItem) {
    return this.http.get<PlanItemGrid>(environment.apiUrl +
      `/planitemgrid/GetPlanItemGridWithId?idItem=${idItem}&idPlan=1` );
  }

  autoplan(autoplanRequest: ItemAutoplanRequest,
    filterDictionary: { [id: string]: number[] } = {},
    filterContainers: Container[] = []) {

    return this.http.post<PlanItemContainerGridModel>(
      environment.apiUrl + '/planitemgrid/autoplanitem',
      autoplanRequest.toSendFormat(filterDictionary, filterContainers)
    );
  }

  updatePlanItem(operation: PlanGridOperation,
    filterDictionary: { [id: string]: number[] } = {},
    filterContainers: Container[] = []) {

    const options = operation.options ? operation.options : {};
    options.enablePlanningOnAllWorkplaces = appSettings.PlanItem_EnablePlanningOnAllWorkplaces;


    const planningItemCreateRequest = <PlanItemCreateRequest>{
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


    const containers = filterContainers.map(i => i.id.toString());
    const dict = DictionaryHelper.stringify(filterDictionary);

    planningItemCreateRequest.filter = {
      Ids: dict.ids,
      Values: dict.values,
      Containers: containers
    };

    planningItemCreateRequest.returnOperationGridModel = true;
    return this.http.put<PlanItemContainerGridModel>(environment.apiUrl + '/planitemgrid', planningItemCreateRequest);

  }
}
