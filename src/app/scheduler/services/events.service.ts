import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PlannedEvent } from '../models/event.model';


@Injectable()
export class EventsService {
    constructor(private http: HttpClient) {}

    getEvents() {
        // TODO - go to server
        return new Observable<{[containerId: number]: PlannedEvent[]}>(observer => {
            observer.next(this.createDummyEvents());
        });
    }

    private createDummyEvents() {
        const dummyEvents: { [containerId: number]: PlannedEvent[] } = {};
        dummyEvents[1] = [];
        dummyEvents[1].push(new PlannedEvent(1, '1000 Priprava', '', new Date(2018, 4, 17, 7, 0), new Date(2018, 4, 17, 8, 0)));
        dummyEvents[1].push(new PlannedEvent(2, '2000 Izdelava', '', new Date(2018, 4, 17, 8, 0), new Date(2018, 4, 17, 10, 0)));
        return dummyEvents;
    }
}
