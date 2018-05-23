
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PlannedEvent, MassLockRequest } from '../models/event.model';
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

    updateEvent(event: PlannedEvent): Observable<PlannedEvent> {
        const planningItem = {
            idPlanItem: event.id,
            idContainer: event.containerId,
            timeStart: moment(event.startDate).format(),
            timeEnd: moment(event.endDate).format()
        };
        return this.http.put<ApiResponse<PlannedEventServer>>(environment.apiUrl + '/planitems', planningItem,
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

    /*
        getEvents(containerIds: number[], fromDate: Date, toDate: Date) {
            // TODO - go to server
            return new Observable<{[containerId: number]: PlannedEvent[]}>(observer => {
                observer.next(this.createDummyEvents(containerIds, fromDate, toDate));
            });
        }

    private createDummyEvents(containerIds: number[], fromDate: Date, toDate: Date) {
        const dummyEvents: { [containerId: number]: PlannedEvent[] } = {};

        // tslint:disable-next-line:forin
        for (const i of containerIds) {
            dummyEvents[i] = [];
            dummyEvents[i].push(new PlannedEvent(1, i, '1000 Priprava', '', new Date(2018, 4, 17, 7, 0), new Date(2018, 4, 17, 8, 0)));
            dummyEvents[i].push(new PlannedEvent(2, i, '2000 Izdelava', '', new Date(2018, 4, 17, 8, 0), new Date(2018, 4, 17, 10, 0)));

        }
        return dummyEvents;
    }
    */
}
