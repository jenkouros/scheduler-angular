import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Schedule, ScheduleServer } from '../models/timetable.model';
import { SelectedContainers } from '../models/calendar.model';

@Injectable()
export class ContainersService {
  constructor(private http: HttpClient) {}

  addToSelectedContainers(payload: SelectedContainers): Observable<Schedule> {
    return this.http
      .post<ScheduleServer>(
        `${environment.apiUrl}/calendars/subcalendarcontainer?idSubCalendar=${
          payload.id
        }`,
        payload.containersIds
      )
      .pipe(
        map(response => {
          return Schedule.fromServer(response);
        }),
        catchError((error: any) => throwError(error.json()))
      );

    /*
    return this.http
      .post<Schedule>(
        `${environment.apiUrl}/calendars/subcalendarcontainer`,
        {
          idSubCalendar: payload.id,
          containerIds: payload.containersIds
        }
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError((error: any) => throwError(error.json()))
      );
      */
  }

  removeFromSelectedContainers(
    payload: SelectedContainers
  ): Observable<Schedule> {
    return this.http
      .delete<ScheduleServer>(
        `${environment.apiUrl}/calendars/subcalendarcontainer?idSubCalendar=${
          payload.id
        }&containerIds=${payload.containersIds.join(', ')}`
      )
      .pipe(
        map(response => {
          return Schedule.fromServer(response);
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }
}
