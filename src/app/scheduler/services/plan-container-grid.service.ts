import { PlanGridOperation } from '../models/plan-grid-operation.model';
import { PlanItemGrid } from './../models/plan-item-grid-model';
import { environment, appSettings } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemAutoplanRequest } from '../models/item-autoplan.model';
import { PlanItemCreateRequest, PlanItemMoveStatusEnum } from '../models/event.model';
import * as moment from 'moment';
import { DictionaryHelper } from '../helpers/dictionary.helper';
import { PlanContainerGrid } from '../models/plan-container-grid.model';
import { Container } from '../models/container.dto';

@Injectable()
export class PlanContainerGridService {
  constructor(private http: HttpClient) {}

  loadPlanContainerGrid(idPlan: number,
                        limitDate: Date,
                        filterDictionary: { [id: string]: number[] } = {},
                        filterContainers: Container[] = []) {

    const containers = filterContainers.map(i => i.id.toString());
    const dict = DictionaryHelper.stringify(filterDictionary);
    const params = {
      'idPlan': idPlan.toString(),
      'ids': dict.ids,
      'values': dict.values,
      'dateLimit': moment(limitDate).format(),
      'containers': containers
    };
    return this.http.post<PlanContainerGrid[]>(environment.apiUrl + '/plancontainergrid', params);
  }

  // autoplan(autoplanRequest: ItemAutoplanRequest) {
  //   return this.http.post<PlanItemGrid[]>(
  //     environment.apiUrl + '/planitemgrid/autoplanitem',
  //     autoplanRequest.toSendFormat()
  //   );
  // }

  updatePlanItem(operation: PlanGridOperation) {
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
      options: {
        enablePlanningOnAllWorkplaces: appSettings.PlanItem_EnablePlanningOnAllWorkplaces
      }
    };
    return this.http.put<PlanContainerGrid[]>(environment.apiUrl + '/plancontainergrid', planningItem);

  }
}
