import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PlannedEvent } from '../models/event.model';
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
        .set('timeStart', moment(fromDate).format('YYYY-MM-DD'))
        .set('timeEnd', moment(toDate).format('YYYY-MM-DD HH:mm'));

        containerIds.forEach(id => {
            httpParams = httpParams.append('containers', id.toString());
        });

        const serachParams = {
            params: httpParams

        };

        return this.http.get<ApiResponse<PlannedEventServer[]>>(environment.apiUrl + '/planitems', serachParams).pipe(
            map((response) => {
                if (response.code !== ApiResponseResult.success) {
                    throw response.messages;
                }
                return response.result.map(PlannedEvent.fromServer);
            }),
            catchError((error: any) => Observable.throw(error.json))
        );
    }

    createEvent(event: PlannedEvent): Observable<PlannedEvent> {
        const planningItem = {
            idPlanItem: event.idPrePlanItem,
            idContainer: event.containerId,
            timeStart: moment(event.startDate).toISOString(),
            timeEnd: moment(event.endDate).toISOString()
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
