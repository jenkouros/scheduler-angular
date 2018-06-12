
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PlannedEvent, PlannedEventMove, PlanItemPutRequest, PlanItemMoveStatusEnum } from '../models/event.model';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PlannedEventServer } from '../models/server/plannedevent.servermodel';
import * as moment from 'moment';


@Injectable()
export class EventsService {
    constructor(private http: HttpClient) { }

    getEvents(containerIds: number[], fromDate: Date, toDate: Date): Observable<PlannedEvent[]> {
        let httpParams = new HttpParams()
            .set('IdPlan', '1')
            .set('timeStart', moment(fromDate).toISOString())
            .set('timeEnd', moment(toDate).toISOString()); // .format());

        containerIds.forEach(id => {
            httpParams = httpParams.append('containers', id.toString());
        });

        const serachParams = {
            params: httpParams

        };

        return this.http.get<ApiResponse<PlannedEventServer[]>>(environment.apiUrl + '/planitems', { params: httpParams }).pipe(
            map((response) => {
                if (response.code !== ApiResponseResult.success) {
                    throw response.messages;
                }
                return response.result.map(PlannedEvent.fromServer);
            }),
            catchError((error: any) => observableThrowError(error.json))
        );
    }

    createEvent(event: PlannedEvent): Observable<PlannedEvent> {
        const planningItem = {
            idPrePlanItem: event.idPrePlanItem,
            idContainer: event.containerId,
            timeStart: moment(event.startDate).format(),
            timeEnd: moment(event.endDate).format()
        };
        return this.http.post<ApiResponse<PlannedEventServer>>(environment.apiUrl + '/planitems', planningItem,
            {
                headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
            }).pipe(
            map((response) => {
                if (response.code !== ApiResponseResult.success) {
                    throw response.messages;
                }
                return PlannedEvent.fromServer(response.result);
            } )
        );
    }

    updateEvent(event: PlannedEvent): Observable<boolean> {

        const planningItem = {
            idPlanItem: event.id,
            idContainer: event.containerId,
            timeStart: moment(new Date(event.startDate)).format(),
            timeEnd: moment(new Date(event.endDate)).format()
        };
        return this.http.put<ApiResponse<ApiResponseResult>>(environment.apiUrl + '/planitems', planningItem,
            {
                headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
            }).pipe(
            map((response) => {
                if (response.code !== ApiResponseResult.success) {
                    throw response.messages;
                }
                return true;
                // return PlannedEvent.fromServer(response.result);
            } )
        );
    }

    updateEvents(changedEvents: PlannedEventMove[]) {
        const request = changedEvents
            .filter(i => i.planItemMoveStatus !== PlanItemMoveStatusEnum.Unchanged)
            .map(i => <PlanItemPutRequest>{
                idContainer: i.idContainer,
                idPlanItem: i.idPlanItem,
                timeEnd: moment(i.timeEnd).format(),
                timeStart: moment(i.timeStart).format()
            });
        return this.http.put<ApiResponse<void>>(environment.apiUrl + '/planitems/planitemslist', request)
            .pipe(
                map(response => {
                    if (response.code !== ApiResponseResult.success) {
                        throw response.messages;
                    }
                    return true;
                })
            );
    }

    deleteEvent(event: PlannedEvent): Observable<boolean> {
        return this.http.delete<ApiResponse<ApiResponseResult>>(environment.apiUrl + '/planitems?idPlanItem=' + event.id ,
            {
                headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
            }).pipe(
            map((response) => {
                if (response.code !== ApiResponseResult.success) {
                    throw response.messages;
                }
                return true;
            } )
        );
    }

    toggleLock(event: PlannedEvent): Observable<boolean> {
        const url = event.isLocked ? 'unlockItem' : 'lockItem';
        return this.http.post<ApiResponse<ApiResponseResult>>(environment.apiUrl + '/planitems/' + url, event.id).pipe(
                map(response => {
                    if (response.code !== ApiResponseResult.success) {
                        throw response.messages;
                    }
                    return true;
                })
            );
    }

    toggleMassLocks(containerIds: number[], fromDate: Date, toDate: Date, lock: boolean) {
        const url = lock ? 'massLockItems' : 'massUnLockItems';
        const request = {
            containerIds: containerIds,
            fromDate: moment(fromDate).format(),
            toDate: moment(toDate).format()
        };

        return this.http.post<ApiResponse<ApiResponseResult>>(environment.apiUrl + '/planitems/' + url, request).pipe(
                map(response => {
                    if (response.code !== ApiResponseResult.success) {
                        throw response.messages;
                    }
                    return true;
                })
            );
    }

    getTimeUpdateSuggestion(idItemBatch) {
        return this.http.post<ApiResponse<PlannedEventMove[]>>(environment.apiUrl + '/planitems/requestTimeUpdateByItemBatch', idItemBatch)
        .pipe(
            map((response) => {
                if (response.code !== ApiResponseResult.success) {
                    throw response.messages;
                }
                return response.result;
            } )
        );
    }
}
