import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PlannedEvent } from '../models/event.model';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable()
export class EventsService {
    constructor(private http: HttpClient) { }
    getEvents(containerIds: number[], fromDate: Date, toDate: Date) {
        return this.http.get<ApiResponse<Event[]>>(environment.apiUrl + '/preplaneditems', ).pipe(
            map((response) => {
                if (response.code !== ApiResponseResult.success) {
                    throw response.messages;
                }
            }),
            catchError((error: any) => Observable.throw(error.json))
        );
    }

    /*
        getEvents(containerIds: number[], fromDate: Date, toDate: Date) {
            // TODO - go to server
            return new Observable<{[containerId: number]: PlannedEvent[]}>(observer => {
                observer.next(this.createDummyEvents(containerIds, fromDate, toDate));
            });
        }
    */
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
}
