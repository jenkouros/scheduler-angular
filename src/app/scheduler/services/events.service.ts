import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PlannedEvent } from '../models/event.model';


@Injectable()
export class EventsService {
    constructor(private http: HttpClient) {}

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
            dummyEvents[i].push(new PlannedEvent(1, '1000 Priprava', '', new Date(2018, 4, 17, 7, 0), new Date(2018, 4, 17, 8, 0)));
            dummyEvents[i].push(new PlannedEvent(2, '2000 Izdelava', '', new Date(2018, 4, 17, 8, 0), new Date(2018, 4, 17, 10, 0)));

        }
        return dummyEvents;
    }
}
