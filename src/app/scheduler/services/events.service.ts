import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {
  PlannedEvent,
  PlannedEventMove,
  PlanItemPutRequest,
  PlanItemMoveStatusEnum,
  PlanItemCreateRequest,
  PlanItemsGetResponse,
  PlannedEventNotWorkingHoursMove,
  PlanItemGetRequest
} from '../models/event.model';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { catchError, map } from 'rxjs/operators';
import { environment, appSettings } from '../../../environments/environment';
import {
  PlannedEventServer,
  PlanItemResponseServer
} from '../models/server/plannedevent.servermodel';
import * as moment from 'moment';
import { PlanSchedule } from '../models/planschedule.dto';
import { PlanScheduleServer } from '../models/server/planschedule.servermodel';

@Injectable()
export class EventsService {
  constructor(private http: HttpClient) {}

  getEvents(
    idPlan: number,
    containerIds: number[],
    fromDate: Date,
    toDate: Date
  ): Observable<PlanItemsGetResponse> {
    // let httpParams = new HttpParams()
    //     .set('IdPlan', '1')
    //     .set('timeStart', moment(fromDate).toISOString())
    //     .set('timeEnd', moment(toDate).toISOString());

    const request = <PlanItemGetRequest>{
      timeStart: moment(fromDate).format(),
      timeEnd: moment(toDate).format(),
      idPlan: idPlan,
      containers: containerIds
    };

    return this.http
      .post<PlanItemResponseServer>(environment.apiUrl + '/planitems/GetPlanItems', request)
      .pipe(
        map(response => {
          return PlanItemsGetResponse.fromServer(response);
        })
      );

    // containerIds.forEach(id => {
    //     httpParams = httpParams.append('containers', id.toString());
    // });

    // return this.http.get<PlanItemResponseServer>(environment.apiUrl + '/planitems', { params: httpParams }).pipe(
    //     map((response) => {
    //         return PlanItemsGetResponse.fromServer(response);
    //     })
    // );
  }

  getEvent(id: number) {
    return this.http.post<PlannedEventServer>(environment.apiUrl + `/planitems/GetPlanItem?idPlanItem=${id}`, null).pipe(
      map(response => PlannedEvent.fromServer(response))
    );
  }

  createEventFromRequest(request: PlanItemCreateRequest) {
    return this.http
    .post<PlannedEventServer>(environment.apiUrl + '/planitems', request, {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
    })
    .pipe(
      map(response => {
        return PlannedEvent.fromServer(response);
      })
    );
  }

  createEvent(event: PlannedEvent): Observable<PlannedEvent> {
    const options = event.options ? event.options : {};
    options.enablePlanningOnAllWorkplaces = appSettings.PlanItem_EnablePlanningOnAllWorkplaces;

    const planningItem = <PlanItemCreateRequest>{
      idPrePlanItem: event.idPrePlanItem,
      idContainer: event.containerId,
      timePreparationStart: moment(event.timeStartPreparation).format(),
      timeExecutionStart: moment(event.timeStartExecution).format(),
      timeExecutionEnd: moment(event.timeEndExecution).format(),
      comment: event.description,
      options: options
    };
    return this.createEventFromRequest(planningItem);
  }

  checkForNotPlannableEvents(idPlanItem: number) {
    return this.http.post(
      environment.apiUrl + '/planitems/checkForNotPlannablePlanItems',
      idPlanItem
    );
  }

  updateEvent(event: PlannedEvent) {
    const options = event.options ? event.options : {};
    options.enablePlanningOnAllWorkplaces = appSettings.PlanItem_EnablePlanningOnAllWorkplaces;

    const planningItem = <PlanItemPutRequest>{
      idPlanItem: event.id,
      idContainer: event.containerId,
      timePreparationStart: moment(new Date(event.timeStartPreparation)).format(),
      timeExecutionStart: moment(new Date(event.timeStartExecution)).format(),
      timeExecutionEnd: moment(new Date(event.timeEndExecution)).format(),
      planItemMoveStatus: PlanItemMoveStatusEnum.Moved,
      comment: event.description,
      options: options
    };
    return this.http.put(environment.apiUrl + '/planitems', planningItem);
  }

  updateEvents(
    changedEvents: PlannedEventMove[],
    fixPlanItem: boolean = false,
    ignoreStatusLimitation = false
  ) {
    const request = changedEvents
      .filter(i => i.planItemMoveStatus !== PlanItemMoveStatusEnum.Unchanged)
      .map(
        i =>
          <PlanItemPutRequest>{
            idContainer: i.idContainer,
            idPlanItem: i.idPlanItem,
            timeExecutionEnd: moment(i.timeEnd).format(),
            timePreparationStart: moment(i.timeStart).format(),
            // fixPlanItem: fixPlanItem,
            options: {
              fixPlanItem: fixPlanItem,
              ignoreStatusLimitation: ignoreStatusLimitation
            },
            planItemMoveStatus: i.planItemMoveStatus
          }
      );
    return this.http.put(environment.apiUrl + '/planitems/planitemslist', request);
  }

  deleteEvent(event: PlannedEvent) {
    return this.http.delete(environment.apiUrl + '/planitems?idPlanItem=' + event.id);
  }

  toggleLock(id: number, isLocked: boolean) {
    const url = isLocked ? 'unlockItem' : 'lockItem';
    return this.http.post(environment.apiUrl + '/planitems/' + url, id);
  }

  toggleMassLocks(containerIds: number[], fromDate: Date, toDate: Date, lock: boolean) {
    const url = lock ? 'massLockItems' : 'massUnLockItems';
    const request = {
      containerIds: containerIds,
      fromDate: moment(fromDate).format(),
      toDate: moment(toDate).format()
    };

    return this.http.post(environment.apiUrl + '/planitems/' + url, request);
  }

  getTimeUpdateSuggestion(idItemBatch) {
    return this.http.post<PlannedEventMove[]>(
      environment.apiUrl + '/planitems/requestTimeUpdateByItemBatch',
      idItemBatch
    );
  }

  getTimeUpdateByRealizationSuggestion(containers: number[], timeStart: Date, timeEnd: Date) {
    return this.http.post<PlannedEventMove[]>(
      environment.apiUrl + '/planitems/requestTimeUpdateByRealization',
      {
        containers: containers,
        timeStart: moment(new Date(timeStart)).format(),
        timeEnd: moment(new Date(timeEnd)).format()
      }
    );
  }

  getTimeSuggestionForNotWorkingHours(idPlanItem) {
    return this.http.post<PlannedEventNotWorkingHoursMove>(
      environment.apiUrl + '/planitems/getTimeSuggestionForNotWorkingHours',
      idPlanItem
    );
  }

  getExcelExportFile(fromDate: Date, toDate: Date, containerIds: number[]): Observable<PlanItemsGetResponse> {

    const request = <PlanItemGetRequest> {
        timeStart: moment(fromDate).format(),
        timeEnd: moment(toDate).format(),
        idPlan: 1,
        containers: containerIds
    };
    return this.http.post<PlanItemResponseServer>(environment.apiUrl + '/planitems/GetReportDataForExcel', request).pipe(
        map((response) => {
            return PlanItemsGetResponse.fromServer(response);
        })
    );

}
}
