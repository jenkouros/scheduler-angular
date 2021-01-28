import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DictionaryHelper } from '../helpers/dictionary.helper';
import { Container } from '../models/container.dto';
import { PlanItemCreateRequest, PlanItemMoveStatusEnum } from '../models/event.model';
import { PlanContainerGrid } from '../models/plan-container-grid.model';
import { PlanGridOperation } from '../models/plan-grid-operation.model';
import { appSettings, environment } from './../../../environments/environment';
import { CalendarFilter } from './../models/calendar-filter.model';
import { PlannedEventSimple } from './../models/event.model';

@Injectable()
export class PlanContainerGridService {
  constructor(private http: HttpClient) {}

  loadPlanContainerGrid(idPlan: number,
                        limitDate: Date,
                        filterDictionary: { [id: string]: number[] } = {},
                        filterContainers: Container[] = [],
                        showArchive: boolean = false,
                        calendarFilter: CalendarFilter | undefined,
                        showNotPlannable: boolean) {

    const containers = filterContainers.map(i => i.id.toString());
    const dict = DictionaryHelper.stringify(filterDictionary);
    const params = {
      'idPlan': idPlan.toString(),
      'ids': dict.ids,
      'values': dict.values,
      'dateLimit': moment(limitDate).format(),
      'containers': containers,
      'showArchive': showArchive,
      'calendarFilter': calendarFilter
        ? {
          'startDate': moment(calendarFilter.dateStart).format(),
          'endDate': moment(calendarFilter.dateEnd).format(),
          'containerIds': calendarFilter.containerIds
        }
        : undefined,
      'showNotPlannable': showNotPlannable
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
    return this.http.put<PlanContainerGrid[]>(environment.apiUrl + '/plancontainergrid', planningItem);

  }

  updatePlanItemSimple(operation: PlannedEventSimple) {
    const options = operation.options ? operation.options : {};
    options.enablePlanningOnAllWorkplaces = appSettings.PlanItem_EnablePlanningOnAllWorkplaces;
    const planningItem = <PlanItemCreateRequest>{
      idPrePlanItem: operation.idPrePlanItem,
      idContainer: operation.containerId,
      timePreparationStart: moment(new Date(operation.timeStartPreparation as any)).format(),
      timeExecutionStart: moment(new Date(operation.timeStartPreparation as any)).format(),
      timeExecutionEnd: moment(new Date(operation.timeEnd as any)).format(),
      planItemMoveStatus: PlanItemMoveStatusEnum.Moved,
      comment: undefined,
      idPriority: undefined,
      idUserStatus: undefined,
      userDate: undefined,
      options: options
    };
    return this.http.put<PlanContainerGrid[]>(environment.apiUrl + '/plancontainergrid', planningItem);
  }

  changeSequence(isUp: boolean, idPlanItem: number) {
    return this.http.post<PlanContainerGrid[]>(environment.apiUrl +
      `/plancontainergrid/changeSequence?idPlanItem=${idPlanItem}&isUp=${isUp}`, null);
  }
}
